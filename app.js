const STORAGE_KEY = "wagesignal.userReports";
const REACTION_KEY = "wagesignal.reactions";

const industries = [
  "Technology",
  "Healthcare",
  "Construction",
  "Education",
  "Finance",
  "Hospitality",
  "Manufacturing",
  "Retail",
  "Logistics",
  "Public Sector",
  "Media",
  "Energy",
  "Other"
];

const defaultCompanies = [
  "Acme Tech",
  "Bayfront Health",
  "Civic Works",
  "Metro Schools",
  "Northstar Finance",
  "Union Local 48"
];

const defaultRoles = [
  "Data analyst",
  "Senior product designer",
  "ICU registered nurse",
  "Journeyman electrician",
  "Public school teacher",
  "Customer success manager"
];

const ADD_NEW_COMPANY = "__add_new_company__";
const ADD_NEW_ROLE = "__add_new_role__";
const ADD_NEW_LOCATION = "__add_new_location__";

const sampleReports = [
  {
    id: "sample-1",
    role: "Senior product designer",
    company: "Acme Tech",
    industry: "Technology",
    location: "San Francisco, CA",
    annualPay: 184000,
    rawPay: 184000,
    payType: "salary",
    experience: "Senior",
    gender: "Female",
    workStyle: "Hybrid",
    companySize: "1k-10k",
    note: "Base plus annual bonus. Offer improved after sharing a competing range from a peer group.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-05-07T10:12:00.000Z",
    helpful: 42,
    similar: 18,
    source: "sample"
  },
  {
    id: "sample-2",
    role: "ICU registered nurse",
    company: "Bayfront Health",
    industry: "Healthcare",
    location: "Chicago, IL",
    annualPay: 98500,
    rawPay: 47,
    payType: "hourly",
    experience: "Mid",
    gender: "Female",
    workStyle: "On-site",
    companySize: "10k+",
    note: "Night differential and weekend rotation account for about 12 percent of total pay.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-05-06T15:41:00.000Z",
    helpful: 31,
    similar: 22,
    source: "sample"
  },
  {
    id: "sample-3",
    role: "Journeyman electrician",
    company: "Union Local 48",
    industry: "Construction",
    location: "Denver, CO",
    annualPay: 87360,
    rawPay: 42,
    payType: "hourly",
    experience: "Senior",
    gender: "Male",
    workStyle: "Field",
    companySize: "51-250",
    note: "Union site with overtime available most months. Benefits are separate from this pay figure.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-05-05T08:20:00.000Z",
    helpful: 24,
    similar: 15,
    source: "sample"
  },
  {
    id: "sample-4",
    role: "Data analyst",
    company: "Northstar Finance",
    industry: "Finance",
    location: "Charlotte, NC",
    annualPay: 106000,
    rawPay: 106000,
    payType: "salary",
    experience: "Mid",
    gender: "Female",
    workStyle: "Hybrid",
    companySize: "10k+",
    note: "Includes 8 percent target bonus. SQL, dashboarding, and forecasting are the main skill mix.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-05-03T19:12:00.000Z",
    helpful: 37,
    similar: 12,
    source: "sample"
  },
  {
    id: "sample-5",
    role: "Public school teacher",
    company: "Metro Schools",
    industry: "Education",
    location: "Minneapolis, MN",
    annualPay: 62400,
    rawPay: 62400,
    payType: "salary",
    experience: "Senior",
    gender: "Female",
    workStyle: "On-site",
    companySize: "1k-10k",
    note: "Tenth year on the scale with a masters stipend. Summer program pay excluded.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-05-01T17:05:00.000Z",
    helpful: 29,
    similar: 19,
    source: "sample"
  },
  {
    id: "sample-6",
    role: "Sous chef",
    company: "Austin Table Group",
    industry: "Hospitality",
    location: "Austin, TX",
    annualPay: 57200,
    rawPay: 57200,
    payType: "salary",
    experience: "Lead",
    gender: "Male",
    workStyle: "On-site",
    companySize: "51-250",
    note: "Five-day schedule. Bonus depends on food cost targets and private event volume.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-04-30T13:52:00.000Z",
    helpful: 16,
    similar: 8,
    source: "sample"
  },
  {
    id: "sample-7",
    role: "Union machinist",
    company: "Great Lakes Manufacturing",
    industry: "Manufacturing",
    location: "Detroit, MI",
    annualPay: 79040,
    rawPay: 38,
    payType: "hourly",
    experience: "Senior",
    gender: "Male",
    workStyle: "On-site",
    companySize: "1k-10k",
    note: "Second shift premium included. Training new operators adds occasional overtime.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-04-28T11:10:00.000Z",
    helpful: 22,
    similar: 11,
    source: "sample"
  },
  {
    id: "sample-8",
    role: "Warehouse operations lead",
    company: "Desert Logistics",
    industry: "Logistics",
    location: "Phoenix, AZ",
    annualPay: 63200,
    rawPay: 63200,
    payType: "salary",
    experience: "Lead",
    gender: "Undisclosed",
    workStyle: "On-site",
    companySize: "251-1k",
    note: "Supervises inbound team. Peak season bonus has ranged from 2 to 5 percent.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-04-26T09:45:00.000Z",
    helpful: 18,
    similar: 10,
    source: "sample"
  },
  {
    id: "sample-9",
    role: "Customer success manager",
    company: "Acme Tech",
    industry: "Technology",
    location: "Raleigh, NC",
    annualPay: 128000,
    rawPay: 128000,
    payType: "salary",
    experience: "Manager",
    gender: "Female",
    workStyle: "Remote",
    companySize: "251-1k",
    note: "OTE includes base plus retention bonus. No commission on expansions.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-04-24T14:18:00.000Z",
    helpful: 34,
    similar: 13,
    source: "sample"
  },
  {
    id: "sample-10",
    role: "City transportation planner",
    company: "Civic Works",
    industry: "Public Sector",
    location: "Portland, OR",
    annualPay: 88400,
    rawPay: 88400,
    payType: "salary",
    experience: "Mid",
    gender: "Nonbinary",
    workStyle: "Hybrid",
    companySize: "1k-10k",
    note: "Step increase expected next fiscal year. Pension contribution is not included.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-04-20T16:07:00.000Z",
    helpful: 21,
    similar: 9,
    source: "sample"
  },
  {
    id: "sample-11",
    role: "Retail store manager",
    company: "Market Square Retail",
    industry: "Retail",
    location: "Columbus, OH",
    annualPay: 74200,
    rawPay: 74200,
    payType: "salary",
    experience: "Manager",
    gender: "Male",
    workStyle: "On-site",
    companySize: "10k+",
    note: "Includes quarterly bonus at target. Holiday coverage changes total hours a lot.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-04-19T12:22:00.000Z",
    helpful: 14,
    similar: 7,
    source: "sample"
  },
  {
    id: "sample-12",
    role: "Wind turbine technician",
    company: "Prairie Wind Energy",
    industry: "Energy",
    location: "Amarillo, TX",
    annualPay: 81120,
    rawPay: 39,
    payType: "hourly",
    experience: "Mid",
    gender: "Undisclosed",
    workStyle: "Field",
    companySize: "251-1k",
    note: "Travel weeks and safety certification premium are included in the hourly average.",
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: "2026-04-17T07:56:00.000Z",
    helpful: 19,
    similar: 6,
    source: "sample"
  }
];

