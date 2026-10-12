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
    footerLabel: "لوحة متابعة تشغيلية", designCredit: "تصميم إبراهيم عفيفي",
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
    hourFilterTitle: "تحديد الفترة بالساعة",
    hourFilterDescription: "يُطبق الاختيار على جميع الرسوم والجداول الساعية في لوحة المتابعة.",
    fromHour: "من الساعة", toHour: "إلى الساعة", resetHours: "كل الساعات",
    periodAllHours: "كل الساعات", filteredTotal: "إجمالي الفترة",
    heatmapTitle: "كثافة الفرز الساعية", heatmapSubtitle: "مخرجات كل مستودع عبر ساعات الوردية",
    heatmapLegend: "كثافة الإنتاج", heatmapEmpty: "لا تتوفر بيانات للخريطة الحرارية.",
    peakHour: "الذروة", avgShort: "المتوسط", sortHint: "اضغط للترتيب",
    reportButton: "تقرير PDF", reportTitle: "تنزيل تقرير الأداء بصيغة PDF", reportPreparing: "جارٍ تجهيز التقرير…",
    reportKpiSection: "أبرز المؤشرات", reportHourlySection: "ملخص الإنتاجية الساعية",
    reportWarehouseSection: "أداء المستودعات", reportStagingSection: "التجهيز والشحن",
    reportSortingSection: "عمليات الفرز", reportIssuesSection: "الجودة والنواقص",
    reportHotspotsSection: "أبرز مواقع المشاكل", reportMetTarget: "ساعات حققت المستهدف",
    reportGenerated: "تاريخ التقرير", reportValue: "القيمة",
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
    footerLabel: "Operations dashboard", designCredit: "Design by Ibrahim Afify",
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
    hourFilterTitle: "Filter by hour range",
    hourFilterDescription: "Applies to every hourly chart and table across the dashboard.",
    fromHour: "From hour", toHour: "To hour", resetHours: "All hours",
    periodAllHours: "All hours", filteredTotal: "Period total",
    heatmapTitle: "Sorting intensity heatmap", heatmapSubtitle: "Output per warehouse across shift hours",
    heatmapLegend: "Output intensity", heatmapEmpty: "No heatmap data available.",
    peakHour: "Peak", avgShort: "Avg", sortHint: "Click to sort",
    reportButton: "PDF report", reportTitle: "Download the performance report as PDF", reportPreparing: "Preparing report…",
    reportKpiSection: "Key metrics", reportHourlySection: "Hourly productivity summary",
    reportWarehouseSection: "Warehouse performance", reportStagingSection: "Staging & dispatch",
    reportSortingSection: "Sorting operations", reportIssuesSection: "Quality & shortages",
    reportHotspotsSection: "Top issue hotspots", reportMetTarget: "hours met target",
    reportGenerated: "Report date", reportValue: "Value",
  },
};

const $ = (selector) => document.querySelector(selector);
let refreshTimer;
let dashboardData;
let locale = "ar";
let lastSyncAt;
let lastSyncError = "";

let hourRange = { from: null, to: null };
let availableHours = [];
const FALLBACK_HOURS = Array.from({ length: 16 }, (_, index) => index + 4);

function hourValue(label) {
  const text = String(label ?? "").trim();
  const meridiem = text.match(/^(\d{1,2})\s*(AM|PM)$/i);
  if (meridiem) {
    const hour = Number(meridiem[1]) % 12;
    return /PM/i.test(meridiem[2]) ? hour + 12 : hour;
  }
  const military = text.match(/^(\d{1,2})(?::00(?::00)?)?$/);
  if (military) return Number(military[1]) % 24;
  return null;
}

function formatHour(hour) {
  return `${String(hour).padStart(2, "0")}:00`;
}

function hoursCountLabel(count) {
  if (locale === "en") return `${count} ${count === 1 ? "hour" : "hours"}`;
  if (count === 1) return "ساعة واحدة";
  if (count === 2) return "ساعتان";
  if (count <= 10) return `${count} ساعات`;
  return `${count} ساعة`;
}

function reportsCountLabel(count) {
  if (locale === "en") return `${formatNumber(count)} ${count === 1 ? "report" : "reports"}`;
  if (count === 1) return "بلاغ واحد";
  if (count === 2) return "بلاغان";
  if (count >= 3 && count <= 10) return `${formatNumber(count)} بلاغات`;
  return `${formatNumber(count)} بلاغ`;
}

function unitsCountLabel(count) {
  if (locale === "en") return `${formatNumber(count)} ${count === 1 ? "unit" : "units"}`;
  if (count === 1) return "قطعة واحدة";
  return `${formatNumber(count)} قطعة`;
}

let chartCounter = 0;
let chartTooltip;
let warehouseSort = { index: null, direction: 1 };
let heatmapMode = "batch";

