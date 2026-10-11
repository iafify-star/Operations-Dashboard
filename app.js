const SHEET_ID = "1ZxfAGaLTjWE5CSpdpi2v8UMN4XS_zi6ov9Yr2X7OiCk";
const SHEET_GID = "1888176207";
const REFRESH_INTERVAL_MS = 60_000;
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const colors = {
  blue: "#ffe900",
  teal: "#d6d91c",
  green: "#62d087",
  amber: "#f2a342",
  red: "#f04b54",
  violet: "#ac91ff",
};

const messages = {
  ar: {
    brandLogo: "شعار نون مينتس", navLabel: "التنقل الرئيسي", homeLabel: "العودة للرئيسية",
    brandCaption: "مركز العمليات", navSection: "لوحة المتابعة", navOverview: "نظرة عامة",
    navWarehouses: "أداء المستودعات", navProductivity: "الإنتاجية الساعية",
    navWorkflows: "سير العمل والشحن", navIssues: "النواقص والمشاكل",
    dataSource: "مصدر البيانات", connected: "متصل",
    sidebarFoot: "لوحة تشغيلية مباشرة", dashboard: "لوحة القيادة", live: "بث مباشر",
    refreshNow: "تحديث البيانات الآن", pageEyebrow: "ملخص الأداء التشغيلي",
    headingMain: "لوحة القيادة", headingAccent: "التشغيلية",
    pageIntro: "نظرة موحدة على التجهيز، الإنتاجية، تدفق الحاويات ومؤشرات الجودة.",
    sheetDateLabel: "تاريخ بيانات الشيت", autoRefresh: "تحديث تلقائي",
    dailyPerformance: "الأداء اليومي", mainKpis: "مؤشرات التجهيز الرئيسية",
    lastSync: "آخر مزامنة", hourlyTitle: "الإنتاجية على مدار الساعة",
    hourlySubtitle: "المنجز الفعلي مقارنة بالمستهدف الساعي", completed: "المنجز",
    target: "المستهدف", hourlyChartLabel: "رسم بياني للإنتاجية الساعية",
    dailyShift: "الوردية اليومية", planProgress: "التقدم نحو الخطة",
    planProgressSubtitle: "نسبة الإنجاز من إجمالي المطلوب",
    performanceComparison: "مقارنة الأداء", warehousePerformance: "أداء المستودعات",
    searchWarehouse: "ابحث عن مستودع…", warehouse: "المستودع",
    totalRequired: "إجمالي المطلوب", actualCompleted: "المنجز الفعلي",
    remaining: "المتبقي", shortages: "النواقص", hourlyTarget: "المستهدف / س",
    completionRate: "نسبة الإنجاز", sheetDataNote: "يتم عرض البيانات كما وردت في الشيت",
    operationsFlow: "تدفق العمليات", workflowShipping: "سير العمل والشحن",
    workflowSubtitle: "متابعة الكميات والمهام عبر مراحل التشغيل",
    containerPipeline: "خط سير الحاويات",
    containerPipelineSubtitle: "توزيع الحاويات حسب المرحلة التشغيلية",
    hourlyDispatch: "حركة الشحن الساعية",
    hourlyDispatchSubtitle: "إجمالي حركة الحاويات حسب الساعة",
    dispatchChartLabel: "رسم بياني لحركة الحاويات الساعية",
    qualityAvailability: "الجودة والتوفر", operationalIssues: "النواقص والمشاكل التشغيلية",
    qualityMonitoring: "متابعة الجودة", issuesByWarehouse: "المشاكل حسب المستودع",
    issuesByWarehouseSubtitle: "توزيع البلاغات والقطع المتأثرة",
    reports: "البلاغات", missing: "غير موجود", damagedExpired: "تالف / منتهي",
    skippedUnits: "القطع المتخطاة", share: "النسبة", topLocations: "أبرز مواقع المشاكل",
    topLocationsSubtitle: "المواقع الأكثر تأثراً بالنواقص",
    footerLabel: "لوحة متابعة تشغيلية", connectedTo: "المزامنة مباشرة مع Google Sheets",
    kpiRequired: "إجمالي المطلوب", hourlyTargetShort: "المستهدف الساعي",
    kpiCompleted: "المنجز الفعلي", completedThisShift: "تم إنجازه خلال الوردية",
    kpiRemaining: "المتبقي", toCompletePlan: "لتغطية خطة اليوم",
    kpiCompletion: "نسبة الإنجاز", dailyPlan: "من إجمالي خطة اليوم",
    averageProductivity: "متوسط الإنتاجية", piecePerHour: "قطعة / ساعة",
    worker: "عامل", totalShortages: "إجمالي النواقص", shortageRate: "نسبة النواقص",
    complete: "مكتمل", shiftProgress: "تقدم الوردية",
    progressSentence: "تم إنجاز", ofTotal: "من إجمالي",
    requiredUnits: "قطعة مطلوبة.", remainingUnits: "قطعة لاستكمال خطة اليوم.",
    workforce: "إجمالي العمالة النشطة عبر الساعات", productivityPerHour: "الإنتاجية / ساعة",
    noMatches: "لا توجد نتائج مطابقة.", warehouseCount: "مستودعات",
    overallTotal: "الإجمالي العام", required: "مطلوب", done: "منجز",
    noChartData: "لا تتوفر بيانات للرسم.", metHours: "ساعات حققت المستهدف",
    actual: "المنجز", targetLabel: "المستهدف", activeStaff: "العمالة النشطة",
    batches: "فرز الباتشات", batchSubtitle: "المنجز، الجاري، والمعلق",
    crossDock: "فرز الكروس دوك", crossDockSubtitle: "متابعة فرز عمليات العبور",
    sheetConnected: "متصل بالشيت", inProgress: "قيد الفرز", pending: "معلق",
    progressRate: "نسبة الإنجاز", containers: "حاوية", units: "قطعة",
    totalUnitsRecorded: "إجمالي القطع المسجلة",
    noPipelineData: "لا تتوفر تفاصيل مراحل الحاويات.",
    skippedPieces: "القطع المتخطاة", issueReports: "بلاغات المشاكل",
    missingPieces: "قطع غير موجودة", damagedPieces: "قطع تالفة",
    expiredPieces: "منتهية الصلاحية", affectedLocations: "مواقع متأثرة",
    reportsCount: "بلاغ", noLocations: "لا توجد مواقع مسجلة.",
    unknownDate: "غير محدد", syncing: "جارٍ الاتصال…", syncUnavailable: "تعذر الاتصال",
    syncFailed: "تعذر التحديث · البيانات المعروضة آخر نسخة ناجحة",
    syncError: "تعذر تحديث بيانات الشيت:", checkPermissions: "تأكد أن صلاحية الشيت تسمح بالعرض لأي شخص لديه الرابط، ثم حاول مرة أخرى.",
    requestFailed: "استجابة Google Sheets غير ناجحة",
    invalidCsv: "لم تُرجع Google Sheets بيانات قابلة للقراءة.",
    parseFailed: "تعذر العثور على مؤشرات التجهيز الرئيسية في الشيت.",
    layoutChanged: "وصلت بيانات الشيت، لكن تنسيق الجداول غير متوقع. راجع تبويب Executive Dashboard.",
    chartHourlyLabel: "المنجز مقارنة بالمستهدف",
    chartContainerLabel: "حركة الحاويات",
    hourlyDetails: "التفاصيل الساعية",
    pickingHourlyDetails: "تفاصيل الإنجاز الساعي للتجهيز",
    batchWarehouseSummary: "ملخص فرز الباتشات حسب المستودع",
    batchHourlyDetails: "المنجز الساعي حسب مستودع الفرز",
    crossdockWarehouseSummary: "ملخص فرز الكروس دوك حسب المستودع",
    crossdockHourlyDetails: "المنجز الساعي حسب مستودع الكروس دوك",
    stagingKpisTitle: "مؤشرات التجهيز والشحن",
    dispatchHourlyDetails: "حركة الحاويات والشحن لكل ساعة",
    palletDispatchDetails: "تفاصيل البالتات والحاويات حسب الوجهة",
    issuesHourlyDetails: "النواقص والقطع المتخطاة لكل ساعة ومستودع",
    hotspotDetails: "تفاصيل مواقع المشاكل والمنتجات المتأثرة",
    time: "الساعة",
    activeWorkers: "العمالة النشطة",
    iph: "معدل IPH",
    targetStatus: "حالة المستهدف",
    warehouseTotalRequired: "إجمالي المطلوب",
    closed: "منجز",
    sortingInProgress: "قيد الفرز",
    totalTasks: "إجمالي المهام",
    pendingUnits: "المتبقي (معلق)",
    totalCompleted: "إجمالي المنجز",
    pendingStaging: "بانتظار الاستيج",
    stagedRelease: "تم الاستيج",
    readyDispatch: "جاهزة للشحن",
    closedPallets: "بالتات مقفلة",
    totalPieces: "إجمالي القطع",
    totalContainerFlow: "إجمالي حركة الحاويات",
    destinationCode: "كود الوجهة",
    darkStore: "اسم الدارك ستور",
    palletBarcode: "باركود البالتة",
    stagingLocation: "موقع الاستيج",
    destinationPallets: "بالتات الوجهة",
    containersPerPallet: "حاويات بالبالتة",
    percentOfContainers: "من إجمالي الحاويات",
    issueReportsHeader: "إجمالي البلاغات",
    missingHeader: "غير موجود",
    damagedHeader: "تالف",
    expiredHeader: "منتهي الصلاحية",
    skippedHeader: "القطع المتخطاة",
    issueShare: "نسبة المشاكل",
    location: "موقع التخزين",
    zone: "منطقة التخزين",
    reportsHeader: "عدد البلاغات",
    totalQuantity: "إجمالي القطع",
    topSku: "أكثر منتج متأثر",
    percentOfShortages: "نسبة من النواقص",
    warehouseTotal: "إجمالي المستودعات",
    belowTarget: "عجز ⚠️",
    targetMet: "محقق ✅",
    noTarget: "—",
    awaitingStage: "بانتظار الاستيج",
    stageComplete: "تم الاستيج",
    readyToShip: "جاهزة للشحن",
  },
  en: {
    brandLogo: "noon minutes logo", navLabel: "Main navigation", homeLabel: "Back to home",
    brandCaption: "Operations Center", navSection: "WORKSPACE", navOverview: "Overview",
    navWarehouses: "Warehouse Performance", navProductivity: "Hourly Productivity",
    navWorkflows: "Workflow & Dispatch", navIssues: "Shortages & Issues",
    dataSource: "Data source", connected: "Connected",
    sidebarFoot: "Live operations dashboard", dashboard: "Dashboard", live: "LIVE",
    refreshNow: "Refresh data now", pageEyebrow: "OPERATIONS PERFORMANCE",
    headingMain: "Operations", headingAccent: "Dashboard",
    pageIntro: "A unified view of picking, productivity, container flow, and quality.",
    sheetDateLabel: "Sheet data date", autoRefresh: "Auto-refresh",
    dailyPerformance: "DAILY PERFORMANCE", mainKpis: "Picking overview",
    lastSync: "Last synced", hourlyTitle: "Hourly productivity",
    hourlySubtitle: "Actual completed vs. hourly target", completed: "Completed",
    target: "Target", hourlyChartLabel: "Hourly productivity chart",
    dailyShift: "Daily shift", planProgress: "Progress to plan",
    planProgressSubtitle: "Completion against the total target",
    performanceComparison: "PERFORMANCE", warehousePerformance: "Warehouse performance",
    searchWarehouse: "Search warehouses…", warehouse: "Warehouse",
    totalRequired: "Total required", actualCompleted: "Completed",
    remaining: "Remaining", shortages: "Shortages", hourlyTarget: "Target / hr",
    completionRate: "Completion", sheetDataNote: "Data shown as provided in the source sheet",
    operationsFlow: "OPERATIONS FLOW", workflowShipping: "Workflow & dispatch",
    workflowSubtitle: "Track units and tasks across operational stages",
    containerPipeline: "Container pipeline",
    containerPipelineSubtitle: "Container distribution by operational stage",
    hourlyDispatch: "Hourly dispatch flow",
    hourlyDispatchSubtitle: "Container movement by hour",
    dispatchChartLabel: "Hourly container movement chart",
    qualityAvailability: "QUALITY & AVAILABILITY", operationalIssues: "Shortages & operational issues",
    qualityMonitoring: "QUALITY MONITORING", issuesByWarehouse: "Issues by warehouse",
    issuesByWarehouseSubtitle: "Affected items and reported issues by warehouse",
    reports: "Reports", missing: "Missing", damagedExpired: "Damaged / expired",
    skippedUnits: "Skipped units", share: "Share", topLocations: "Issue hotspots",
    topLocationsSubtitle: "Locations most affected by shortages",
    footerLabel: "Operations dashboard", connectedTo: "Synced directly from Google Sheets",
    kpiRequired: "Total required", hourlyTargetShort: "Hourly target",
    kpiCompleted: "Completed", completedThisShift: "Completed this shift",
    kpiRemaining: "Remaining", toCompletePlan: "Left to complete today's plan",
    kpiCompletion: "Completion rate", dailyPlan: "Of today's total plan",
    averageProductivity: "Avg. productivity", piecePerHour: "units / hour",
    worker: "workers", totalShortages: "OOS", shortageRate: "OOS rate",
    complete: "complete", shiftProgress: "Shift progress",
    progressSentence: "Completed", ofTotal: "out of",
    requiredUnits: "units required.", remainingUnits: "units left to complete today's plan.",
    workforce: "Sum of hourly active workers", productivityPerHour: "Productivity / hr",
    noMatches: "No matching warehouses.", warehouseCount: "warehouses",
    overallTotal: "Grand total", required: "required", done: "completed",
    noChartData: "No chart data available.", metHours: "hours met target",
    actual: "Completed", targetLabel: "Target", activeStaff: "Active staff",
    batches: "Batch sorting", batchSubtitle: "Completed, in progress, and pending",
    crossDock: "Cross-dock sorting", crossDockSubtitle: "Cross-dock sorting progress",
    sheetConnected: "Sheet connected", inProgress: "In progress", pending: "Pending",
    progressRate: "Completion rate", containers: "containers", units: "units",
    totalUnitsRecorded: "Total units recorded",
    noPipelineData: "Container pipeline details are unavailable.",
    skippedPieces: "Skipped units", issueReports: "Issue reports",
    missingPieces: "Missing units", damagedPieces: "Damaged units",
    expiredPieces: "Expired units", affectedLocations: "Affected locations",
    reportsCount: "reports", noLocations: "No locations recorded.",
    unknownDate: "Not specified", syncing: "Connecting…", syncUnavailable: "Connection failed",
    syncFailed: "Refresh failed · Showing the last successfully synced data",
    syncError: "Could not refresh sheet data:", checkPermissions: "Make sure the sheet is shared with anyone who has the link, then try again.",
    requestFailed: "Google Sheets request failed",
    invalidCsv: "Google Sheets did not return readable data.",
    parseFailed: "Could not find the main picking metrics in the sheet.",
    layoutChanged: "Sheet data was received, but its table layout was unexpected. Check the Executive Dashboard tab.",
    chartHourlyLabel: "Completed vs. target",
    chartContainerLabel: "Container movement",
    hourlyDetails: "Hourly details",
    pickingHourlyDetails: "Hourly picking performance",
    batchWarehouseSummary: "Batch sorting by warehouse",
    batchHourlyDetails: "Hourly output by sorting warehouse",
    crossdockWarehouseSummary: "Cross-dock sorting by warehouse",
    crossdockHourlyDetails: "Hourly cross-dock output by warehouse",
    stagingKpisTitle: "Staging & dispatch metrics",
    dispatchHourlyDetails: "Hourly container and dispatch flow",
    palletDispatchDetails: "Pallet and container details by destination",
    issuesHourlyDetails: "Hourly skipped units by warehouse",
    hotspotDetails: "Issue locations and affected products",
    time: "Hour",
    activeWorkers: "Active workers",
    iph: "IPH",
    targetStatus: "Target status",
    warehouseTotalRequired: "Total required",
    closed: "Completed",
    sortingInProgress: "In progress",
    totalTasks: "Total tasks",
    pendingUnits: "Pending",
    totalCompleted: "Total completed",
    pendingStaging: "Pending staging",
    stagedRelease: "Staged for release",
    readyDispatch: "Ready to dispatch",
    closedPallets: "Closed pallets",
    totalPieces: "Total units",
    totalContainerFlow: "Total container flow",
    destinationCode: "Destination code",
    darkStore: "Dark store",
    palletBarcode: "Pallet barcode",
    stagingLocation: "Staging location",
    destinationPallets: "Destination pallets",
    containersPerPallet: "Containers / pallet",
    percentOfContainers: "Share of containers",
    issueReportsHeader: "Total reports",
    missingHeader: "Missing",
    damagedHeader: "Damaged",
    expiredHeader: "Expired",
    skippedHeader: "Skipped units",
    issueShare: "Issue share",
    location: "Location",
    zone: "Zone",
    reportsHeader: "Reports",
    totalQuantity: "Total units",
    topSku: "Top affected SKU",
    percentOfShortages: "Share of shortages",
    warehouseTotal: "Warehouse total",
    belowTarget: "Below target ⚠️",
    targetMet: "Target met ✅",
    noTarget: "—",
    awaitingStage: "Pending staging",
    stageComplete: "Staged for release",
    readyToShip: "Ready to dispatch",
  },
};