const state = {
  search: "",
  industry: "All",
  experience: "All",
  activeReportId: null,
  curveFilter: "All",
  sort: "newest",
  userReports: [],
  companies: [...defaultCompanies],
  roles: [...defaultRoles],
  locations: [],
  reactions: loadReactions()
};

const elements = {
  form: document.querySelector("#payForm"),
  role: document.querySelector("#role"),
  newRole: document.querySelector("#newRole"),
  newRoleField: document.querySelector("#newRoleField"),
  company: document.querySelector("#company"),
  newCompany: document.querySelector("#newCompany"),
  newCompanyField: document.querySelector("#newCompanyField"),
  industry: document.querySelector("#industry"),
  location: document.querySelector("#location"),
  newLocation: document.querySelector("#newLocation"),
  newLocationField: document.querySelector("#newLocationField"),
  payType: document.querySelector("#payType"),
  payAmount: document.querySelector("#payAmount"),
  payAmountLabel: document.querySelector("#payAmountLabel"),
  bonusAmount: document.querySelector("#bonusAmount"),
  experience: document.querySelector("#experience"),
  gender: document.querySelector("#gender"),
  workStyle: document.querySelector("#workStyle"),
  companySize: document.querySelector("#companySize"),
  linkedinUrl: document.querySelector("#linkedinUrl"),
  linkedinVerify: document.querySelector("#linkedinVerify"),
  linkedinVerified: document.querySelector("#linkedinVerified"),
  linkedinStatus: document.querySelector("#linkedinStatus"),
  note: document.querySelector("#note"),
  searchInput: document.querySelector("#searchInput"),
  industryFilter: document.querySelector("#industryFilter"),
  experienceFilter: document.querySelector("#experienceFilter"),
  sortSelect: document.querySelector("#sortSelect"),
  resetFilters: document.querySelector("#resetFilters"),
  feedList: document.querySelector("#feedList"),
  activeSummary: document.querySelector("#activeSummary"),
  headerReportCount: document.querySelector("#headerReportCount"),
  headerIndustryCount: document.querySelector("#headerIndustryCount"),
  headerMedianPay: document.querySelector("#headerMedianPay"),
  authLink: document.querySelector("#authLink"),
  medianStat: document.querySelector("#medianStat"),
  rangeStat: document.querySelector("#rangeStat"),
  topStat: document.querySelector("#topStat"),
  sampleStat: document.querySelector("#sampleStat"),
  distributionLabel: document.querySelector("#distributionLabel"),
  distributionChart: document.querySelector("#distributionChart"),
  industryBreakdown: document.querySelector("#industryBreakdown"),
  reportDrawer: document.querySelector("#reportDrawer"),
  drawerContent: document.querySelector("#drawerContent"),
  toast: document.querySelector("#toast")
};

function loadUserReports() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

async function loadServerReports() {
  try {
    const response = await fetch("/api/reports");
    if (!response.ok) throw new Error("Could not load reports");

    const payload = await response.json();
    state.userReports = Array.isArray(payload.reports) ? payload.reports : [];
    mergeOptionsFromReports(state.userReports);
    populateEntitySelects();
  } catch {
    state.userReports = loadUserReports();
    mergeOptionsFromReports(state.userReports);
    populateEntitySelects();
    showToast("Using reports saved on this browser until the server is reachable.");
  }
}