function motionReduced() {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getChartTooltip() {
  if (chartTooltip) return chartTooltip;
  if (typeof document.createElement !== "function") return null;
  chartTooltip = document.createElement("div");
  chartTooltip.className = "chart-tooltip";
  chartTooltip.setAttribute("aria-hidden", "true");
  document.body.appendChild(chartTooltip);
  return chartTooltip;
}

function positionTooltip(event) {
  const tooltip = getChartTooltip();
  if (!tooltip) return;
  const gap = 15;
  const width = tooltip.offsetWidth || 170;
  const height = tooltip.offsetHeight || 78;
  const viewportWidth = window.innerWidth || 1400;
  const viewportHeight = window.innerHeight || 900;
  const x = Math.max(8, Math.min((event.clientX || 0) + gap, viewportWidth - width - 10));
  const y = Math.max(8, Math.min((event.clientY || 0) + gap, viewportHeight - height - 10));
  tooltip.style.transform = `translate(${x}px, ${y}px)`;
}

function showChartTooltip(target, event) {
  const tooltip = getChartTooltip();
  if (!tooltip) return;
  tooltip.innerHTML = target.dataset.tip || "";
  tooltip.classList.add("visible");
  positionTooltip(event);
}

function hideChartTooltip() {
  if (chartTooltip) chartTooltip.classList.remove("visible");
}

function niceCeiling(value) {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const scaled = value / magnitude;
  const step = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return step * magnitude;
}

function smoothPath(points) {
  if (!points.length) return "";
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const midX = (previous.x + current.x) / 2;
    path += ` C ${midX} ${previous.y}, ${midX} ${current.y}, ${current.x} ${current.y}`;
  }
  return path;
}

function chartTip(title, entries) {
  const rows = entries.filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([label, value]) => `<span><i>${escapeHtml(label)}</i><b>${escapeHtml(value)}</b></span>`).join("");
  return `<strong>${escapeHtml(title)}</strong>${rows}`;
}

function barCell(value, max, color) {
  const raw = parseNumber(value);
  const percent = max > 0 ? Math.max(2, Math.round((raw / max) * 100)) : 0;
  return `<td class="numeric bar-cell" style="--bar:${percent}%;--bar-color:${color}">${escapeHtml(value || "0")}</td>`;
}

function sortWarehouseRows(rows) {
  if (warehouseSort.index === null) return rows;
  const { index, direction } = warehouseSort;
  return [...rows].sort((left, right) => (index === 1
    ? textAt(left, 1).localeCompare(textAt(right, 1))
    : parseNumber(textAt(left, index)) - parseNumber(textAt(right, index))) * direction);
}