const $ = (selector) => document.querySelector(selector);
let refreshTimer;
let dashboardData;
let locale = "ar";
let lastSyncAt;
let lastSyncError = "";

function t(key) {
  return messages[locale][key] || messages.ar[key] || key;
}

function localizedErrorDetail(detail) {
  for (const language of ["ar", "en"]) {
    if (detail === messages[language].parseFailed) return t("parseFailed");
    if (detail === messages[language].layoutChanged) return t("layoutChanged");
  }
  return detail;
}

function applyLocale() {
  const isEnglish = locale === "en";
  document.documentElement.lang = locale;
  document.documentElement.dir = isEnglish ? "ltr" : "rtl";
  document.body.classList.toggle("is-en", isEnglish);
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = t(element.dataset.i18nAlt);
  });
  $("#languageButton").textContent = isEnglish ? "عربي" : "EN";
  $("#languageButton").setAttribute("aria-label", isEnglish ? "التبديل إلى العربية" : "Switch to English");
  $("#autoRefresh").setAttribute("aria-label", t("autoRefresh"));
  document.title = isEnglish ? "noon minutes | Operations Dashboard" : "نون مينتس | لوحة العمليات";
  document.querySelector('meta[name="description"]').content = t("pageIntro");
  $("#lastSynced").textContent = lastSyncError
    ? (dashboardData ? t("syncFailed") : t("syncUnavailable"))
    : lastSyncAt
      ? new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(lastSyncAt)
      : t("syncing");
  $("#connectionBanner").textContent = lastSyncError ? `${t("syncError")} ${localizedErrorDetail(lastSyncError)} ${t("checkPermissions")}` : "";
  $("#connectionBanner").hidden = !lastSyncError;
  if (dashboardData) renderDashboard(dashboardData);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        cell += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(cell.trim());
      cell = "";
    } else if (character === "\n") {
      row.push(cell.trim().replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  if (cell.length || row.length) {
    row.push(cell.trim().replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

function textAt(row, index) {
  return String(row?.[index] ?? "").trim();
}

function findRow(rows, predicate, startAt = 0) {
  return rows.findIndex((row, index) => index >= startAt && predicate(row));
}

function rowHas(row, phrase) {
  return row.some((cell) => cell.includes(phrase));
}

function parseNumber(value) {
  const cleaned = String(value ?? "").replace(/[,\s%]/g, "").replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit));
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : 0;
}

function formatNumber(value) {
  return numberFormat.format(Math.round(parseNumber(value)));
}

function percentValue(value) {
  const parsed = parseNumber(value);
  return Math.max(0, Math.min(parsed, 100));
}

function progressCell(value, color = colors.teal) {
  const percent = percentValue(value);
  return `<div class="percent-cell"><div class="percent-label"><span>${escapeHtml(value || "0%")}</span></div><div class="percent-track"><div class="percent-fill" style="width:${percent}%;background:${color}"></div></div></div>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function translateHeader(header) {
  const mappings = [
    ["الساعة", "time"], ["المستهدف", "targetLabel"], ["المنجز", "actual"],
    ["العمالة النشطة", "activeWorkers"], ["معدل IPH", "iph"],
    ["نسبة الإنجاز", "completionRate"], ["حالة التارجت", "targetStatus"],
    ["المستودع", "warehouse"], ["إجمالي المطلوب", "warehouseTotalRequired"],
    ["Closed", "closed"], ["قيد الفرز", "sortingInProgress"],
    ["المتبقي (Pending)", "pendingUnits"], ["إجمالي المهام", "totalTasks"],
    ["إجمالي المنجز", "totalCompleted"], ["بانتظار الاستيج", "pendingStaging"],
    ["تم الاستيج", "stagedRelease"], ["جاهزة للشحن", "readyDispatch"],
    ["بالتات مقفلة", "closedPallets"], ["إجمالي القطع", "totalPieces"],
    ["إجمالي حركة الحاويات", "totalContainerFlow"], ["كود الوجهة", "destinationCode"],
    ["اسم الدارك ستور", "darkStore"], ["باركود البالتة", "palletBarcode"],
    ["موقع الاستيج", "stagingLocation"], ["عدد بالتات الوجهة", "destinationPallets"],
    ["عدد الحاويات بالبالتة", "containersPerPallet"], ["نسبة من إجمالي الحاويات", "percentOfContainers"],
    ["إجمالي البلاغات", "issueReportsHeader"], ["غير موجود", "missingHeader"],
    ["تالف", "damagedHeader"], ["منتهي الصلاحية", "expiredHeader"],
    ["إجمالي القطع المتخطاة", "skippedHeader"], ["نسبة المشاكل", "issueShare"],
    ["موقع التخزين", "location"], ["منطقة التخزين", "zone"],
    ["عدد البلاغات", "reportsHeader"], ["إجمالي القطع", "totalQuantity"],
    ["أكثر منتج متأثر", "topSku"], ["نسبة من النواقص", "percentOfShortages"],
  ];
  const normalized = String(header || "").trim();
  const mapping = mappings.find(([phrase]) => normalized === phrase || normalized.includes(phrase));
  if (!mapping) return normalized;
  if (locale === "ar") {
    if (normalized.includes("المنجز (Closed)")) return "المنجز (Closed)";
    if (normalized.includes("المتبقي (Pending)")) return "المتبقي (Pending)";
    if (normalized.includes("بانتظار الاستيج")) return "بانتظار الاستيج (Pending)";
    if (normalized.includes("تم الاستيج")) return "تم الاستيج (Release)";
    if (normalized.includes("جاهزة للشحن")) return "جاهزة للشحن (Dispatch)";
    return normalized;
  }
  return t(mapping[1]);
}

function translateCell(value, header = "") {
  const normalized = String(value || "").trim();
  if (normalized.startsWith("الإجمالي العام")) return t("overallTotal");
  if (normalized.startsWith("إجمالي أعلى")) return t("topLocations");
  if (normalized === "عجز ⚠️") return t("belowTarget");
  if (normalized === "محقق ✅") return t("targetMet");
  if (normalized === "-") return t("noTarget");
  const hourMatch = normalized.match(/^(\d{1,2})(?::00(?::00)?)? (AM|PM)$/i);
  const timeMatch = normalized.match(/^(\d{1,2}):00(?::00)?$/);
  if (hourMatch) return `${hourMatch[1]} ${locale === "ar" ? (hourMatch[2].toUpperCase() === "AM" ? "ص" : "م") : hourMatch[2].toUpperCase()}`;
  if (timeMatch) {
    const hour = Number(timeMatch[1]);
    if (locale === "ar") return `${hour % 12 || 12} ${hour < 12 ? "ص" : "م"}`;
    return `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;
  }
  if (header === "كود الوجهة" || header === "اسم الدارك ستور" || header === "باركود البالتة" || header === "موقع الاستيج" || header === "المستودع" || header.includes("موقع التخزين") || header.includes("Warehouse") || header.includes("SKU") || header.includes("Location") || header.includes("Zone") || header.includes("Barcode")) {
    return normalized;
  }
  return normalized;
}

function renderDataTable(target, title, table, { hourly = false, subtitle = "" } = {}) {
  const container = typeof target === "string" ? $(target) : target;
  if (!table?.headers?.length) {
    container.innerHTML = `<article class="panel table-panel detail-panel"><div class="empty-state">${t("noChartData")}</div></article>`;
    return;
  }
  const columns = table.headers
    .map((header, index) => ({ header: String(header || "").trim(), index }))
    .filter(({ header }) => header);
  const headerCells = columns.map(({ header }) => `<th>${escapeHtml(translateHeader(header))}</th>`).join("");
  const bodyRows = table.records.map((row) => `<tr>${columns.map(({ header, index }) => {
    const value = translateCell(textAt(row, index), header);
    const identifier = ["الساعة", "المستودع", "كود الوجهة", "باركود البالتة", "موقع التخزين (Location)"].includes(header);
    const numeric = !identifier && !["حالة التارجت"].includes(header);
    return `<td class="${identifier ? "code-cell" : numeric ? "numeric" : ""}">${escapeHtml(value)}</td>`;
  }).join("")}</tr>`).join("");
  const totalRow = table.total?.length
    ? `<tfoot><tr>${columns.map(({ header, index }) => {
      const value = translateCell(textAt(table.total, index), header);
      const identifier = ["الساعة", "المستودع", "كود الوجهة", "باركود البالتة", "موقع التخزين (Location)"].includes(header);
      return `<td class="${identifier ? "code-cell" : "numeric"}">${escapeHtml(value)}</td>`;
    }).join("")}</tr></tfoot>`
    : "";
  container.innerHTML = `<article class="panel table-panel detail-panel${hourly ? " hourly-detail-panel" : ""}"><div class="panel-heading detail-heading"><div><span class="panel-icon ${hourly ? "amber" : "blue"}">${hourly ? "◷" : "▤"}</span><div><h3>${title}</h3><p>${subtitle || (hourly ? t("hourlyDetails") : t("sheetDataNote"))}</p></div></div></div><div class="table-scroll detail-table-scroll"><table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows || `<tr><td colspan="${columns.length}" class="empty-state">${t("noChartData")}</td></tr>`}</tbody>${totalRow}</table></div></article>`;
}

function dateFromRows(rows) {
  for (const row of rows) {
    const text = row.find((cell) => cell.includes("تاريخ التحديث"));
    if (text) return text.replace(/^.*?تاريخ التحديث\s*:\s*/, "").trim();
  }
  return "";
}

function locateSection(rows, title) {
  return findRow(rows, (row) => rowHas(row, title));
}

function valuesAfterHeader(rows, headerIndex) {
  if (headerIndex < 0) return [];
  for (let index = headerIndex + 1; index < Math.min(headerIndex + 4, rows.length); index += 1) {
    if (rows[index].some((value) => value !== "")) return rows[index];
  }
  return [];
}

function mainMetrics(rows) {
  const header = findRow(rows, (row) => rowHas(row, "إجمالي المطلوب") && rowHas(row, "نسبة الإنجاز العامة"));
  const values = valuesAfterHeader(rows, header);
  if (header < 0 || values.length < 8) throw new Error(t("parseFailed"));
  const annotations = valuesAfterHeader(rows, header + 1);
  return {
    target: textAt(values, 1),
    completed: textAt(values, 3),
    remaining: textAt(values, 5),
    completion: textAt(values, 7),
    iph: textAt(values, 9),
    targetHourly: (textAt(annotations, 1).match(/\d[\d,]*/) || [])[0] || "",
    workers: (textAt(annotations, 9).match(/\d[\d,]*/) || [])[0] || "",
    shortages: textAt(values, 11),
    shortageRate: (textAt(annotations, 11).match(/\d+(?:\.\d+)?%/) || [])[0] || "",
    headerIndex: header,
  };
}

function readTable(rows, headerIndex, keyColumn = 1, endPhrase = "الإجمالي العام") {
  if (headerIndex < 0) return { headers: [], records: [], total: [] };
  const headers = rows[headerIndex];
  const records = [];
  let total = [];
  for (let index = headerIndex + 1; index < rows.length; index += 1) {
    const row = rows[index];
    const label = textAt(row, keyColumn);
    if (label === endPhrase || label.startsWith("الإجمالي العام")) {
      total = row;
      break;
    }
    if (label && !label.startsWith("متوسط")) records.push(row);
  }
  return { headers, records, total };
}

function tableAtHeader(rows, headerIndex, keyColumn = 1) {
  if (headerIndex < 0) return { headers: [], records: [], total: [] };
  const headers = rows[headerIndex];
  const records = [];
  let total = [];
  for (let index = headerIndex + 1; index < rows.length; index += 1) {
    const row = rows[index];
    const label = textAt(row, keyColumn);
    if (label.startsWith("الإجمالي العام") || label.startsWith("إجمالي أعلى")) {
      total = row;
      break;
    }
    if (label) records.push(row);
  }
  return { headers, records, total };
}

function findTable(rows, predicate, startAt = 0) {
  const header = findRow(rows, predicate, startAt);
  return tableAtHeader(rows, header);
}

function warehouseSection(rows) {
  const header = findRow(rows, (row) => textAt(row, 1) === "المستودع" && textAt(row, 2) === "إجمالي المطلوب");
  return readTable(rows, header);
}

function hourlySection(rows) {
  return findTable(rows, (row) => textAt(row, 1) === "الساعة" && textAt(row, 2) === "المستهدف");
}

function workflowData(rows, title, warehouseHeader = "المستودع") {
  const sectionStart = locateSection(rows, title);
  if (sectionStart < 0) return null;
  const nextSection = rows.findIndex((row, index) => index > sectionStart && row[1]?.startsWith("📊") && !row[1].includes(title));
  const sectionEnd = nextSection >= 0 ? nextSection : rows.length;
  const sectionRows = rows.slice(sectionStart, sectionEnd);
  const metricsHeader = sectionRows.findIndex((row) => row.some((cell) => cell.includes("كمية الفرز المنجز") || cell.includes("حاويات بانتظار الاستيج")));
  const metricLabels = metricsHeader >= 0 ? sectionRows[metricsHeader] : [];
  const metricValues = metricsHeader >= 0 ? sectionRows[metricsHeader + 1] || [] : [];
  const tableHeader = sectionRows.findIndex((row) => textAt(row, 1) === warehouseHeader && textAt(row, 2) === "إجمالي المطلوب");
  const table = tableHeader >= 0 ? readTable(sectionRows, tableHeader) : null;
  return { sectionRows, metricLabels, metricValues, table };
}

function getLabelMetric(section, phrase) {
  if (!section) return "";
  const index = section.metricLabels.findIndex((cell) => cell.includes(phrase));
  return index >= 0 ? textAt(section.metricValues, index) : "";
}

function parseDashboard(rows) {
  const main = mainMetrics(rows);
  const warehouses = warehouseSection(rows);
  const pickingHourly = hourlySection(rows);
  const batch = workflowData(rows, "مؤشرات أداء فرز الباتشات");
  const crossdock = workflowData(rows, "مؤشرات أداء فرز الكروس دوك");
  const batchHourly = batch ? findTable(batch.sectionRows, (row) => textAt(row, 1) === "الساعة" && row.some((cell) => cell === "إجمالي المنجز")) : null;
  const crossdockHourly = crossdock ? findTable(crossdock.sectionRows, (row) => textAt(row, 1) === "الساعة" && row.some((cell) => cell === "إجمالي المنجز")) : null;
  const pipelineHeader = findRow(rows, (row) => textAt(row, 1) === "المرحلة التشغيلية" && textAt(row, 2) === "الشيت المصدر");
  const pipeline = pipelineHeader >= 0 ? rows.slice(pipelineHeader + 1, pipelineHeader + 4).filter((row) => textAt(row, 1) && !textAt(row, 1).startsWith("الإجمالي")) : [];
  const dispatchHourly = findTable(rows, (row) => textAt(row, 1) === "الساعة" && textAt(row, 2) === "بانتظار الاستيج (Pending)");
  const stagingLabelsIndex = findRow(rows, (row) => row.some((cell) => cell.includes("حاويات بانتظار الاستيج")));
  const stagingMetrics = stagingLabelsIndex >= 0 ? { labels: rows[stagingLabelsIndex], values: rows[stagingLabelsIndex + 1] || [] } : null;
  const issueHeader = findRow(rows, (row) => textAt(row, 1) === "المستودع" && textAt(row, 2) === "إجمالي البلاغات");
  const issueWarehouses = readTable(rows, issueHeader);
  const issueHourly = findTable(rows, (row) => textAt(row, 1) === "الساعة" && row.some((cell) => cell === "إجمالي القطع المتخطاة"));
  const issueKpiHeader = findRow(rows, (row) => rowHas(row, "إجمالي القطع المتخطاة") && rowHas(row, "إجمالي بلاغات المشاكل"));
  const issueKpis = issueKpiHeader >= 0 ? rows[issueKpiHeader + 1] : [];
  const hotspotHeader = findRow(rows, (row) => textAt(row, 1).includes("موقع التخزين") && textAt(row, 2).includes("المستودع"));
  const hotspotTable = tableAtHeader(rows, hotspotHeader);
  const hotspots = hotspotTable.records;
  const palletHeader = findRow(rows, (row) => textAt(row, 1) === "كود الوجهة" && textAt(row, 2) === "اسم الدارك ستور");
  const palletTable = tableAtHeader(rows, palletHeader);
  const pickIssueSection = locateSection(rows, "مؤشرات مشاكل ونواقص تجهيز الطلبات");
  const expirySection = locateSection(rows, "منتهية الصلاحية (Expired)");
  const issueTotalLine = rows.find((row) => row.some((cell) => cell === "إجمالي أعلى 8 مواقع"));
  const hotspotTotal = issueTotalLine || [];

  if (  !warehouses.records.length || !pickingHourly.records.length) {
    throw new Error(t("layoutChanged"));
  }

  return {
    main,
    warehouses: warehouses.records,
    warehouseTotal: warehouses.total,
    pickingHourly,
    batch,
    batchHourly,
    crossdock,
    crossdockHourly,
    pipeline,
    stagingMetrics,
    dispatchHourly,
    issueKpis,
    issueWarehouses: issueWarehouses.records,
    issueWarehouseTotal: issueWarehouses.total,
    issueHourly,
    hotspots,
    hotspotTable,
    palletTable,
    issueSectionFound: pickIssueSection >= 0 && expirySection >= 0,
    date: dateFromRows(rows),
  };
}

function renderKpis(data) {
  const metrics = [
    { label: t("kpiRequired"), value: data.main.target, sub: `${t("hourlyTargetShort")} ${data.main.targetHourly || "—"}`, icon: "Σ", accent: colors.blue },
    { label: t("kpiCompleted"), value: data.main.completed, sub: t("completedThisShift"), icon: "✓", accent: colors.green },
    { label: t("kpiRemaining"), value: data.main.remaining, sub: t("toCompletePlan"), icon: "◷", accent: colors.amber },
    { label: t("kpiCompletion"), value: data.main.completion, sub: t("dailyPlan"), icon: "%", accent: colors.teal },
    { label: t("averageProductivity"), value: data.main.iph, sub: `${t("piecePerHour")} · ${data.main.workers || "—"} ${t("worker")}`, icon: "⌁", accent: colors.violet },
    { label: t("totalShortages"), value: data.main.shortages, sub: `${t("shortageRate")} ${data.main.shortageRate || "—"}`, icon: "!", accent: colors.red },
  ];
  $("#kpiGrid").innerHTML = metrics.map((metric) => `<article class="kpi-card" style="--accent:${metric.accent}"><div class="kpi-top"><span>${metric.label}</span><span class="kpi-icon">${metric.icon}</span></div><div class="kpi-value">${escapeHtml(metric.value || "—")}</div><div class="kpi-sub">${metric.sub}</div></article>`).join("");

  const progress = percentValue(data.main.completion);
  $("#progressContent").innerHTML = `<div class="donut" style="background:conic-gradient(${colors.teal} ${progress}%, #26364b ${progress}% 100%)"><div class="donut-label"><strong>${escapeHtml(data.main.completion)}</strong><small>${t("complete")}</small></div></div><div class="progress-copy"><strong>${t("shiftProgress")}</strong><span>${t("progressSentence")} <b>${escapeHtml(data.main.completed)}</b> ${t("ofTotal")} <b>${escapeHtml(data.main.target)}</b> ${t("requiredUnits")}</span><span>${t("remaining")} <b>${escapeHtml(data.main.remaining)}</b> ${t("remainingUnits")}</span></div>`;
  $("#progressStats").innerHTML = [
    { label: t("workforce"), value: data.main.workers, icon: "♙", color: colors.blue },
    { label: t("productivityPerHour"), value: data.main.iph, icon: "⌁", color: colors.violet },
  ].map((item) => `<div class="mini-stat" style="--accent:${item.color}"><span class="mini-stat-icon">${item.icon}</span><div><small>${item.label}</small><strong>${escapeHtml(item.value || "—")}</strong></div></div>`).join("");
}

function renderWarehouseTable(data) {
  const search = $("#warehouseSearch").value.trim().toLowerCase();
  const filtered = data.warehouses.filter((row) => textAt(row, 1).toLowerCase().includes(search));
  $("#warehouseRows").innerHTML = filtered.length ? filtered.map((row) => `<tr>
    <td class="warehouse-name">${escapeHtml(textAt(row, 1))}</td>
    <td class="numeric">${escapeHtml(textAt(row, 2))}</td><td class="numeric">${escapeHtml(textAt(row, 3))}</td>
    <td class="numeric">${escapeHtml(textAt(row, 4))}</td><td class="numeric">${escapeHtml(textAt(row, 5))}</td>
    <td class="numeric">${escapeHtml(textAt(row, 6))}</td><td>${progressCell(textAt(row, 7))}</td></tr>`).join("") : `<tr><td colspan="7" class="empty-state">${t("noMatches")}</td></tr>`;
  $("#warehouseCount").textContent = locale === "ar"
    ? `${filtered.length} من ${data.warehouses.length} ${t("warehouseCount")}`
    : `${filtered.length} of ${data.warehouses.length} ${t("warehouseCount")}`;
  $("#warehouseTotal").textContent = `${t("overallTotal")}: ${textAt(data.warehouseTotal, 2)} ${t("required")} · ${textAt(data.warehouseTotal, 3)} ${t("done")}`;
}

function renderBarChart(rows, { labelIndex, actualIndex, targetIndex, activeIndex = -1, compact = false }) {
  if (!rows.length) return `<div class="empty-state">${t("noChartData")}</div>`;
  const width = 760;
  const height = compact ? 190 : 218;
  const margin = { top: 17, right: 8, bottom: 33, left: 8 };
  const chartHeight = height - margin.top - margin.bottom;
  const chartWidth = width - margin.left - margin.right;
  const maxValue = Math.max(1, ...rows.flatMap((row) => [parseNumber(textAt(row, actualIndex)), parseNumber(textAt(row, targetIndex))]));
  const groupWidth = chartWidth / rows.length;
  const barWidth = Math.min(compact ? 13 : 16, groupWidth * .34);
  const gridLines = [0, .5, 1].map((ratio) => {
    const y = margin.top + chartHeight * ratio;
    return `<line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="#ffffff" stroke-opacity=".07"/><text x="${width - margin.right}" y="${y - 4}" fill="#6f8098" font-size="9" text-anchor="end">${formatNumber(maxValue * (1 - ratio))}</text>`;
  }).join("");
  const bars = rows.map((row, index) => {
    const actual = parseNumber(textAt(row, actualIndex));
    const target = parseNumber(textAt(row, targetIndex));
    const center = margin.left + groupWidth * (index + .5);
    const actualHeight = chartHeight * actual / maxValue;
    const targetHeight = chartHeight * target / maxValue;
    const actualX = center - barWidth - 1;
    const targetX = center + 1;
    const label = escapeHtml(textAt(row, labelIndex));
    const actualY = margin.top + chartHeight - actualHeight;
    const targetY = margin.top + chartHeight - targetHeight;
    const targetBar = target > 0 ? `<rect x="${targetX}" y="${targetY}" width="${barWidth}" height="${Math.max(1, targetHeight)}" rx="3" fill="${colors.amber}" fill-opacity=".42"><title>${label} · ${t("targetLabel")} ${formatNumber(target)}</title></rect>` : "";
    return `<rect x="${actualX}" y="${actualY}" width="${barWidth}" height="${Math.max(1, actualHeight)}" rx="3" fill="${colors.blue}"><title>${label} · ${t("actual")} ${formatNumber(actual)}${activeIndex >= 0 ? ` · ${t("activeStaff")} ${escapeHtml(textAt(row, activeIndex))}` : ""}</title></rect>${targetBar}<text x="${center}" y="${height - 10}" fill="#8a9ab1" font-size="9" text-anchor="middle">${label}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${compact ? t("chartContainerLabel") : t("chartHourlyLabel")}">${gridLines}${bars}</svg>`;
}

function renderHourly(data) {
  const rows = data.pickingHourly.records;
  $("#hourlyChart").innerHTML = renderBarChart(rows, { labelIndex: 1, actualIndex: 3, targetIndex: 2, activeIndex: 4 });
  const met = rows.filter((row) => parseNumber(textAt(row, 3)) >= parseNumber(textAt(row, 2)) && parseNumber(textAt(row, 2)) > 0).length;
  $("#hourlyNote").textContent = `${met} ${t("metHours")}`;
  $("#dispatchChart").innerHTML = renderBarChart(data.dispatchHourly.records, { labelIndex: 1, actualIndex: 7, targetIndex: -1, compact: true });
  renderDataTable("#pickingHourlyTable", t("pickingHourlyDetails"), data.pickingHourly, { hourly: true });
  renderDataTable("#dispatchHourlyTable", t("dispatchHourlyDetails"), data.dispatchHourly, { hourly: true });
  renderDataTable("#issueHourlyTable", t("issuesHourlyDetails"), data.issueHourly, { hourly: true });
  renderDataTable("#hotspotFullTable", t("hotspotDetails"), data.hotspotTable);
  renderDataTable("#palletTable", t("palletDispatchDetails"), data.palletTable);
  renderStagingMetrics(data);
  renderSortingTables(data);
}

function renderSortingTables(data) {
  const sections = [
    {
      title: t("batchWarehouseSummary"),
      summary: data.batch?.table,
      hourlyTitle: t("batchHourlyDetails"),
      hourly: data.batchHourly,
    },
    {
      title: t("crossdockWarehouseSummary"),
      summary: data.crossdock?.table,
      hourlyTitle: t("crossdockHourlyDetails"),
      hourly: data.crossdockHourly,
    },
  ];
  $("#sortingTables").innerHTML = sections.map((section) => {
    const summary = section.summary;
    const hourly = section.hourly;
    return `<div class="sorting-table-group">
      <div class="section-heading detail-section-heading"><h3>${section.title}</h3></div>
      <div class="details-grid inner-details-grid">
        <div class="embedded-table" data-table-title="${section.title}"></div>
        <div class="embedded-table" data-table-title="${section.hourlyTitle}"></div>
      </div>
    </div>`;
  }).join("");
  const embedded = $("#sortingTables").querySelectorAll(".embedded-table");
  sections.forEach((section, index) => {
    renderDataTable(embedded[index * 2], section.title, section.summary);
    renderDataTable(embedded[index * 2 + 1], section.hourlyTitle, section.hourly, { hourly: true });
  });
}

function renderStagingMetrics(data) {
  const section = data.stagingMetrics;
  if (!section) {
    $("#stagingKpis").innerHTML = "";
    return;
  }
  const metricDefinitions = [
    { header: "حاويات بانتظار الاستيج", label: t("pendingStaging"), color: colors.amber },
    { header: "إجمالي قطع بانتظار الاستيج", label: t("totalPieces"), color: colors.blue },
    { header: "حاويات تم استيجها (Release)", label: t("stagedRelease"), color: colors.teal },
    { header: "سجلات الاستيج للإفراج", label: t("reportsHeader"), color: colors.violet },
    { header: "حاويات جاهزة للشحن", label: t("readyDispatch"), color: colors.green },
    { header: "بالتات مقفلة للشحن", label: t("closedPallets"), color: colors.red },
  ];
  $("#stagingKpis").innerHTML = `<div class="section-heading logistics-heading"><h3>${t("stagingKpisTitle")}</h3></div><div class="logistics-kpi-grid">${metricDefinitions.map((metric) => {
    const index = section.labels.findIndex((header) => header.includes(metric.header));
    return `<div class="logistics-kpi" style="--accent:${metric.color}"><small>${metric.label}</small><strong>${escapeHtml(index >= 0 ? textAt(section.values, index) : "—")}</strong></div>`;
  }).join("")}</div>`;
}

function renderWorkflowCard({ title, description, section, icon, accent, metrics, progress }) {
  if (!section) return "";
  const percent = parseNumber(progress || "0");
  return `<article class="workflow-card">
    <div class="workflow-card-top"><div class="workflow-title"><span class="panel-icon" style="background:color-mix(in srgb, ${accent} 16%, transparent);color:${accent}">${icon}</span><div><h3>${title}</h3><p>${description}</p></div></div><span class="workflow-status">${t("sheetConnected")}</span></div>
    <div class="workflow-metrics">${metrics.map((metric) => `<div class="workflow-metric"><small>${metric.label}</small><strong>${escapeHtml(metric.value || "—")}</strong></div>`).join("")}</div>
    <div class="workflow-card-bottom"><span>${t("progressRate")}</span><div class="workflow-progress"><div class="percent-track"><div class="percent-fill" style="width:${Math.min(Math.max(percent, 0), 100)}%;background:${accent}"></div></div><strong>${escapeHtml(progress || "—")}</strong></div></div>
  </article>`;
}

function renderWorkflows(data) {
  const batch = data.batch;
  const crossdock = data.crossdock;
  $("#workflowCards").innerHTML = [
    renderWorkflowCard({
      title: t("batches"),
      description: t("batchSubtitle"),
      section: batch,
      icon: "✓",
      accent: colors.teal,
      metrics: [
        { label: t("done"), value: getLabelMetric(batch, "كمية الفرز المنجز") },
        { label: t("inProgress"), value: getLabelMetric(batch, "كمية قيد الفرز") },
        { label: t("pending"), value: getLabelMetric(batch, "كمية المعلق") },
      ],
      progress: batch?.table?.total ? textAt(batch.table.total, 7) : "",
    }),
    renderWorkflowCard({
      title: t("crossDock"),
      description: t("crossDockSubtitle"),
      section: crossdock,
      icon: "⇄",
      accent: colors.violet,
      metrics: [
        { label: t("done"), value: getLabelMetric(crossdock, "كمية الفرز المنجز") },
        { label: t("inProgress"), value: getLabelMetric(crossdock, "كمية قيد الفرز") },
        { label: t("pending"), value: getLabelMetric(crossdock, "كمية المعلق") },
      ],
      progress: crossdock?.table?.total ? textAt(crossdock.table.total, 7) : "",
    }),
  ].join("");

  const stageColors = [colors.amber, colors.blue, colors.green];
  const pipelineTotal = data.pipeline.reduce((sum, row) => sum + parseNumber(textAt(row, 4)), 0);
  const stageNames = {
    "بانتظار الاستيج (Pending)": locale === "ar" ? "بانتظار الاستيج (Pending)" : "Awaiting staging",
    "تم الاستيج (Release)": locale === "ar" ? "تم الاستيج (Release)" : "Staged for release",
    "جاهزة للشحن (Dispatch)": locale === "ar" ? "جاهزة للشحن (Dispatch)" : "Ready to dispatch",
  };
  $("#pipelineContent").innerHTML = data.pipeline.length ? `<div class="pipeline-stages">${data.pipeline.map((row, index) => {
    const percent = parseNumber(textAt(row, 6));
    const stageName = stageNames[textAt(row, 1).replace(/^\d+\.\s*/, "")] || textAt(row, 1).replace(/^\d+\.\s*/, "");
    return `<div class="pipeline-stage" style="--accent:${stageColors[index]}"><div class="pipeline-stage-title"><i class="stage-dot"></i>${escapeHtml(stageName)}</div><span class="pipeline-stage-value">${escapeHtml(textAt(row, 3))} ${t("containers")}</span><small>${escapeHtml(textAt(row, 2))} · ${escapeHtml(textAt(row, 4))} ${t("units")}</small><div class="pipeline-track"><div class="pipeline-fill" style="width:${Math.max(0, Math.min(percent, 100))}%;background:${stageColors[index]}"></div></div></div>`;
  }).join("")}<div class="table-foot"><span>${t("totalUnitsRecorded")}</span><span>${formatNumber(pipelineTotal)}</span></div></div>` : `<div class="empty-state">${t("noPipelineData")}</div>`;
}

function renderIssues(data) {
  const issueKpis = [
    { label: t("skippedPieces"), value: textAt(data.issueKpis, 1), icon: "!", accent: colors.red },
    { label: t("issueReports"), value: textAt(data.issueKpis, 3), icon: "▤", accent: colors.amber },
    { label: t("missingPieces"), value: textAt(data.issueKpis, 5), icon: "⌕", accent: "#ff9c67" },
    { label: t("damagedPieces"), value: textAt(data.issueKpis, 7), icon: "×", accent: colors.red },
    { label: t("expiredPieces"), value: textAt(data.issueKpis, 9), icon: "◷", accent: colors.violet },
    { label: t("affectedLocations"), value: textAt(data.issueKpis, 11), icon: "⌖", accent: colors.blue },
  ];
  $("#issueKpis").innerHTML = issueKpis.map((metric) => `<div class="issue-kpi" style="--accent:${metric.accent}"><span class="issue-kpi-icon">${metric.icon}</span><div><small>${metric.label}</small><strong>${escapeHtml(metric.value || "—")}</strong></div></div>`).join("");
  $("#issueWarehouseRows").innerHTML = data.issueWarehouses.map((row) => `<tr><td class="warehouse-name">${escapeHtml(textAt(row, 1))}</td><td class="numeric">${escapeHtml(textAt(row, 2))}</td><td class="numeric">${escapeHtml(textAt(row, 3))}</td><td class="numeric">${formatNumber(parseNumber(textAt(row, 4)) + parseNumber(textAt(row, 5)))}</td><td class="numeric">${escapeHtml(textAt(row, 6))}</td><td>${progressCell(textAt(row, 7), colors.red)}</td></tr>`).join("");
  const issueTotalFoot = $("#issueWarehouseRows").closest("table").tFoot || $("#issueWarehouseRows").closest("table").createTFoot();
  issueTotalFoot.replaceChildren();
  const issueTotalRow = issueTotalFoot.insertRow();
  [
    [1, t("overallTotal")], [2, textAt(data.issueWarehouseTotal, 2)],
    [3, textAt(data.issueWarehouseTotal, 3)],
    [4, formatNumber(parseNumber(textAt(data.issueWarehouseTotal, 4)) + parseNumber(textAt(data.issueWarehouseTotal, 5)))],
    [5, textAt(data.issueWarehouseTotal, 6)], [6, progressCell(textAt(data.issueWarehouseTotal, 7), colors.red)],
  ].forEach(([index, value]) => {
    const cell = issueTotalRow.insertCell();
    cell.className = index === 1 ? "warehouse-name" : "numeric";
    if (index === 6) cell.innerHTML = value;
    else cell.textContent = value;
  });
  $("#hotspotRows").innerHTML = data.hotspots.length ? data.hotspots.map((row) => `<div class="hotspot-row"><span class="hotspot-location">${escapeHtml(textAt(row, 1))}</span><span class="hotspot-meta"><strong>${escapeHtml(textAt(row, 2))} · ${escapeHtml(textAt(row, 3))}</strong><span>${escapeHtml(textAt(row, 4))} ${t("reportsCount")} · ${escapeHtml(textAt(row, 6))}</span></span><span class="hotspot-qty">${escapeHtml(textAt(row, 5))} ${t("units")}</span></div>`).join("") : `<div class="empty-state">${t("noLocations")}</div>`;
}

function renderDashboard(data) {
  dashboardData = data;
  renderKpis(data);
  renderWarehouseTable(data);
  renderHourly(data);
  renderWorkflows(data);
  renderIssues(data);
  $("#sheetDate").textContent = data.date || t("unknownDate");
  $("#connectionBanner").hidden = !lastSyncError;
}

async function loadDashboard() {
  const button = $("#refreshButton");
  button.classList.add("is-loading");
  button.disabled = true;
  try {
    const response = await fetch(`${SHEET_URL}&_=${Date.now()}`, {
      cache: "no-store",
      headers: { Accept: "text/csv" },
    });
    if (!response.ok) throw new Error(`${t("requestFailed")} (${response.status}).`);
    const csv = await response.text();
    if (!csv.trim() || csv.includes("<!DOCTYPE html")) throw new Error(t("invalidCsv"));
    const rows = parseCsv(csv);
    const data = parseDashboard(rows);
    lastSyncAt = new Date();
    lastSyncError = "";
    renderDashboard(data);
    $("#lastSynced").textContent = new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(lastSyncAt);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    lastSyncError = detail;
    $("#connectionBanner").textContent = `${t("syncError")} ${localizedErrorDetail(detail)} ${t("checkPermissions")}`;
    $("#connectionBanner").hidden = false;
    $("#lastSynced").textContent = dashboardData ? t("syncFailed") : t("syncUnavailable");
    console.error("Dashboard sync failed:", error);
  } finally {
    button.classList.remove("is-loading");
    button.disabled = false;
  }
}

function setAutoRefresh(enabled) {
  window.clearInterval(refreshTimer);
  if (enabled) refreshTimer = window.setInterval(loadDashboard, REFRESH_INTERVAL_MS);
}

$("#refreshButton").addEventListener("click", loadDashboard);
$("#languageButton").addEventListener("click", () => {
  locale = locale === "ar" ? "en" : "ar";
  applyLocale();
});
$("#autoRefresh").addEventListener("change", (event) => setAutoRefresh(event.target.checked));
$("#warehouseSearch").addEventListener("input", () => {
  if (dashboardData) renderWarehouseTable(dashboardData);
});

setAutoRefresh(true);
applyLocale();
loadDashboard();
