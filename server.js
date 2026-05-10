const fs = require("fs");
const http = require("http");
const crypto = require("crypto");
const path = require("path");

const port = process.env.PORT || 3000;
const rootDir = __dirname;
const sessionCookie = "wagesignal_session";
const stateCookie = "wagesignal_google_state";
const sessionSecret = process.env.SESSION_SECRET || "local-dev-session-secret";
const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI || "";
const dataDir = path.resolve(process.env.WAGESIGNAL_DATA_DIR || path.join(rootDir, "data"));
const reportsPath = path.join(dataDir, "reports.json");
const defaultCompanies = [
  "Acme Tech",
  "Austin Table Group",
  "Bayfront Health",
  "Civic Works",
  "Desert Logistics",
  "Great Lakes Manufacturing",
  "Market Square Retail",
  "Metro Schools",
  "Northstar Finance",
  "Prairie Wind Energy",
  "Union Local 48"
];
const defaultRoles = [
  "Customer success manager",
  "Data analyst",
  "ICU registered nurse",
  "Journeyman electrician",
  "Public school teacher",
  "Senior product designer",
  "Sous chef",
  "Union machinist",
  "Warehouse operations lead",
  "Wind turbine technician"
];
const junkValues = new Set(["test", "trial", "asdf", "qwerty", "fake", "none", "n/a", "na", "abc", "sample"]);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function sendJson(res, status, payload, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...headers
  });
  res.end(JSON.stringify(payload));
}

function ensureDataStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(reportsPath)) {
    fs.writeFileSync(reportsPath, "[]", "utf8");
  }
}

function readReports() {
  ensureDataStore();

  try {
    const parsed = JSON.parse(fs.readFileSync(reportsPath, "utf8"));
    return Array.isArray(parsed) ? parsed.filter(isUsableStoredReport) : [];
  } catch {
    return [];
  }
}

