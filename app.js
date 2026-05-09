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
  "Energy"
];

const genderGroups = ["Male", "Female", "Others"];

const sampleReports = [
  {
    id: "sample-1",
    role: "Senior product designer",
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
    createdAt: "2026-05-07T10:12:00.000Z",
    helpful: 42,
    similar: 18,
    source: "sample"
  },
  {
    id: "sample-2",
    role: "ICU registered nurse",
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
    createdAt: "2026-05-06T15:41:00.000Z",
    helpful: 31,
    similar: 22,
    source: "sample"
  },
  {
    id: "sample-3",
    role: "Journeyman electrician",
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
    createdAt: "2026-05-05T08:20:00.000Z",
    helpful: 24,
    similar: 15,
    source: "sample"
  },
  {
    id: "sample-4",
    role: "Data analyst",
    industry: "Finance",
    location: "Charlotte, NC",
    annualPay: 106000,
    rawPay: 106000,
    payType: "salary",
    experience: "Mid",
    gender: "Others",
    workStyle: "Hybrid",
    companySize: "10k+",
    note: "Includes 8 percent target bonus. SQL, dashboarding, and forecasting are the main skill mix.",
    createdAt: "2026-05-03T19:12:00.000Z",
    helpful: 37,
    similar: 12,
    source: "sample"
  },
  {
    id: "sample-5",
    role: "Public school teacher",
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
    createdAt: "2026-05-01T17:05:00.000Z",
    helpful: 29,
    similar: 19,
    source: "sample"
  },
  {
    id: "sample-6",
    role: "Sous chef",
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
    createdAt: "2026-04-30T13:52:00.000Z",
    helpful: 16,
    similar: 8,
    source: "sample"
  },
  {
    id: "sample-7",
    role: "Union machinist",
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
    createdAt: "2026-04-28T11:10:00.000Z",
    helpful: 22,
    similar: 11,
    source: "sample"
  },
  {
    id: "sample-8",
    role: "Warehouse operations lead",
    industry: "Logistics",
    location: "Phoenix, AZ",
    annualPay: 63200,
    rawPay: 63200,
    payType: "salary",
    experience: "Lead",
    gender: "Female",
    workStyle: "On-site",
    companySize: "251-1k",
    note: "Supervises inbound team. Peak season bonus has ranged from 2 to 5 percent.",
    createdAt: "2026-04-26T09:45:00.000Z",
    helpful: 18,
    similar: 10,
    source: "sample"
  },
  {
    id: "sample-9",
    role: "Customer success manager",
    industry: "Technology",
    location: "Raleigh, NC",
    annualPay: 128000,
    rawPay: 128000,
    payType: "salary",
    experience: "Manager",
    gender: "Others",
    workStyle: "Remote",
    companySize: "251-1k",
    note: "OTE includes base plus retention bonus. No commission on expansions.",
    createdAt: "2026-04-24T14:18:00.000Z",
    helpful: 34,
    similar: 13,
    source: "sample"
  },
  {
    id: "sample-10",
    role: "City transportation planner",
    industry: "Public Sector",
    location: "Portland, OR",
    annualPay: 88400,
    rawPay: 88400,
    payType: "salary",
    experience: "Mid",
    gender: "Female",
    workStyle: "Hybrid",
    companySize: "1k-10k",
    note: "Step increase expected next fiscal year. Pension contribution is not included.",
    createdAt: "2026-04-20T16:07:00.000Z",
    helpful: 21,
    similar: 9,
    source: "sample"
  },
  {
    id: "sample-11",
    role: "Retail store manager",
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
    createdAt: "2026-04-19T12:22:00.000Z",
    helpful: 14,
    similar: 7,
    source: "sample"
  },
  {
    id: "sample-12",
    role: "Wind turbine technician",
    industry: "Energy",
    location: "Amarillo, TX",
    annualPay: 81120,
    rawPay: 39,
    payType: "hourly",
    experience: "Mid",
    gender: "Others",
    workStyle: "Field",
    companySize: "251-1k",
    note: "Travel weeks and safety certification premium are included in the hourly average.",
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
  sort: "newest",
  userReports: loadUserReports(),
  reactions: loadReactions()
};

const elements = {
  form: document.querySelector("#payForm"),
  role: document.querySelector("#role"),
  industry: document.querySelector("#industry"),
  location: document.querySelector("#location"),
  payType: document.querySelector("#payType"),
  payAmount: document.querySelector("#payAmount"),
  payAmountLabel: document.querySelector("#payAmountLabel"),
  experience: document.querySelector("#experience"),
  gender: document.querySelector("#gender"),
  workStyle: document.querySelector("#workStyle"),
  companySize: document.querySelector("#companySize"),
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
  medianStat: document.querySelector("#medianStat"),
  rangeStat: document.querySelector("#rangeStat"),
  topStat: document.querySelector("#topStat"),
  sampleStat: document.querySelector("#sampleStat"),
  distributionLabel: document.querySelector("#distributionLabel"),
  distributionChart: document.querySelector("#distributionChart"),
  industryBreakdown: document.querySelector("#industryBreakdown"),
  toast: document.querySelector("#toast")
};

function loadUserReports() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUserReports() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userReports));
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
  return [...state.userReports, ...sampleReports].map((report) => ({
    ...report,
    gender: genderGroups.includes(report.gender) ? report.gender : "Others"
  }));
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
      (state.industry === "All" || report.industry === state.industry) &&
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
    '<option value="All">All industries</option>',
    ...industries.map((industry) => `<option value="${industry}">${industry}</option>`)
  ].join("");
}