function countUpElements(container) {
  if (!container || motionReduced() || typeof window.requestAnimationFrame !== "function") return;
  container.querySelectorAll("[data-count]").forEach((element) => {
    const target = parseNumber(element.dataset.count);
    if (!target || element.dataset.counted === "1") return;
    element.dataset.counted = "1";
    const suffix = element.dataset.suffix || "";
    const finalText = element.dataset.final || element.textContent;
    const duration = 850;
    const clock = () => (typeof performance?.now === "function" ? performance.now() : Date.now());
    const started = clock();
    const step = (time) => {
      const progress = Math.min(1, (time - started) / duration);
      const eased = 1 - (1 - progress) ** 3;
      element.textContent = progress < 1 ? `${formatNumber(target * eased)}${suffix}` : finalText;
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  });
}

function heatColor(intensity) {
  const palette = [[19, 31, 52], [46, 92, 130], [214, 217, 28], [255, 233, 0]];
  const scaled = Math.max(0, Math.min(1, intensity)) * (palette.length - 1);
  const low = Math.min(palette.length - 2, Math.floor(scaled));
  const mix = scaled - low;
  const channel = (index) => Math.round(palette[low][index] + (palette[low + 1][index] - palette[low][index]) * mix);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

function renderHeatmap(data) {
  const container = $("#heatmapContent");
  if (!container) return;
  const table = heatmapMode === "batch" ? data.batchHourly : data.crossdockHourly;
  const headers = table?.headers || [];
  const records = hourlyView(table)?.records || [];
  const warehouses = headers
    .map((header, index) => ({ header: String(header ?? "").trim(), index }))
    .filter(({ header, index }) => header && index >= 2 && !header.startsWith("إجمالي"));
  const totalIndex = headers.findIndex((header) => String(header ?? "").includes("إجمالي المنجز"));
  if (!records.length || !warehouses.length) {
    container.innerHTML = `<div class="empty-state">${t("heatmapEmpty")}</div>`;
    return;
  }
  const maxValue = Math.max(1, ...records.flatMap((row) => warehouses.map(({ index }) => parseNumber(textAt(row, index)))));
  const hourRow = `<div class="heat-corner"></div>${records.map((row) => `<div class="heat-hour">${escapeHtml(textAt(row, 1))}</div>`).join("")}`;
  const body = warehouses.map(({ header, index }) => `<div class="heat-label">${escapeHtml(header)}</div>${records.map((row) => {
    const value = parseNumber(textAt(row, index));
    const ratio = value / maxValue;
    const intensity = value > 0 ? .14 + ratio * .86 : 0;
    const tip = chartTip(`${header} · ${textAt(row, 1)}`, [[t("totalCompleted"), formatNumber(value)]]);
    return `<div class="heat-cell${ratio > .58 ? " on-bright" : ""}" style="--heat:${heatColor(intensity)}" data-tip="${escapeHtml(tip)}">${value > 0 ? formatNumber(value) : ""}</div>`;
  }).join("")}`).join("");
  const totals = totalIndex >= 0
    ? `<div class="heat-label heat-total">${t("overallTotal")}</div>${records.map((row) => `<div class="heat-cell heat-total-cell" data-tip="${escapeHtml(chartTip(textAt(row, 1), [[t("totalCompleted"), formatNumber(textAt(row, totalIndex))]]))}">${formatNumber(textAt(row, totalIndex))}</div>`).join("")}`
    : "";
  container.innerHTML = `<div class="heatmap-grid" style="--heat-cols:${records.length}">${hourRow}${body}${totals}</div><div class="heat-legend"><span>${t("heatmapLegend")}</span><i class="heat-gradient"></i><span>0</span><span class="heat-max">${formatNumber(maxValue)}</span></div>`;
}

function reportPeriodText() {
  if (!availableHours.length || hourRange.from === null || hourRange.to === null) return "—";
  const start = formatHour(hourRange.from);
  const end = formatHour(hourRange.to);
  const count = availableHours.filter((hour) => hour >= hourRange.from && hour <= hourRange.to).length;
  return isHourFilterActive() ? `${start} — ${end} · ${hoursCountLabel(count)}` : `${t("periodAllHours")} · ${start} — ${end}`;
}

function stagingValue(data, phrase) {
  const section = data.stagingMetrics;
  if (!section) return "—";
  const index = section.labels.findIndex((label) => String(label ?? "").includes(phrase));
  return index >= 0 ? textAt(section.values, index) : "—";
}

function reportStat(label, value, accent = "") {
  return `<div class="report-stat"${accent ? ` style="--accent:${accent}"` : ""}><small>${escapeHtml(label)}</small><strong>${escapeHtml(value || "—")}</strong></div>`;
}

function reportBar(value, color) {
  const percent = percentValue(value);
  return `<div class="report-bar"><span><i style="width:${percent}%;background:${color}"></i></span><b>${escapeHtml(value || "0%")}</b></div>`;
}

function reportTable(headers, rows) {
  const cell = (value) => (value && typeof value === "object" && "html" in value ? value.html : escapeHtml(value ?? "—"));
  return `<table class="report-table"><thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((value, index) => `<td${index === 0 ? ' class="report-strong"' : ""}>${cell(value)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function buildReportDocument(data) {
  const picking = hourlyView(data.pickingHourly)?.records || [];
  const met = picking.filter((row) => parseNumber(textAt(row, 3)) >= parseNumber(textAt(row, 2)) && parseNumber(textAt(row, 2)) > 0).length;
  const peak = picking.reduce((best, row) => (best === null || parseNumber(textAt(row, 3)) > parseNumber(textAt(best, 3)) ? row : best), null);
  const periodTarget = picking.reduce((sum, row) => sum + parseNumber(textAt(row, 2)), 0);
  const periodDone = picking.reduce((sum, row) => sum + parseNumber(textAt(row, 3)), 0);
  const generatedAt = new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date());
  const warehouseRows = data.warehouses.map((row) => [
    textAt(row, 1), textAt(row, 2), textAt(row, 3), textAt(row, 4), textAt(row, 5),
    { html: reportBar(textAt(row, 7), colors.teal) },
  ]);
  const hotspotRows = data.hotspots.slice(0, 5).map((row) => [textAt(row, 1), textAt(row, 2), textAt(row, 5), textAt(row, 7)]);
  const stagingRows = [
    [t("pendingStaging"), stagingValue(data, "حاويات بانتظار الاستيج")],
    [t("stagedRelease"), stagingValue(data, "حاويات تم استيجها")],
    [t("readyDispatch"), stagingValue(data, "حاويات جاهزة للشحن")],
    [t("closedPallets"), stagingValue(data, "بالتات مقفلة للشحن")],
  ];
  const sortingRows = [data.batch, data.crossdock].map((section, index) => [
    index === 0 ? t("batches") : t("crossDock"),
    getLabelMetric(section, "كمية الفرز المنجز") || "—",
    getLabelMetric(section, "كمية قيد الفرز") || "—",
    getLabelMetric(section, "كمية المعلق") || "—",
  ]);
  const issueStats = [
    reportStat(t("skippedPieces"), textAt(data.issueKpis, 1), colors.red),
    reportStat(t("issueReports"), textAt(data.issueKpis, 3), colors.amber),
    reportStat(t("missingPieces"), textAt(data.issueKpis, 5), "#ff9c67"),
    reportStat(t("damagedPieces"), textAt(data.issueKpis, 7), colors.red),
    reportStat(t("expiredPieces"), textAt(data.issueKpis, 9), colors.violet),
    reportStat(t("affectedLocations"), textAt(data.issueKpis, 11), colors.blue),
  ].join("");
  return `<div class="report-doc">
    <header class="report-head">
      <img src="assets/noon-minutes-logo.png" alt="noon minutes">
      <div class="report-head-copy"><strong>noon minutes</strong><h1>${locale === "ar" ? "تقرير الأداء التشغيلي" : "Operations Performance Report"}</h1><p>${t("reportGenerated")}: ${escapeHtml(data.date || t("unknownDate"))} · ${t("dailyShift")} 04:00 — 19:00</p></div>
      <div class="report-period"><small>${t("hourFilterTitle")}</small><strong>${escapeHtml(reportPeriodText())}</strong></div>
    </header>
    <section class="report-block"><h2>${t("reportKpiSection")}</h2><div class="report-stats">
      ${reportStat(t("kpiRequired"), data.main.target, colors.blue)}
      ${reportStat(t("kpiCompleted"), data.main.completed, colors.green)}
      ${reportStat(t("kpiRemaining"), data.main.remaining, colors.amber)}
      ${reportStat(t("kpiCompletion"), data.main.completion, colors.teal)}
      ${reportStat(t("averageProductivity"), data.main.iph ? `${data.main.iph} ${t("piecePerHour")}` : "—", colors.violet)}
      ${reportStat(t("totalShortages"), data.main.shortages, colors.red)}
    </div></section>
    <section class="report-block"><h2>${t("reportHourlySection")} <em>${escapeHtml(reportPeriodText())}</em></h2><div class="report-stats report-stats-5">
      ${reportStat(t("completed"), formatNumber(periodDone), colors.green)}
      ${reportStat(t("target"), formatNumber(periodTarget), colors.blue)}
      ${reportStat(t("kpiCompletion"), periodTarget > 0 ? `${((periodDone / periodTarget) * 100).toFixed(1)}%` : "—", colors.teal)}
      ${reportStat(t("reportMetTarget"), `${met}`, colors.amber)}
      ${reportStat(t("reportPeak"), peak ? `${textAt(peak, 1)} · ${formatNumber(textAt(peak, 3))}` : "—", "#c9a227")}
    </div></section>
    <section class="report-block"><h2>${t("reportWarehouseSection")}</h2>
      ${reportTable([t("warehouse"), t("totalRequired"), t("actualCompleted"), t("remaining"), t("shortages"), t("completionRate")], warehouseRows)}
      <p class="report-note">${t("overallTotal")}: ${escapeHtml(textAt(data.warehouseTotal, 2))} ${t("required")} · ${escapeHtml(textAt(data.warehouseTotal, 3))} ${t("done")}</p>
    </section>
    <div class="report-split">
      <section class="report-block"><h2>${t("reportStagingSection")}</h2>${reportTable([t("stagingKpisTitle"), t("reportValue")], stagingRows)}</section>
      <section class="report-block"><h2>${t("reportSortingSection")}</h2>${reportTable([t("batches"), t("done"), t("inProgress"), t("pending")], sortingRows)}</section>
    </div>
    <section class="report-block"><h2>${t("reportIssuesSection")}</h2><div class="report-stats">${issueStats}</div></section>
    <section class="report-block"><h2>${t("reportHotspotsSection")}</h2>
      ${reportTable([t("location"), t("warehouse"), t("totalQuantity"), t("share")], hotspotRows)}
    </section>
    <footer class="report-foot"><span>noon minutes · ${t("dashboard")}</span><span>${escapeHtml(t("designCredit"))} · ${escapeHtml(generatedAt)}</span></footer>
  </div>`;
}

const PDF_LIBRARY_URL = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
let pdfLibraryPromise;

function ensurePdfLibrary() {
  if (window.html2pdf) return Promise.resolve(window.html2pdf);
  if (pdfLibraryPromise) return pdfLibraryPromise;
  pdfLibraryPromise = new Promise((resolve, reject) => {
    if (typeof document.createElement !== "function") {
      reject(new Error("PDF generator unavailable"));
      return;
    }
    const script = document.createElement("script");
    script.src = PDF_LIBRARY_URL;
    script.onload = () => (window.html2pdf ? resolve(window.html2pdf) : reject(new Error("PDF generator missing")));
    script.onerror = () => {
      pdfLibraryPromise = null;
      reject(new Error("PDF generator failed to load"));
    };
    document.body.appendChild(script);
  });
  return pdfLibraryPromise;
}

function getReportContainer() {
  let container = $("#reportDocument");
  if (!container) {
    if (typeof document.createElement !== "function") return null;
    container = document.createElement("div");
    container.id = "reportDocument";
    container.className = "report-host";
    document.body.appendChild(container);
  }
  return container;
}

async function generatePdfReport() {
  const button = $("#reportButton");
  if (!dashboardData || button?.disabled) return;
  const container = getReportContainer();
  if (!container) return;
  const label = $("#reportButton .report-button-label");
  const previousLabel = label?.textContent || "";
  button.disabled = true;
  button.classList.add("is-loading");
  if (label) label.textContent = t("reportPreparing");
  container.innerHTML = buildReportDocument(dashboardData);
  const stamp = (dashboardData.date || "").replace(/[^\w-]/g, "") || "latest";
  try {
    const html2pdf = await ensurePdfLibrary();
    await html2pdf().set({
      margin: [6, 6],
      filename: `noon-operations-report-${stamp}.pdf`,
      image: { type: "jpeg", quality: .96 },
      html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    }).from(container).save();
  } catch (error) {
    console.error("PDF report failed:", error);
    document.body.classList.add("printing-report");
    window.print();
  } finally {
    document.body.classList.remove("printing-report");
    if (label) label.textContent = previousLabel || t("reportButton");
    button.disabled = false;
    button.classList.remove("is-loading");
  }
}

function hourColumnValues(table) {
  return (table?.records || []).map((row) => hourValue(textAt(row, 1))).filter((hour) => hour !== null);
}

function syncHourOptions() {
  const hours = [...new Set([
    ...hourColumnValues(dashboardData?.pickingHourly),
    ...hourColumnValues(dashboardData?.dispatchHourly),
    ...hourColumnValues(dashboardData?.issueHourly),
    ...hourColumnValues(dashboardData?.batchHourly),
    ...hourColumnValues(dashboardData?.crossdockHourly),
  ])].sort((left, right) => left - right);
  availableHours = hours.length ? hours : FALLBACK_HOURS;
  const min = availableHours[0];
  const max = availableHours[availableHours.length - 1];
  const from = hourRange.from === null ? min : Math.min(Math.max(hourRange.from, min), max);
  const to = hourRange.to === null ? max : Math.min(Math.max(hourRange.to, min), max);
  hourRange.from = Math.min(from, to);
  hourRange.to = Math.max(from, to);
  const signature = availableHours.join(",");
  const options = availableHours.map((hour) => `<option value="${hour}">${formatHour(hour)}</option>`).join("");
  ["#timeFrom", "#timeTo"].forEach((selector) => {
    const select = $(selector);
    if (!select) return;
    if (select.dataset.hours !== signature) {
      select.innerHTML = options;
      select.dataset.hours = signature;
    }
    select.value = String(selector === "#timeFrom" ? hourRange.from : hourRange.to);
  });
}

function isHourFilterActive() {
  if (!availableHours.length || hourRange.from === null || hourRange.to === null) return false;
  return hourRange.from > availableHours[0] || hourRange.to < availableHours[availableHours.length - 1];
}

function buildPeriodTotal(table, records) {
  const headers = table.headers.map((header) => String(header ?? "").trim());
  const total = headers.map(() => "");
  const findColumn = (phrases) => headers.findIndex((header) => phrases.some((phrase) => header.includes(phrase)));
  const targetIndex = findColumn(["المستهدف"]);
  const completedIndex = findColumn(["المنجز"]);
  const workersIndex = findColumn(["العمالة النشطة"]);
  const sumColumn = (index) => (index < 0 ? 0 : records.reduce((sum, row) => sum + parseNumber(textAt(row, index)), 0));
  headers.forEach((header, index) => {
    if (index <= 1) return;
    const values = records.map((row) => textAt(row, index));
    if (header.includes("نسبة الإنجاز")) {
      const target = sumColumn(targetIndex);
      const completed = sumColumn(completedIndex);
      total[index] = target > 0 ? `${((completed / target) * 100).toFixed(1)}%` : "0.0%";
      return;
    }
    if (header.includes("معدل IPH")) {
      const workers = sumColumn(workersIndex);
      total[index] = formatNumber(workers > 0 ? sumColumn(completedIndex) / workers : 0);
      return;
    }
    if (header.includes("حالة")) {
      const target = sumColumn(targetIndex);
      const completed = sumColumn(completedIndex);
      total[index] = target > 0 && completed >= target ? t("targetMet") : t("belowTarget");
      return;
    }
    const numeric = values.every((value) => value === "" || /^-?[\d,]+(?:\.\d+)?$/.test(value));
    total[index] = numeric ? formatNumber(values.reduce((sum, value) => sum + parseNumber(value), 0)) : "—";
  });
  total[1] = t("filteredTotal");
  return total;
}

function hourlyView(table) {
  if (!table?.records?.length || !isHourFilterActive()) return table;
  const records = table.records.filter((row) => {
    const hour = hourValue(textAt(row, 1));
    if (hour === null) return true;
    return hour >= hourRange.from && hour <= hourRange.to;
  });
  if (records.length === table.records.length) return table;
  return { ...table, records, total: records.length ? buildPeriodTotal(table, records) : [] };
}

function updateTimeFilterLabel() {
  const label = $("#timeFilterPeriod");
  if (!label || !availableHours.length) return;
  const start = formatHour(hourRange.from ?? availableHours[0]);
  const end = formatHour(hourRange.to ?? availableHours[availableHours.length - 1]);
  const active = isHourFilterActive();
  const count = availableHours.filter((hour) => hour >= hourRange.from && hour <= hourRange.to).length;
  label.classList.toggle("is-active", active);
  document.querySelector(".global-time-filter")?.classList.toggle("is-active", active);
  label.textContent = active
    ? `${start} — ${end} · ${hoursCountLabel(count)}`
    : `${t("periodAllHours")} · ${start} — ${end}`;
}

function refreshTimeFilter() {
  syncHourOptions();
  updateTimeFilterLabel();
  if (dashboardData) renderDashboard(dashboardData);
}

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
  updateTimeFilterLabel();
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

function renderDataTable(target, title, sourceTable, { hourly = false, subtitle = "" } = {}) {
  const container = typeof target === "string" ? $(target) : target;
  const table = hourlyView(sourceTable);
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
  $("#kpiGrid").innerHTML = metrics.map((metric, index) => {
    const raw = metric.value || "—";
    const suffix = String(raw).trim().endsWith("%") ? "%" : "";
    return `<article class="kpi-card" style="--accent:${metric.accent};--i:${index}"><div class="kpi-top"><span>${metric.label}</span><span class="kpi-icon">${metric.icon}</span></div><div class="kpi-value" data-count="${escapeHtml(raw)}" data-suffix="${suffix}" data-final="${escapeHtml(raw)}">${escapeHtml(raw)}</div><div class="kpi-sub">${metric.sub}</div></article>`;
  }).join("");
  countUpElements($("#kpiGrid"));

  const progress = percentValue(data.main.completion);
  $("#progressContent").innerHTML = `<div class="donut" style="background:conic-gradient(${colors.teal} ${progress}%, #26364b ${progress}% 100%)"><div class="donut-label"><strong>${escapeHtml(data.main.completion)}</strong><small>${t("complete")}</small></div></div><div class="progress-copy"><strong>${t("shiftProgress")}</strong><span>${t("progressSentence")} <b>${escapeHtml(data.main.completed)}</b> ${t("ofTotal")} <b>${escapeHtml(data.main.target)}</b> ${t("requiredUnits")}</span><span>${t("remaining")} <b>${escapeHtml(data.main.remaining)}</b> ${t("remainingUnits")}</span></div>`;
  $("#progressStats").innerHTML = [
    { label: t("workforce"), value: data.main.workers, icon: "♙", color: colors.blue },
    { label: t("productivityPerHour"), value: data.main.iph, icon: "⌁", color: colors.violet },
  ].map((item) => `<div class="mini-stat" style="--accent:${item.color}"><span class="mini-stat-icon">${item.icon}</span><div><small>${item.label}</small><strong>${escapeHtml(item.value || "—")}</strong></div></div>`).join("");
}

function renderWarehouseTable(data) {
  const search = $("#warehouseSearch").value.trim().toLowerCase();
  const filtered = sortWarehouseRows(data.warehouses.filter((row) => textAt(row, 1).toLowerCase().includes(search)));
  const maxima = [2, 3, 4, 5, 6].map((index) => Math.max(1, ...data.warehouses.map((row) => parseNumber(textAt(row, index)))));
  const barColors = [colors.blue, colors.green, colors.amber, colors.red, colors.violet];
  $("#warehouseRows").innerHTML = filtered.length ? filtered.map((row) => `<tr>
    <td class="warehouse-name">${escapeHtml(textAt(row, 1))}</td>
    ${[2, 3, 4, 5, 6].map((index, position) => barCell(textAt(row, index), maxima[position], barColors[position])).join("")}
    <td>${progressCell(textAt(row, 7))}</td></tr>`).join("") : `<tr><td colspan="7" class="empty-state">${t("noMatches")}</td></tr>`;
  $("#warehouseCount").textContent = locale === "ar"
    ? `${filtered.length} من ${data.warehouses.length} ${t("warehouseCount")}`
    : `${filtered.length} of ${data.warehouses.length} ${t("warehouseCount")}`;
  $("#warehouseTotal").textContent = `${t("overallTotal")}: ${textAt(data.warehouseTotal, 2)} ${t("required")} · ${textAt(data.warehouseTotal, 3)} ${t("done")}`;
}

function renderBarChart(rows, { labelIndex, actualIndex, targetIndex, activeIndex = -1, compact = false }) {
  if (!rows.length) return `<div class="empty-state">${t("noChartData")}</div>`;
  const id = `chart${(chartCounter += 1)}`;
  const width = 760;
  const height = compact ? 190 : 226;
  const margin = { top: 26, right: 10, bottom: 30, left: 10 };
  const chartHeight = height - margin.top - margin.bottom;
  const chartWidth = width - margin.left - margin.right;
  const baseline = margin.top + chartHeight;
  const peakIndex = rows.reduce((best, row, index) => (parseNumber(textAt(row, actualIndex)) > parseNumber(textAt(rows[best], actualIndex)) ? index : best), 0);
  const maxValue = niceCeiling(Math.max(1, ...rows.flatMap((row) => [parseNumber(textAt(row, actualIndex)), parseNumber(textAt(row, targetIndex))])));
  const average = rows.reduce((sum, row) => sum + parseNumber(textAt(row, actualIndex)), 0) / rows.length;
  const groupWidth = chartWidth / rows.length;
  const barWidth = Math.min(compact ? 14 : 17, groupWidth * .36);
  const yFor = (value) => baseline - chartHeight * (value / maxValue);
  const gridLines = [0, .25, .5, .75, 1].map((ratio) => {
    const y = margin.top + chartHeight * (1 - ratio);
    return `<line class="chart-grid" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"/><text class="chart-tick" x="${width - margin.right}" y="${y - 4}">${formatNumber(maxValue * ratio)}</text>`;
  }).join("");
  const averageLine = average > 0 ? `<line class="chart-avg" x1="${margin.left}" y1="${yFor(average)}" x2="${width - margin.right}" y2="${yFor(average)}"/><text class="chart-avg-label" x="${margin.left + 3}" y="${yFor(average) - 5}">${t("avgShort")} ${formatNumber(average)}</text>` : "";
  const bars = rows.map((row, index) => {
    const actual = parseNumber(textAt(row, actualIndex));
    const target = parseNumber(textAt(row, targetIndex));
    const label = escapeHtml(textAt(row, labelIndex));
    const center = margin.left + groupWidth * (index + .5);
    const actualY = yFor(actual);
    const targetY = yFor(target);
    const targetBar = target > 0 ? `<rect class="bar-target" x="${center + 1}" y="${targetY}" width="${barWidth}" height="${Math.max(1.5, baseline - targetY)}" rx="4"><title>${label} · ${t("targetLabel")} ${formatNumber(target)}</title></rect>` : "";
    const tipEntries = [[t("actual"), formatNumber(actual)]];
    if (target > 0) tipEntries.push([t("targetLabel"), formatNumber(target)], [t("completionRate"), `${((actual / target) * 100).toFixed(1)}%`]);
    if (activeIndex >= 0) tipEntries.push([t("activeStaff"), textAt(row, activeIndex)]);
    const peak = index === peakIndex && actual > 0 ? `<text class="chart-peak" x="${center}" y="${actualY - 7}">★ ${t("peakHour")}</text>` : "";
    return `<g class="bar-group${index === peakIndex ? " is-peak" : ""}" data-tip="${escapeHtml(chartTip(textAt(row, labelIndex), tipEntries))}"><rect class="bar-hit" x="${center - groupWidth / 2}" y="${margin.top}" width="${groupWidth}" height="${chartHeight}"/>${targetBar}<rect class="bar-actual" style="animation-delay:${index * 32}ms" x="${center - barWidth - 1}" y="${actualY}" width="${barWidth}" height="${Math.max(1.5, baseline - actualY)}" rx="4" fill="url(#${id})"><title>${label} · ${t("actual")} ${formatNumber(actual)}</title></rect>${peak}<text class="chart-label" x="${center}" y="${height - 10}">${label}</text></g>`;
  }).join("");
  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${compact ? t("chartContainerLabel") : t("chartHourlyLabel")}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe900"/><stop offset="1" stop-color="#dfb400"/></linearGradient></defs>${gridLines}${averageLine}${bars}</svg>`;
}

function renderAreaChart(rows, { labelIndex, valueIndex }) {
  if (!rows.length) return `<div class="empty-state">${t("noChartData")}</div>`;
  const id = `chart${(chartCounter += 1)}`;
  const width = 760;
  const height = 200;
  const margin = { top: 18, right: 10, bottom: 30, left: 10 };
  const chartHeight = height - margin.top - margin.bottom;
  const chartWidth = width - margin.left - margin.right;
  const baseline = margin.top + chartHeight;
  const maxValue = niceCeiling(Math.max(1, ...rows.map((row) => parseNumber(textAt(row, valueIndex)))));
  const groupWidth = chartWidth / rows.length;
  const points = rows.map((row, index) => ({
    x: margin.left + groupWidth * (index + .5),
    y: baseline - chartHeight * (parseNumber(textAt(row, valueIndex)) / maxValue),
    value: parseNumber(textAt(row, valueIndex)),
    label: textAt(row, labelIndex),
  }));
  const line = smoothPath(points);
  const area = `${line} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`;
  const gridLines = [0, .5, 1].map((ratio) => {
    const y = margin.top + chartHeight * (1 - ratio);
    return `<line class="chart-grid" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"/><text class="chart-tick" x="${width - margin.right}" y="${y - 4}">${formatNumber(maxValue * ratio)}</text>`;
  }).join("");
  const dots = points.map((point, index) => `<circle class="area-dot" style="animation-delay:${index * 34}ms" cx="${point.x}" cy="${point.y}" r="3.4"/>`).join("");
  const hits = points.map((point) => `<rect class="bar-hit" x="${point.x - groupWidth / 2}" y="${margin.top}" width="${groupWidth}" height="${chartHeight}" data-tip="${escapeHtml(chartTip(point.label, [[t("totalContainerFlow"), formatNumber(point.value)]]))}"/>`).join("");
  const labels = points.map((point) => `<text class="chart-label" x="${point.x}" y="${height - 10}">${escapeHtml(point.label)}</text>`).join("");
  return `<svg class="chart-svg area-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${t("chartContainerLabel")}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#62d087" stop-opacity=".4"/><stop offset="1" stop-color="#62d087" stop-opacity="0"/></linearGradient></defs>${gridLines}<path class="area-fill" d="${area}" fill="url(#${id})"/><path class="area-line" d="${line}"/>${dots}${hits}${labels}</svg>`;
}

function renderHourly(data) {
  const rows = hourlyView(data.pickingHourly)?.records || [];
  const dispatchRows = hourlyView(data.dispatchHourly)?.records || [];
  $("#hourlyChart").innerHTML = renderBarChart(rows, { labelIndex: 1, actualIndex: 3, targetIndex: 2, activeIndex: 4 });
  const met = rows.filter((row) => parseNumber(textAt(row, 3)) >= parseNumber(textAt(row, 2)) && parseNumber(textAt(row, 2)) > 0).length;
  $("#hourlyNote").textContent = `${met} ${t("metHours")}`;
  $("#dispatchChart").innerHTML = renderAreaChart(dispatchRows, { labelIndex: 1, valueIndex: 7 });
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
  const issueMax = [2, 3, 4, 6].map((index) => Math.max(1, ...data.issueWarehouses.map((row) => (index === 4
    ? parseNumber(textAt(row, 4)) + parseNumber(textAt(row, 5))
    : parseNumber(textAt(row, index))))));
  $("#issueWarehouseRows").innerHTML = data.issueWarehouses.map((row) => `<tr><td class="warehouse-name">${escapeHtml(textAt(row, 1))}</td>${barCell(textAt(row, 2), issueMax[0], colors.amber)}${barCell(textAt(row, 3), issueMax[1], "#ff9c67")}${barCell(formatNumber(parseNumber(textAt(row, 4)) + parseNumber(textAt(row, 5))), issueMax[2], colors.red)}${barCell(textAt(row, 6), issueMax[3], colors.violet)}<td>${progressCell(textAt(row, 7), colors.red)}</td></tr>`).join("");
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
  $("#hotspotRows").innerHTML = data.hotspots.length ? data.hotspots.map((row, index) => {
    const location = escapeHtml(textAt(row, 1));
    const context = `${escapeHtml(textAt(row, 2))} · ${escapeHtml(textAt(row, 3))}`;
    return `<div class="hotspot-row"><span class="hotspot-rank">${index + 1}</span><span class="hotspot-location" title="${location}">${location}</span><span class="hotspot-meta"><strong title="${context}">${context}</strong><span>${reportsCountLabel(parseNumber(textAt(row, 4)))} · ${escapeHtml(textAt(row, 6))}</span></span><span class="hotspot-qty"><strong>${unitsCountLabel(parseNumber(textAt(row, 5)))}</strong><small>${t("share")} ${escapeHtml(textAt(row, 7))}</small></span></div>`;
  }).join("") : `<div class="empty-state">${t("noLocations")}</div>`;
}

function renderDashboard(data) {
  dashboardData = data;
  syncHourOptions();
  renderKpis(data);
  renderWarehouseTable(data);
  renderHourly(data);
  renderWorkflows(data);
  renderIssues(data);
  renderHeatmap(data);
  $("#sheetDate").textContent = data.date || t("unknownDate");
  $("#connectionBanner").hidden = !lastSyncError;
  updateTimeFilterLabel();
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
$("#timeFrom").addEventListener("change", (event) => {
  hourRange.from = Number(event.target.value);
  if (hourRange.from > hourRange.to) hourRange.to = hourRange.from;
  refreshTimeFilter();
});
$("#timeTo").addEventListener("change", (event) => {
  hourRange.to = Number(event.target.value);
  if (hourRange.to < hourRange.from) hourRange.from = hourRange.to;
  refreshTimeFilter();
});
$("#resetTimeFilter").addEventListener("click", () => {
  if (!availableHours.length) return;
  hourRange.from = availableHours[0];
  hourRange.to = availableHours[availableHours.length - 1];
  refreshTimeFilter();
});

document.addEventListener("pointerover", (event) => {
  const target = event.target?.closest?.("[data-tip]");
  if (target) showChartTooltip(target, event);
});
document.addEventListener("pointermove", (event) => {
  if (chartTooltip?.classList.contains("visible")) positionTooltip(event);
});
document.addEventListener("pointerout", (event) => {
  if (event.target?.closest?.("[data-tip]")) hideChartTooltip();
});

document.querySelectorAll("#warehouseTable thead th").forEach((header, index) => {
  header.dataset.sortable = "1";
  header.setAttribute("title", t("sortHint"));
  header.addEventListener("click", () => {
    if (warehouseSort.index === index) warehouseSort.direction *= -1;
    else {
      warehouseSort.index = index;
      warehouseSort.direction = index === 1 ? 1 : -1;
    }
    document.querySelectorAll("#warehouseTable thead th").forEach((other, otherIndex) => {
      const active = warehouseSort.index === otherIndex;
      other.classList.toggle("sorted", active);
      other.dataset.order = active ? (warehouseSort.direction === 1 ? "asc" : "desc") : "";
    });
    if (dashboardData) renderWarehouseTable(dashboardData);
  });
});

document.querySelectorAll(".heatmap-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    heatmapMode = tab.dataset.heatmap === "crossdock" ? "crossdock" : "batch";
    document.querySelectorAll(".heatmap-tab").forEach((other) => other.classList.toggle("active", other === tab));
    if (dashboardData) renderHeatmap(dashboardData);
  });
});

$("#reportButton").addEventListener("click", generatePdfReport);

setAutoRefresh(true);
syncHourOptions();
applyLocale();
loadDashboard();