function writeReports(reports) {
  ensureDataStore();
  fs.writeFileSync(reportsPath, JSON.stringify(reports, null, 2), "utf8");
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function cleanText(value, maxLength = 180) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function oneOf(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function uniqueSorted(values) {
  return [...new Set(values.map((value) => cleanText(value, 80)).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function normalizedKey(value) {
  return cleanText(value, 120).toLowerCase();
}

function isJunkText(value) {
  const normalized = normalizedKey(value);
  if (!normalized) return true;
  if (junkValues.has(normalized)) return true;
  if (/^(.)\1{3,}$/.test(normalized.replace(/\s/g, ""))) return true;
  if (/^\d+$/.test(normalized)) return true;
  return false;
}

function isUsableStoredReport(report) {
  return Boolean(
    report &&
      report.id &&
      report.role &&
      report.company &&
      report.location &&
      Number.isFinite(Number(report.annualPay)) &&
      !isJunkText(report.role) &&
      !isJunkText(report.company) &&
      !isJunkText(report.location)
  );
}

function reportFingerprint(report) {
  return [
    normalizedKey(report.linkedinUrl),
    normalizedKey(report.company),
    normalizedKey(report.role),
    normalizedKey(report.location),
    report.payType,
    report.rawPay,
    report.bonusAmount
  ].join("|");
}

function reportOptions() {
  const reports = readReports();
  return {
    companies: uniqueSorted([...defaultCompanies, ...reports.map((report) => report.company)]),
    roles: uniqueSorted([...defaultRoles, ...reports.map((report) => report.role)]),
    locations: uniqueSorted(reports.map((report) => report.location))
  };
}

function normalizePay(payType, basePay, bonusPay) {
  const base = Number(basePay);
  const bonus = Number(bonusPay || 0);
  const safeBase = Number.isFinite(base) && base > 0 ? base : 0;
  const safeBonus = Number.isFinite(bonus) && bonus >= 0 ? bonus : 0;

  if (payType === "hourly") {
    return Math.round(safeBase * 2080 + safeBonus);
  }

  return Math.round((safeBase + safeBonus) / 1000) * 1000;
}

function createStoredReport(payload) {
  const payType = oneOf(payload.payType, ["salary", "hourly"], "salary");
  const rawPay = Number(payload.rawPay || payload.payAmount);
  const bonusAmount = Number(payload.bonusAmount || 0);

  return {
    id: `server-${crypto.randomUUID()}`,
    role: cleanText(payload.role, 80),
    company: cleanText(payload.company, 80),
    industry: cleanText(payload.industry, 50),
    location: cleanText(payload.location, 80),
    annualPay: normalizePay(payType, rawPay, bonusAmount),
    rawPay,
    bonusAmount,
    payType,
    experience: oneOf(payload.experience, ["Entry", "Mid", "Senior", "Lead", "Manager", "Director+"], "Entry"),
    gender: oneOf(payload.gender, ["Male", "Female", "Nonbinary", "Undisclosed"], "Undisclosed"),
    workStyle: oneOf(payload.workStyle, ["On-site", "Hybrid", "Remote", "Field"], "On-site"),
    companySize: oneOf(payload.companySize, ["1-50", "51-250", "251-1k", "1k-10k", "10k+"], "1-50"),
    note: cleanText(payload.note) || "No extra context added.",
    linkedinUrl: cleanText(payload.linkedinUrl, 220),
    verificationMethod: payload.verified ? "LinkedIn" : "Self-reported",
    verified: Boolean(payload.verified),
    createdAt: new Date().toISOString(),
    helpful: 0,
    similar: 0,
    source: "server"
  };
}

function validateReport(report) {
  const errors = [];
  const reports = readReports();

  if (!report.role) errors.push("Role is required.");
  if (!report.company) errors.push("Company is required.");
  if (!report.industry) errors.push("Industry is required.");
  if (!report.location) errors.push("Location is required.");
  if (isJunkText(report.role)) errors.push("Use a real role title, not a test value.");
  if (isJunkText(report.company)) errors.push("Use a real company name, not a test value.");
  if (isJunkText(report.location)) errors.push("Use a real location, not a test value.");
  if (!Number.isFinite(report.rawPay) || report.rawPay <= 0) errors.push("Pay amount must be greater than zero.");
  if (!report.annualPay) errors.push("Annualized pay could not be calculated.");
  if (report.payType === "hourly" && (report.rawPay < 7.25 || report.rawPay > 500)) {
    errors.push("Hourly base pay must be between $7.25 and $500.");
  }
  if (report.payType === "salary" && (report.rawPay < 15000 || report.rawPay > 1000000)) {
    errors.push("Annual base pay must be between $15,000 and $1,000,000.");
  }
  if (report.bonusAmount > 1000000) {
    errors.push("Bonus looks too high for this prototype.");
  }
  if (!report.linkedinUrl || !report.linkedinUrl.includes("linkedin.com")) {
    errors.push("LinkedIn verification link is required.");
  }

  const duplicate = reports.find((candidate) => reportFingerprint(candidate) === reportFingerprint(report));
  if (duplicate) {
    errors.push("This exact report was already submitted.");
  }

  const peerValues = reports
    .filter((candidate) => normalizedKey(candidate.company) === normalizedKey(report.company) && normalizedKey(candidate.role) === normalizedKey(report.role))
    .map((candidate) => candidate.annualPay)
    .sort((a, b) => a - b);

  if (peerValues.length >= 3) {
    const middle = peerValues[Math.floor(peerValues.length / 2)];
    if (report.annualPay > middle * 3 || report.annualPay < middle * 0.3) {
      errors.push("This pay is far outside existing reports for that company and role. Add better context or check the amount.");
    }
  }

  return errors;
}

async function handleReportRoutes(req, res, url) {
  if (url.pathname === "/api/options" && req.method === "GET") {
    sendJson(res, 200, reportOptions());
    return true;
  }

  if (url.pathname === "/api/reports" && req.method === "GET") {
    sendJson(res, 200, { reports: readReports() });
    return true;
  }

  if (url.pathname === "/api/reports" && req.method === "POST") {
    try {
      const body = await readRequestBody(req);
      const payload = JSON.parse(body || "{}");
      const report = createStoredReport(payload);
      const errors = validateReport(report);

      if (errors.length) {
        sendJson(res, 400, { errors });
        return true;
      }

      const reports = readReports();
      reports.unshift(report);
      writeReports(reports.slice(0, 500));
      sendJson(res, 201, { report });
    } catch {
      sendJson(res, 400, { errors: ["Report payload must be valid JSON."] });
    }

    return true;
  }

  return false;
}

function redirect(res, location, headers = {}) {
  res.writeHead(302, {
    Location: location,
    ...headers
  });
  res.end();
}

function parseCookies(req) {
  const cookies = {};
  const header = req.headers.cookie || "";

  header.split(";").forEach((part) => {
    const [key, ...rest] = part.trim().split("=");
    if (!key) return;
    cookies[key] = decodeURIComponent(rest.join("="));
  });

  return cookies;
}

function sign(value) {
  return crypto.createHmac("sha256", sessionSecret).update(value).digest("hex");
}

function encodeSession(user) {
  const payload = Buffer.from(JSON.stringify(user)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decodeSession(value) {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature || sign(payload) !== signature) return null;

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function cookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`, "Path=/", "HttpOnly", "SameSite=Lax"];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

function clearCookie(name) {
  return cookie(name, "", { maxAge: 0 });
}

function publicBaseUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || "http";
  return `${proto}://${req.headers.host}`;
}

function configuredRedirectUri(req) {
  return googleRedirectUri || `${publicBaseUrl(req)}/auth/google/callback`;
}

function googleIsConfigured() {
  return Boolean(googleClientId && googleClientSecret);
}

function handleGoogleStart(req, res) {
  if (!googleIsConfigured()) {
    redirect(res, "/login.html?error=google-not-configured");
    return true;
  }

  const state = crypto.randomBytes(24).toString("hex");
  const params = new URLSearchParams({
    client_id: googleClientId,
    redirect_uri: configuredRedirectUri(req),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account"
  });

  redirect(res, `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`, {
    "Set-Cookie": cookie(stateCookie, state, { maxAge: 600 })
  });
  return true;
}

async function handleGoogleCallback(req, res, url) {
  const cookies = parseCookies(req);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state || state !== cookies[stateCookie]) {
    redirect(res, "/login.html?error=google-state");
    return true;
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: configuredRedirectUri(req),
        grant_type: "authorization_code"
      })
    });

    if (!tokenResponse.ok) {
      throw new Error("Token exchange failed");
    }

    const token = await tokenResponse.json();
    const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    });

    if (!profileResponse.ok) {
      throw new Error("Profile request failed");
    }

    const profile = await profileResponse.json();
    const user = {
      name: profile.name || profile.email || "Google user",
      email: profile.email || "",
      picture: profile.picture || "",
      provider: "google"
    };

    redirect(res, "/", {
      "Set-Cookie": [cookie(sessionCookie, encodeSession(user), { maxAge: 60 * 60 * 24 * 30 }), clearCookie(stateCookie)]
    });
  } catch {
    redirect(res, "/login.html?error=google-failed", {
      "Set-Cookie": clearCookie(stateCookie)
    });
  }

  return true;
}