async function loadServerOptions() {
  try {
    const response = await fetch("/api/options");
    if (!response.ok) throw new Error("Could not load options");

    const payload = await response.json();
    state.companies = uniqueSorted([...(payload.companies || []), ...state.companies]);
    state.roles = uniqueSorted([...(payload.roles || []), ...state.roles]);
    state.locations = uniqueSorted([...(payload.locations || []), ...state.locations]);
  } catch {
    mergeOptionsFromReports(loadUserReports());
  }
}

async function saveUserReport(report) {
  const response = await fetch("/api/reports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(report)
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((payload.errors || ["Could not save report."]).join(" "));
  }

  state.userReports.unshift(payload.report);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userReports));
  return payload.report;
}

function loadReactions() {
  try {
    return JSON.parse(localStorage.getItem(REACTION_KEY)) || {};
  } catch {
    return {};
  }
}

function saveReactions() {
  localStorage.setItem(REACTION_KEY, JSON.stringify(state.reactions));
}

function allReports() {
  return [...state.userReports, ...sampleReports];
}

function uniqueSorted(values) {
  return [...new Set(values.map((value) => cleanText(value, 80)).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function mergeOptionsFromReports(reports) {
  state.companies = uniqueSorted([...state.companies, ...sampleReports.map((report) => report.company), ...reports.map((report) => report.company)]);
  state.roles = uniqueSorted([...state.roles, ...sampleReports.map((report) => report.role), ...reports.map((report) => report.role)]);
  state.locations = uniqueSorted([...state.locations, ...sampleReports.map((report) => report.location), ...reports.map((report) => report.location)]);
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function compactMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0
  }).format(value);
}

function formatHourly(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(value);
}

function formatDate(value) {
  const now = Date.now();
  const then = new Date(value).getTime();
  const diffDays = Math.max(1, Math.round((now - then) / 86400000));

  if (diffDays === 1) {
    return "1 day ago";
  }

  if (diffDays < 31) {
    return `${diffDays} days ago`;
  }

  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(value));
}

function median(values) {
  return percentile(values, 50);
}