function updatePayTypeCopy() {
  const isHourly = elements.payType.value === "hourly";
  elements.payAmountLabel.textContent = isHourly ? "Hourly rate" : "Annual total pay";
  elements.payAmount.placeholder = isHourly ? "42" : "120000";
  elements.payAmount.step = isHourly ? "0.25" : "1000";
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

  return {
    id: `user-${makeId()}`,
    role: cleanText(formData.get("role")),
    industry: formData.get("industry"),
    location: cleanText(formData.get("location")),
    annualPay: normalizePay(payType, rawPay),
    rawPay,
    payType,
    experience: formData.get("experience"),
    gender: formData.get("gender"),
    workStyle: formData.get("workStyle"),
    companySize: formData.get("companySize"),
    note: cleanText(formData.get("note")) || "No extra context added.",
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
  elements.headerIndustryCount.textContent = new Set(reports.map((report) => report.industry)).size;
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

function mean(values) {
  if (!values.length) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function standardDeviation(values) {
  if (values.length < 2) return 0;

  const average = mean(values);
  const variance = values.reduce((total, value) => total + (value - average) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function renderDistribution(reports) {
  const grouped = genderGroups.map((gender) => {
    const values = reports.filter((report) => report.gender === gender).map((report) => report.annualPay);
    const average = mean(values);
    const middle = median(values);
    const sd = standardDeviation(values);
    const low = Math.max(0, average - sd * 2);
    const high = average + sd * 2;

    return {
      gender,
      values,
      average,
      middle,
      sd,
      low,
      high
    };
  });

  const groupsWithData = grouped.filter((group) => group.values.length);

  if (!groupsWithData.length) {
    elements.distributionChart.innerHTML = '<div class="empty-state">No matching pay data.</div>';
    return;
  }

  const domainLow = Math.min(...groupsWithData.map((group) => group.low));
  const domainHigh = Math.max(...groupsWithData.map((group) => group.high));
  const domainRange = Math.max(domainHigh - domainLow, 1);

  elements.distributionChart.innerHTML = grouped
    .map((group) => {
      if (!group.values.length) {
        return `
          <article class="gender-card is-empty">
            <div class="gender-card-top">
              <h4>${group.gender}</h4>
              <span>0 reports</span>
            </div>
            <p>No matching pay reports yet.</p>
          </article>
        `;
      }

      const lowPercent = ((group.low - domainLow) / domainRange) * 100;
      const highPercent = ((group.high - domainLow) / domainRange) * 100;
      const meanPercent = ((group.average - domainLow) / domainRange) * 100;
      const medianPercent = ((group.middle - domainLow) / domainRange) * 100;
      const bandWidth = Math.max(8, highPercent - lowPercent);

      return `
        <article class="gender-card">
          <div class="gender-card-top">
            <h4>${group.gender}</h4>
            <span>${group.values.length} reports</span>
          </div>
          <div class="distribution-metrics">
            <span><strong>${formatMoney(group.average)}</strong> Mean</span>
            <span><strong>${formatMoney(group.middle)}</strong> Median</span>
            <span><strong>${compactMoney(group.low)}-${compactMoney(group.high)}</strong> 2 SD</span>
          </div>
          <div class="sd-track" aria-label="${group.gender} pay distribution">
            <span class="sd-band" style="left: ${lowPercent}%; width: ${bandWidth}%"></span>
            <span class="sd-marker mean-marker" style="left: ${meanPercent}%"></span>
            <span class="sd-marker median-marker" style="left: ${medianPercent}%"></span>
          </div>
          <div class="distribution-legend">
            <span><i class="legend-dot mean"></i>Mean</span>
            <span><i class="legend-dot median"></i>Median</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function groupByIndustry(reports) {
  const groups = new Map();

  reports.forEach((report) => {
    if (!groups.has(report.industry)) {
      groups.set(report.industry, []);
    }

    groups.get(report.industry).push(report.annualPay);
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
      const hourlyLabel =
        report.payType === "hourly" ? `${formatHourly(report.rawPay)}/hr annualized` : "annual total";
      const activeHelpful = reactionFor(report.id, "helpful") ? "is-active" : "";
      const activeSimilar = reactionFor(report.id, "similar") ? "is-active" : "";
      const isUser = report.source === "user" ? "is-user" : "";

      return `
        <article class="entry-card ${isUser}" data-report-id="${report.id}">
          <div class="entry-top">
            <div>
              <h3 class="role-title">${escapeHtml(report.role)}</h3>
              <div class="pill-row">
                <span class="pill industry">${escapeHtml(report.industry)}</span>
                <span class="pill">${escapeHtml(report.location)}</span>
                <span class="pill">${escapeHtml(report.experience)}</span>
                <span class="pill">${escapeHtml(report.gender)}</span>
                <span class="pill">${escapeHtml(report.workStyle)}</span>
                <span class="pill">${escapeHtml(report.companySize)}</span>
              </div>
            </div>
            <div class="salary">
              ${formatMoney(report.annualPay)}
              <small>${hourlyLabel}</small>
            </div>
          </div>
          <p class="entry-note">${escapeHtml(report.note)}</p>
          <div class="entry-footer">
            <span class="entry-meta">Anonymous · ${formatDate(report.createdAt)}</span>
            <div class="entry-actions">
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
  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(elements.form);
    const report = createReport(formData);

    state.userReports.unshift(report);
    saveUserReports();
    elements.form.reset();
    elements.experience.value = "Entry";
    elements.gender.value = "Male";
    elements.workStyle.value = "On-site";
    elements.companySize.value = "1-50";
    updatePayTypeCopy();
    render();
    showToast("Anonymous pay report posted on this device.");
  });

  elements.payType.addEventListener("change", updatePayTypeCopy);

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
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;

    toggleReaction(actionButton.dataset.id, actionButton.dataset.action);
  });

  elements.industryBreakdown.addEventListener("click", (event) => {
    const industryButton = event.target.closest("[data-filter-industry]");
    if (!industryButton) return;

    state.industry = industryButton.dataset.filterIndustry;
    elements.industryFilter.value = state.industry;
    render();
  });
}

populateSelects();
updatePayTypeCopy();
bindEvents();
render();