async function handleAuthRoutes(req, res, url) {
  if (url.pathname === "/api/session") {
    sendJson(res, 200, { user: decodeSession(parseCookies(req)[sessionCookie]) });
    return true;
  }

  if (url.pathname === "/auth/google") {
    return handleGoogleStart(req, res);
  }

  if (url.pathname === "/auth/google/callback") {
    return handleGoogleCallback(req, res, url);
  }

  if (url.pathname === "/auth/logout") {
    redirect(res, "/", {
      "Set-Cookie": clearCookie(sessionCookie)
    });
    return true;
  }

  return false;
}

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const requestedPath = pathname === "/" ? "/index.html" : pathname === "/login" ? "/login.html" : pathname;
  const filePath = path.normalize(path.join(rootDir, requestedPath));

  if (!filePath.startsWith(rootDir)) {
    return path.join(rootDir, "index.html");
  }

  return filePath;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, publicBaseUrl(req));
  if (await handleAuthRoutes(req, res, url)) {
    return;
  }
  if (await handleReportRoutes(req, res, url)) {
    return;
  }

  const filePath = resolveRequestPath(req.url);
  const fallbackPath = path.join(rootDir, "index.html");
  const finalPath = fs.existsSync(filePath) && fs.statSync(filePath).isFile() ? filePath : fallbackPath;
  const extension = path.extname(finalPath).toLowerCase();

  if (finalPath.startsWith(dataDir)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  res.writeHead(200, {
    "Content-Type": contentTypes[extension] || "application/octet-stream"
  });
  fs.createReadStream(finalPath).pipe(res);
});

server.listen(port, () => {
  console.log(`FairPay running on port ${port}`);
});