function percentile(values, target) {
  if (!values.length) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const index = (target / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) return sorted[lower];

  const weight = index - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

function reactionFor(reportId, type) {
  return state.reactions[reportId]?.[type] ? 1 : 0;
}

function reactionCount(report, type) {
  return (report[type] || 0) + reactionFor(report.id, type);
}

function matchesSearch(report) {
  if (!state.search) return true;

  const haystack = [
    report.role,
    report.company,
    report.industry,
    report.location,
    report.experience,
    report.gender,
    report.workStyle,
    report.companySize,
    report.note
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(state.search.toLowerCase());
}

function filteredReports() {
  const filtered = allReports().filter((report) => {
    return (
      matchesSearch(report) &&
      (state.industry === "All" || report.company === state.industry) &&
      (state.experience === "All" || report.experience === state.experience)
    );
  });

  return filtered.sort((a, b) => {
    if (state.sort === "highest") return b.annualPay - a.annualPay;
    if (state.sort === "lowest") return a.annualPay - b.annualPay;
    if (state.sort === "helpful") return reactionCount(b, "helpful") - reactionCount(a, "helpful");
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function populateSelects() {
  elements.industry.innerHTML = industries.map((industry) => `<option value="${industry}">${industry}</option>`).join("");
  elements.industryFilter.innerHTML = [
    '<option value="All">All companies</option>',
    ...state.companies.map((company) => `<option value="${escapeHtml(company)}">${escapeHtml(company)}</option>`)
  ].join("");
  populateEntitySelects();
}

function populateEntitySelects() {
  if (!elements.company || !elements.role) return;

  const selectedCompany = elements.company.value;
  const selectedRole = elements.role.value;
  const selectedLocation = elements.location.value;
  const roleOptions = rolesForCompany(selectedCompany);
  const companyOptions = companiesForIndustry(elements.industry.value);

  elements.company.innerHTML = [
    '<option value="">Select company</option>',
    ...companyOptions.map((company) => `<option value="${escapeHtml(company)}">${escapeHtml(company)}</option>`),
    `<option value="${ADD_NEW_COMPANY}">Add new company...</option>`
  ].join("");

  elements.role.innerHTML = [
    '<option value="">Select role</option>',
    ...roleOptions.map((role) => `<option value="${escapeHtml(role)}">${escapeHtml(role)}</option>`),
    `<option value="${ADD_NEW_ROLE}">Add new role...</option>`
  ].join("");

  elements.location.innerHTML = [
    '<option value="">Select city</option>',
    ...state.locations.map((location) => `<option value="${escapeHtml(location)}">${escapeHtml(location)}</option>`),
    `<option value="${ADD_NEW_LOCATION}">Add new city...</option>`
  ].join("");

  if (companyOptions.includes(selectedCompany) || selectedCompany === ADD_NEW_COMPANY) {
    elements.company.value = selectedCompany;
  }
  if (roleOptions.includes(selectedRole) || selectedRole === ADD_NEW_ROLE) {
    elements.role.value = selectedRole;
  }
  if (state.locations.includes(selectedLocation) || selectedLocation === ADD_NEW_LOCATION) {
    elements.location.value = selectedLocation;
  }
  updateEntityFields();
}

function companiesForIndustry(industry) {
  if (!industry || industry === "Other") {
    return state.companies;
  }

  const companies = allReports()
    .filter((report) => report.industry === industry)
    .map((report) => report.company);

  return uniqueSorted(companies.length ? companies : state.companies);
}

function rolesForCompany(company) {
  if (!company || company === ADD_NEW_COMPANY) {
    return state.roles;
  }

  const companyRoles = allReports()
    .filter((report) => report.company === company)
    .map((report) => report.role);

  return uniqueSorted(companyRoles.length ? companyRoles : state.roles);
}

function inferIndustry(company, role) {
  const reports = allReports();
  const exact = reports.find((report) => report.company === company && report.role === role);
  if (exact?.industry) return exact.industry;

  const companyMatch = reports.find((report) => report.company === company);
  if (companyMatch?.industry) return companyMatch.industry;

  const roleMatch = reports.find((report) => report.role === role);
  if (roleMatch?.industry) return roleMatch.industry;

  return "Other";
}

function updateEntityFields() {
  const addingCompany = elements.company.value === ADD_NEW_COMPANY;
  const addingRole = elements.role.value === ADD_NEW_ROLE;
  const addingLocation = elements.location.value === ADD_NEW_LOCATION;

  elements.newCompanyField.hidden = !addingCompany;
  elements.newRoleField.hidden = !addingRole;
  elements.newLocationField.hidden = !addingLocation;
  elements.newCompany.required = addingCompany;
  elements.newRole.required = addingRole;
  elements.newLocation.required = addingLocation;

  if (!addingCompany) elements.newCompany.value = "";
  if (!addingRole) elements.newRole.value = "";
  if (!addingLocation) elements.newLocation.value = "";
}

function updatePayTypeCopy() {
  const isHourly = elements.payType.value === "hourly";
  elements.payAmountLabel.textContent = isHourly ? "Hourly base" : "Base pay";
  elements.payAmount.placeholder = isHourly ? "42" : "120000";
  elements.payAmount.step = isHourly ? "0.25" : "1";
}

function normalizePay(payType, value) {
  const amount = Number(value);
  if (payType === "hourly") {
    return Math.round(amount * 2080);
  }

  return Math.round(amount / 1000) * 1000;
}

function createReport(formData) {
  const payType = formData.get("payType");
  const rawPay = Number(formData.get("payAmount"));
  const bonusAmount = Number(formData.get("bonusAmount") || 0);
  const selectedCompany = formData.get("company");
  const selectedRole = formData.get("role");
  const selectedLocation = formData.get("location");

  return {
    id: `user-${makeId()}`,
    role: cleanText(selectedRole === ADD_NEW_ROLE ? formData.get("newRole") : selectedRole),
    company: cleanText(selectedCompany === ADD_NEW_COMPANY ? formData.get("newCompany") : selectedCompany, 80),
    industry: formData.get("industry"),
    location: cleanText(selectedLocation === ADD_NEW_LOCATION ? formData.get("newLocation") : selectedLocation),
    annualPay: normalizePay(payType, rawPay) + bonusAmount,
    rawPay,
    bonusAmount,
    payType,
    experience: formData.get("experience"),
    gender: formData.get("gender"),
    workStyle: formData.get("workStyle"),
    companySize: formData.get("companySize"),
    note: cleanText(formData.get("note")) || "No extra context added.",
    linkedinUrl: cleanText(formData.get("linkedinUrl")),
    verificationMethod: "LinkedIn",
    verified: true,
    createdAt: new Date().toISOString(),
    helpful: 0,
    similar: 0,
    source: "user"
  };
}

function makeId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cleanText(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 180);
}

function renderHeader(reports) {
  elements.headerReportCount.textContent = reports.length;
  elements.headerIndustryCount.textContent = new Set(reports.map((report) => report.company).filter(Boolean)).size;
  elements.headerMedianPay.textContent = compactMoney(median(reports.map((report) => report.annualPay)));
}

function renderStats(reports) {
  const values = reports.map((report) => report.annualPay);
  const p25 = percentile(values, 25);
  const p75 = percentile(values, 75);
  const p90 = percentile(values, 90);

  elements.medianStat.textContent = formatMoney(median(values));
  elements.rangeStat.textContent = `${compactMoney(p25)}-${compactMoney(p75)}`;
  elements.topStat.textContent = formatMoney(p90);
  elements.sampleStat.textContent = reports.length;
  elements.distributionLabel.textContent = state.industry === "All" ? "All reports" : state.industry;
}

function renderDistribution(reports) {
  const values = reports.map((report) => report.annualPay);

  if (!values.length) {
    elements.distributionChart.innerHTML = '<div class="empty-state">No matching pay data.</div>';
    return;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const binCount = Math.min(6, Math.max(3, Math.ceil(values.length / 2)));
  const bins = Array.from({ length: binCount }, (_, index) => {
    const start = min + (range / binCount) * index;
    const end = index === binCount - 1 ? max + 1 : min + (range / binCount) * (index + 1);
    const count = values.filter((value) => value >= start && value < end).length;
    return { start, end, count };
  });

  const highest = Math.max(...bins.map((bin) => bin.count), 1);

  elements.distributionChart.innerHTML = bins
    .map((bin) => {
      const width = Math.max(8, (bin.count / highest) * 100);
      return `
        <div class="dist-row">
          <span>${compactMoney(bin.start)}</span>
          <div class="bar-track" aria-hidden="true">
            <div class="bar-fill" style="width: ${width}%"></div>
          </div>
          <span>${bin.count}</span>
        </div>
      `;
    })
    .join("");
}

function groupByIndustry(reports) {
  const groups = new Map();

  reports.forEach((report) => {
    const company = report.company || "Company grouped";
    if (!groups.has(company)) {
      groups.set(company, []);
    }

    groups.get(company).push(report.annualPay);
  });

  return [...groups.entries()]
    .map(([industry, values]) => ({
      industry,
      medianPay: median(values),
      count: values.length
    }))
    .sort((a, b) => b.medianPay - a.medianPay);
}

function renderIndustryBreakdown(reports) {
  const groups = groupByIndustry(reports);

  if (!groups.length) {
    elements.industryBreakdown.innerHTML = '<div class="empty-state">No industry matches.</div>';
    return;
  }

  const max = Math.max(...groups.map((group) => group.medianPay));

  elements.industryBreakdown.innerHTML = groups
    .slice(0, 6)
    .map((group) => {
      const width = Math.max(12, (group.medianPay / max) * 100);
      return `
        <button class="industry-row" type="button" data-filter-industry="${group.industry}">
          <span class="industry-row-top">
            <span>${group.industry}</span>
            <span>${compactMoney(group.medianPay)} · ${group.count}</span>
          </span>
          <span class="industry-track" aria-hidden="true">
            <span class="industry-fill" style="width: ${width}%"></span>
          </span>
        </button>
      `;
    })
    .join("");
}

function renderActiveSummary(reports) {
  const parts = [];

  if (state.industry !== "All") parts.push(state.industry);
  if (state.experience !== "All") parts.push(state.experience);
  if (state.search) parts.push(`"${state.search}"`);

  const scope = parts.length ? parts.join(" + ") : "all anonymous reports";
  elements.activeSummary.textContent = `${reports.length} matching ${scope}`;
}

function renderFeed(reports) {
  if (!reports.length) {
    elements.feedList.innerHTML = '<div class="empty-state">No reports match the current filters.</div>';
    return;
  }

  elements.feedList.innerHTML = reports
    .map((report) => {
      const bonusAmount = Number(report.bonusAmount || 0);
      const hourlyLabel =
        report.payType === "hourly"
          ? `${formatHourly(report.rawPay)}/hr base + ${formatMoney(bonusAmount)} bonus`
          : `${formatMoney(report.rawPay)} base + ${formatMoney(bonusAmount)} bonus`;
      const activeHelpful = reactionFor(report.id, "helpful") ? "is-active" : "";
      const activeSimilar = reactionFor(report.id, "similar") ? "is-active" : "";
      const isUser = report.source === "user" ? "is-user" : "";
      const verifiedBadge = report.verified
        ? `<span class="pill verified">LinkedIn verified</span>`
        : "";

      return `
        <article class="entry-card ${isUser}" data-report-id="${report.id}">
          <div class="entry-top">
            <div>
              <h3 class="role-title">${escapeHtml(report.role)}</h3>
              <div class="pill-row">
                <span class="pill company">${escapeHtml(report.company || "Company grouped")}</span>
                <span class="pill">${escapeHtml(report.location)}</span>
                <span class="pill">${escapeHtml(report.experience)}</span>
                <span class="pill">${escapeHtml(report.gender || "Undisclosed")}</span>
                <span class="pill">${escapeHtml(report.workStyle)}</span>
                <span class="pill">${escapeHtml(report.companySize)}</span>
                ${verifiedBadge}
              </div>
            </div>
            <div class="salary">
              ${formatMoney(report.annualPay)}
              <small>${hourlyLabel}</small>
            </div>
          </div>
          <p class="entry-note">${escapeHtml(report.note)}</p>
          <div class="entry-footer">
            <span class="entry-meta">Anonymous · ${report.verified ? "verified" : "unverified"} · ${formatDate(report.createdAt)}</span>
            <div class="entry-actions">
              <button class="entry-action insight-trigger" type="button" data-open-report="${report.id}">
                View insight
              </button>
              <button class="entry-action ${activeHelpful}" type="button" data-action="helpful" data-id="${report.id}">
                Helpful ${reactionCount(report, "helpful")}
              </button>
              <button class="entry-action ${activeSimilar}" type="button" data-action="similar" data-id="${report.id}">
                Similar role ${reactionCount(report, "similar")}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function findReport(reportId) {
  return allReports().find((report) => report.id === reportId);
}

function cityOf(location) {
  return String(location || "").split(",")[0].trim();
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function percentileRank(values, value) {
  if (!values.length) return 0;
  const below = values.filter((candidate) => candidate < value).length;
  const equal = values.filter((candidate) => candidate === value).length;
  return Math.round(((below + equal * 0.5) / values.length) * 100);
}

function percentDelta(value, baseline) {
  if (!baseline) return 0;
  return Math.round(((value - baseline) / baseline) * 100);
}

function peerReports(report) {
  const reports = allReports();
  const exactPeers = reports.filter((candidate) => {
    return (
      candidate.id !== report.id &&
      candidate.industry === report.industry &&
      (candidate.experience === report.experience || candidate.workStyle === report.workStyle)
    );
  });

  if (exactPeers.length >= 4) {
    return [report, ...exactPeers];
  }

  const industryPeers = reports.filter((candidate) => candidate.industry === report.industry);
  if (industryPeers.length >= 3) {
    return industryPeers;
  }

  return reports;
}

function marketComparison(report, peers) {
  const values = peers.map((candidate) => candidate.annualPay);
  const roleMedian = median(values);
  const industryValues = allReports()
    .filter((candidate) => candidate.industry === report.industry)
    .map((candidate) => candidate.annualPay);
  const locationValues = allReports()
    .filter((candidate) => cityOf(candidate.location) === cityOf(report.location))
    .map((candidate) => candidate.annualPay);

  return {
    peerCount: peers.length,
    percentile: percentileRank(values, report.annualPay),
    roleMedian,
    industryMedian: median(industryValues),
    locationMedian: median(locationValues.length ? locationValues : values),
    middleLow: percentile(values, 25),
    middleHigh: percentile(values, 75),
    topSignal: Math.max(...values)
  };
}

function groupReportsByGender(reports) {
  const groups = new Map();

  reports.forEach((report) => {
    const gender = report.gender || "Undisclosed";
    if (!groups.has(gender)) {
      groups.set(gender, []);
    }
    groups.get(gender).push(report);
  });

  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
}

function renderGenderRows(peers) {
  const groups = groupReportsByGender(peers);
  const values = peers.map((report) => report.annualPay);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);

  return groups
    .map(([gender, reports]) => {
      const groupValues = reports.map((report) => report.annualPay);
      const groupMean = average(groupValues);
      const groupMedian = median(groupValues);
      const low = percentile(groupValues, 25);
      const high = percentile(groupValues, 75);
      const meanPosition = ((groupMean - min) / range) * 100;
      const medianPosition = ((groupMedian - min) / range) * 100;
      const bandStart = ((low - min) / range) * 100;
      const bandWidth = Math.max(6, ((high - low) / range) * 100);

      return `
        <div class="equity-row">
          <div class="equity-row-top">
            <strong>${escapeHtml(gender)}</strong>
            <span>${reports.length} reports</span>
          </div>
          <div class="equity-stats">
            <span><strong>${formatMoney(groupMean)}</strong> mean</span>
            <span><strong>${formatMoney(groupMedian)}</strong> median</span>
            <span><strong>${compactMoney(low)}-${compactMoney(high)}</strong> middle 50%</span>
          </div>
          <div class="equity-track" aria-hidden="true">
            <span class="equity-band" style="left: ${bandStart}%; width: ${bandWidth}%"></span>
            <span class="equity-marker mean" style="left: ${meanPosition}%"></span>
            <span class="equity-marker median" style="left: ${medianPosition}%"></span>
          </div>
        </div>
      `;
    })
    .join("");
}

function curvePoints(values, min, max) {
  const range = Math.max(max - min, 1);
  const checkpoints = [10, 25, 50, 75, 90];

  return checkpoints
    .map((checkpoint, index) => {
      const value = percentile(values, checkpoint);
      const x = 16 + index * 67;
      const y = 104 - ((value - min) / range) * 76;
      return `${x},${Math.max(18, Math.min(106, y))}`;
    })
    .join(" ");
}

function renderCurveToggle(groups, selected) {
  const available = ["All", ...groups.map(([gender]) => gender)];

  return `
    <div class="curve-toggle" role="group" aria-label="Pay curve group">
      ${available
        .map((gender) => {
          const isActive = gender === selected ? "is-active" : "";
          return `<button class="${isActive}" type="button" data-curve-filter="${escapeHtml(gender)}">${escapeHtml(gender)}</button>`;
        })
        .join("")}
    </div>
  `;
}

function renderPayCurve(peers, selected = "All") {
  const allValues = peers.map((report) => report.annualPay);
  const valuesByGender = groupReportsByGender(peers).slice(0, 3);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const allSeries = [
    { label: "All reports", className: "all", values: allValues },
    ...valuesByGender.map(([gender, reports]) => ({
      label: gender,
      className: gender.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      values: reports.map((report) => report.annualPay)
    }))
  ];
  const series = selected === "All" ? allSeries : allSeries.filter((item) => item.label === selected);
  const visibleSeries = series.length ? series : allSeries;

  return `
    <div class="curve-card">
      <svg class="pay-curve" viewBox="0 0 304 124" role="img" aria-label="Percentile pay curve by gender group">
        <line x1="16" y1="106" x2="284" y2="106"></line>
        <line x1="16" y1="18" x2="16" y2="106"></line>
        ${visibleSeries
          .map((item) => {
            return `<polyline class="curve-line ${item.className}" points="${curvePoints(item.values, min, max)}"></polyline>`;
          })
          .join("")}
      </svg>
      <div class="curve-legend">
        ${visibleSeries.map((item) => `<span class="${item.className}">${escapeHtml(item.label)}</span>`).join("")}
      </div>
      <div class="curve-axis">
        <span>10th</span>
        <span>25th</span>
        <span>50th</span>
        <span>75th</span>
        <span>90th</span>
      </div>
    </div>
  `;
}

function insightFlags(report, comparison, peers) {
  const flags = [];
  const note = report.note.toLowerCase();
  const adjustedGap = percentDelta(comparison.roleMedian, comparison.industryMedian);

  if (note.includes("competing") || note.includes("offer") || note.includes("negotiated")) {
    flags.push("Negotiation signal: reports mentioning competing offers often sit above peer median.");
  }

  if (note.includes("overtime") || note.includes("differential") || note.includes("bonus")) {
    flags.push("Compensation mix: bonus, differential, or overtime may explain part of the total.");
  }

  if (comparison.percentile >= 75) {
    flags.push("Market position: this report is in the upper quartile of comparable reports.");
  } else if (comparison.percentile <= 25) {
    flags.push("Market position: this report is in the lower quartile and may deserve a closer fairness check.");
  }

  flags.push(
    peers.length >= 8
      ? "Confidence: enough peer reports for a directional benchmark."
      : "Confidence: sample is still thin, so treat this as an early signal."
  );

  flags.push(`Adjusted gap proxy: peer median is ${Math.abs(adjustedGap)}% ${adjustedGap >= 0 ? "above" : "below"} industry median.`);

  return flags;
}

function openReportDrawer(reportId, curveFilter = "All") {
  const report = findReport(reportId);
  if (!report) return;

  state.activeReportId = reportId;
  state.curveFilter = curveFilter;
  const peers = peerReports(report);
  const comparison = marketComparison(report, peers);
  const values = peers.map((candidate) => candidate.annualPay);
  const genderGroups = groupReportsByGender(peers).slice(0, 3);
  const hourlyLabel = report.payType === "hourly" ? `${formatHourly(report.rawPay)}/hr annualized` : "annual total";
  const deltaRole = percentDelta(report.annualPay, comparison.roleMedian);
  const deltaLocation = percentDelta(report.annualPay, comparison.locationMedian);

  elements.drawerContent.innerHTML = `
    <div class="drawer-heading">
      <p class="eyebrow">Job insight</p>
      <h2 id="drawerTitle">${escapeHtml(report.role)}</h2>
      <div class="drawer-pay">
        <strong>${formatMoney(report.annualPay)}</strong>
        <span>${hourlyLabel}</span>
      </div>
      <div class="pill-row">
        <span class="pill company">${escapeHtml(report.company || "Company grouped")}</span>
        <span class="pill">${escapeHtml(report.location)}</span>
        <span class="pill">${escapeHtml(report.experience)}</span>
        <span class="pill">${escapeHtml(report.gender || "Undisclosed")}</span>
        <span class="pill">${escapeHtml(report.workStyle)}</span>
        <span class="pill">${escapeHtml(report.companySize)}</span>
      </div>
    </div>

    <div class="drawer-grid">
      <div class="insight-tile">
        <span>Percentile</span>
        <strong>${comparison.percentile}th</strong>
        <small>within ${comparison.peerCount} comparable reports</small>
      </div>
      <div class="insight-tile">
        <span>Peer median</span>
        <strong>${formatMoney(comparison.roleMedian)}</strong>
        <small>${deltaRole >= 0 ? "+" : ""}${deltaRole}% vs peer median</small>
      </div>
      <div class="insight-tile">
        <span>Local signal</span>
        <strong>${formatMoney(comparison.locationMedian)}</strong>
        <small>${deltaLocation >= 0 ? "+" : ""}${deltaLocation}% vs ${escapeHtml(cityOf(report.location))}</small>
      </div>
      <div class="insight-tile">
        <span>Middle 50%</span>
        <strong>${compactMoney(comparison.middleLow)}-${compactMoney(comparison.middleHigh)}</strong>
        <small>top signal ${formatMoney(comparison.topSignal)}</small>
      </div>
    </div>

    <section class="drawer-section">
      <div class="mini-heading">
        <h3>Pay equity curve</h3>
        <span>percentiles by group</span>
      </div>
      ${renderCurveToggle(genderGroups, curveFilter)}
      ${renderPayCurve(peers, curveFilter)}
    </section>

    <section class="drawer-section">
      <div class="mini-heading">
        <h3>Distribution by gender</h3>
        <span>${compactMoney(Math.min(...values))}-${compactMoney(Math.max(...values))}</span>
      </div>
      <div class="equity-list">
        ${renderGenderRows(peers)}
      </div>
    </section>

    <section class="drawer-section">
      <div class="mini-heading">
        <h3>Negotiation and trust signals</h3>
        <span>directional</span>
      </div>
      <ul class="signal-list">
        ${insightFlags(report, comparison, peers).map((flag) => `<li>${escapeHtml(flag)}</li>`).join("")}
      </ul>
    </section>
  `;

  elements.reportDrawer.classList.add("is-open");
  elements.reportDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-drawer");
}

function closeReportDrawer() {
  state.activeReportId = null;
  state.curveFilter = "All";
  elements.reportDrawer.classList.remove("is-open");
  elements.reportDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-drawer");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function render() {
  const reports = filteredReports();
  const all = allReports();

  renderHeader(all);
  renderStats(reports);
  renderDistribution(reports);
  renderIndustryBreakdown(reports);
  renderActiveSummary(reports);
  renderFeed(reports);
}

async function renderAuthState() {
  if (!elements.authLink) return;

  try {
    const response = await fetch("/api/session");
    const session = await response.json();

    if (session.user) {
      elements.authLink.textContent = session.user.name.split(" ")[0] || "Account";
      elements.authLink.href = "/auth/logout";
      elements.authLink.title = "Log out";
    }
  } catch {
    elements.authLink.textContent = "Log in";
    elements.authLink.href = "/login.html";
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");

  window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2600);
}

function toggleReaction(reportId, type) {
  const current = state.reactions[reportId] || {};
  state.reactions[reportId] = {
    ...current,
    [type]: !current[type]
  };
  saveReactions();
  render();
}

function bindEvents() {
  elements.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (elements.linkedinVerified.value !== "true") {
      showToast("Verify with LinkedIn before posting.");
      elements.linkedinUrl.focus();
      return;
    }

    const formData = new FormData(elements.form);
    const report = createReport(formData);

    try {
      await saveUserReport(report);
      if (report.company && !state.companies.includes(report.company)) state.companies.push(report.company);
      if (report.role && !state.roles.includes(report.role)) state.roles.push(report.role);
      if (report.location && !state.locations.includes(report.location)) state.locations.push(report.location);
      state.companies = uniqueSorted(state.companies);
      state.roles = uniqueSorted(state.roles);
      state.locations = uniqueSorted(state.locations);
      elements.form.reset();
      populateEntitySelects();
      elements.experience.value = "Entry";
      elements.gender.value = "Male";
      elements.workStyle.value = "On-site";
      elements.companySize.value = "1-50";
      elements.bonusAmount.value = "0";
      resetLinkedInVerification();
      updatePayTypeCopy();
      render();
      showToast("LinkedIn-verified anonymous report saved to the server.");
    } catch (error) {
      showToast(error.message || "Could not save report to the server.");
    }
  });

  elements.payType.addEventListener("change", updatePayTypeCopy);
  elements.industry.addEventListener("change", () => {
    elements.company.value = "";
    elements.role.value = "";
    populateEntitySelects();
  });
  elements.company.addEventListener("change", () => {
    populateEntitySelects();
    updateEntityFields();
  });
  elements.role.addEventListener("change", updateEntityFields);
  elements.location.addEventListener("change", updateEntityFields);

  elements.linkedinVerify.addEventListener("click", () => {
    if (!isLinkedInUrl(elements.linkedinUrl.value)) {
      elements.linkedinVerified.value = "false";
      elements.linkedinStatus.textContent = "Enter a valid LinkedIn profile link to verify.";
      elements.linkedinStatus.classList.remove("is-verified");
      elements.linkedinUrl.focus();
      return;
    }

    elements.linkedinVerified.value = "true";
    elements.linkedinStatus.textContent = "LinkedIn verification connected for this prototype.";
    elements.linkedinStatus.classList.add("is-verified");
    showToast("LinkedIn profile verified for this contribution.");
  });

  elements.linkedinUrl.addEventListener("input", resetLinkedInVerification);

  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    render();
  });

  elements.industryFilter.addEventListener("change", (event) => {
    state.industry = event.target.value;
    render();
  });

  elements.experienceFilter.addEventListener("change", (event) => {
    state.experience = event.target.value;
    render();
  });

  elements.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });

  elements.resetFilters.addEventListener("click", () => {
    state.search = "";
    state.industry = "All";
    state.experience = "All";
    state.sort = "newest";
    elements.searchInput.value = "";
    elements.industryFilter.value = "All";
    elements.experienceFilter.value = "All";
    elements.sortSelect.value = "newest";
    render();
  });

  elements.feedList.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-report]");
    if (openButton) {
      openReportDrawer(openButton.dataset.openReport);
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) {
      const card = event.target.closest("[data-report-id]");
      if (card) {
        openReportDrawer(card.dataset.reportId);
      }
      return;
    }

    toggleReaction(actionButton.dataset.id, actionButton.dataset.action);
  });

  elements.reportDrawer.addEventListener("click", (event) => {
    const curveButton = event.target.closest("[data-curve-filter]");
    if (curveButton && state.activeReportId) {
      openReportDrawer(state.activeReportId, curveButton.dataset.curveFilter);
      return;
    }

    if (!event.target.closest("[data-close-drawer]")) return;

    closeReportDrawer();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.reportDrawer.classList.contains("is-open")) {
      closeReportDrawer();
    }
  });

  elements.industryBreakdown.addEventListener("click", (event) => {
    const industryButton = event.target.closest("[data-filter-industry]");
    if (!industryButton) return;

    state.industry = industryButton.dataset.filterIndustry;
    elements.industryFilter.value = state.industry;
    render();
  });
}

function isLinkedInUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.toLowerCase().endsWith("linkedin.com");
  } catch {
    return false;
  }
}

function resetLinkedInVerification() {
  elements.linkedinVerified.value = "false";
  elements.linkedinStatus.textContent = "LinkedIn verification required before posting.";
  elements.linkedinStatus.classList.remove("is-verified");
}

populateSelects();
updatePayTypeCopy();
bindEvents();
render();
renderAuthState();
Promise.all([loadServerOptions(), loadServerReports()]).then(() => {
  populateSelects();
  render();
});
