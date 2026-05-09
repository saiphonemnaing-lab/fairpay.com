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

  const filePath = resolveRequestPath(req.url);
  const fallbackPath = path.join(rootDir, "index.html");
  const finalPath = fs.existsSync(filePath) && fs.statSync(filePath).isFile() ? filePath : fallbackPath;
  const extension = path.extname(finalPath).toLowerCase();

  res.writeHead(200, {
    "Content-Type": contentTypes[extension] || "application/octet-stream"
  });
  fs.createReadStream(finalPath).pipe(res);
});

server.listen(port, () => {
  console.log(`FairPay running on port ${port}`);
});
