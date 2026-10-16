const SHEET_ID = "1ZxfAGaLTjWE5CSpdpi2v8UMN4XS_zi6ov9Yr2X7OiCk";
const SHEET_GID = "1888176207";
const REFRESH_INTERVAL_MS = 60_000;
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
// The "Live" tab holds Minutes Central's picking cards: one row per metric, one column for ALL and per warehouse.
const LIVE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1697017325`;
// "LiveJobs" holds one row per picking job and hour, with the picker, warehouse and picking type.
const LIVE_JOBS_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=220728301`;

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
    navPickers: "إنتاجية البيكرز", pkEyebrow: "متابعة عمال التجهيز", pkHeadingMain: "إنتاجية", pkHeadingAccent: "البيكرز",
    pkIntro: "كل بيكر لقط كام في كل ساعة، والمطلوب منه، وحقق ولا لا.", pkSiteUpdate: "آخر تحديث من الموقع",
    pkKpiPickers: "بيكرز اشتغلوا", pkKpiPickersSub: "في كل المخازن", pkKpiActive: "شغالين الساعة دي", pkKpiActiveSub: "الساعة الجارية",
    pkKpiUnits: "قطع اتلقطت", pkKpiUnitsSub: "منها في الساعة الجارية", pkKpiIph: "متوسط القطع في الساعة", pkKpiIphSub: "لكل بيكر في الساعات المقفولة",
    pkKpiMet: "محققين التارجت", pkKpiMissed: "عندهم عجز", pkOfScored: "من", pkKpiMissedSub: "أقل من المطلوب منهم",
    pkAllWarehouses: "كل المخازن", pkAllShifts: "كل الشيفتات", pkAllStatus: "كل الحالات", pkStatusActive: "شغالين دلوقتي",
    pkSortLabel: "الترتيب", pkSortUnits: "الأعلى في القطع", pkSortIph: "الأعلى في القطع/ساعة", pkSortRate: "الأعلى في التحقيق", pkSortLow: "الأقل في التحقيق", pkSortName: "بالاسم",
    pkSearch: "ابحث بالاسم أو اليوزر…", pkTopTitle: "الأعلى إنتاجية", pkTopSubtitle: "أعلى 5 في القطع في الساعة",
    pkBottomTitle: "محتاجين متابعة", pkBottomSubtitle: "أقل 5 في نسبة التحقيق", pkWarehouseTitle: "ملخص المخازن", pkWarehouseSubtitle: "البيكرز والإنتاجية في كل مخزن",
    pkTableTitle: "إنتاجية كل بيكر بالساعة", pkTableSubtitle: "في كل خانة: الرقم الكبير اللي لقطه، والصغير المطلوب منه في الساعة دي",
    pkNote: "المطلوب من كل بيكر = مستهدف المخزن في الساعة ÷ عدد البيكرز اللي اشتغلوا فيه الساعة دي. الساعة الحالية لسه شغالة فمش داخلة في الحكم.",
    pkPicker: "البيكر", pkHours: "ساعات", pkDone: "المنجز", pkRequired: "المطلوب", pkRate: "التحقيق", pkPerHour: "قطعة/ساعة",
    pkPickersCol: "البيكرز", pkMetCol: "محققين", pkMissedCol: "عجز", pkNoData: "مفيش بيانات بيكرز لسه.", pkNoMatch: "مفيش بيكر مطابق للفلتر.",
    pkShowing: "بيكر", pkOf: "من", pkNowOnly: "شغال في الساعة الجارية بس",
    pkNoLive: "أرقام الموقع مش متاحة دلوقتي، هتظهر مع التحديث الجاي.",
    pkTimeFilter: "فلتر الوقت",
    pkTypeCol: "نوع البيك", pkAllTypes: "كل الأنواع", rptByType: "حسب نوع البيك", rptShare: "من الساعة",
    themeLight: "الوضع النهاري", themeDark: "الوضع الليلي",
    rptHourMet: "محققين من الشغالين",
    rptHourBanner: "بيانات الساعة", rptHourClosed: "الساعة دي خلصت", rptHourRunning: "الساعة دي لسه شغالة", rptHourDone: "منجز الساعة", rptHourTarget: "مستهدف الساعة",
    rptHourGap: "الفرق عن المستهدف", rptHourWorkers: "شغالين الساعة دي", rptHourPerPicker: "قطع لكل بيكر", rptVsPrevious: "عن الساعة اللي قبلها",
    rptHourWarehouses: "كل مخزن في الساعة دي", rptRemainingNow: "الفاضل لحد دلوقتي", rptRequiredEach: "المطلوب من كل بيكر", rptHourPickers: "البيكرز اللي اشتغلوا الساعة دي",
    rptPicked: "اتلقط", rptStopped: "اشتغلوا الساعة اللي قبلها ومظهروش الساعة دي",
    rptRunningNote: "الساعة الجارية لسه شغالة، اتعمل فيها لحد دلوقتي من",
    pkExcel: "تنزيل Excel", pkExcelTitle: "تنزيل جدول البيكرز زي ما هو ظاهر بالفلاتر في ملف Excel", pkExcelFailed: "تعذر تجهيز ملف Excel، جرّب تاني.",
    pkRemainingTitle: "الفاضل في كل مخزن", pkRemainingSub: "المتبقي من المطلوب ومين شغال دلوقتي، دوس على المخزن عشان تفلتر عليه",
    pkOfRequired: "من", pkPerActive: "على كل بيكر شغال", pkNoneActive: "مفيش حد شغال الساعة دي", pkFrom: "من الساعة", pkTo: "إلى الساعة",
    pkHourReport: "تقرير الساعة", pkHourReportTitle: "تنزيل تقرير آخر ساعة خلصت: المنجز والشغالين واللي محتاجين متابعة",
    pkShiftReport: "تقرير آخر الشيفت", pkShiftReportTitle: "تنزيل تقرير الشيفت حسب الفترة والمخزن والشيفت المختارين",
    rptPickHourHeading: "تقرير التجهيز الساعي", rptShiftHeading: "تقرير آخر الشيفت", rptPeriod: "الفترة", rptShift: "الشيفت", rptWarehouse: "المخزن",
    rptHoursSection: "عملنا كام كل ساعة", rptRemainingSection: "الفاضل في كل مخزن", rptTopSection: "الأعلى إنتاجية", rptBottomSection: "محتاجين متابعة",
    rptPickersSection: "إنتاجية كل بيكر في الفترة", rptLastHourDone: "منجز الساعة", rptCumulative: "المنجز في الفترة", rptHoursMet: "ساعات محققة",
    rptNote: "الأرقام من Minutes Central. المطلوب من كل بيكر = مستهدف المخزن في الساعة ÷ عدد البيكرز اللي اشتغلوا فيه الساعة دي. الساعة الجارية مش داخلة في الحكم.",
    brandLogo: "شعار نون مينتس", navLabel: "التنقل الرئيسي", homeLabel: "العودة للرئيسية",
    brandCaption: "مركز العمليات", navSection: "لوحة المتابعة", navOverview: "نظرة عامة",
    navWarehouses: "أداء المستودعات", navProductivity: "الإنتاجية الساعية",
    navWorkflows: "سير العمل والشحن", navIssues: "النواقص والمشاكل",
    dataSource: "مصدر البيانات", connected: "متصل",
    sidebarFoot: "لوحة تشغيلية مباشرة", dashboard: "لوحة القيادة", live: "بث مباشر",
    refreshNow: "تحديث البيانات الآن", pageEyebrow: "ملخص الأداء التشغيلي",
    headingMain: "لوحة القيادة", headingAccent: "التشغيلية",
    pageIntro: "نظرة موحدة على التجهيز، الإنتاجية، تدفق التوتات ومؤشرات الجودة.",
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
    containerPipeline: "خط سير التوتات",
    containerPipelineSubtitle: "توزيع التوتات حسب المرحلة التشغيلية",
    hourlyDispatch: "حركة الشحن الساعية",
    hourlyDispatchSubtitle: "إجمالي حركة التوتات حسب الساعة",
    dispatchChartLabel: "رسم بياني لحركة التوتات الساعية",
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
    progressRate: "نسبة الإنجاز", containers: "توتة", units: "قطعة",
    totalUnitsRecorded: "إجمالي القطع المسجلة",
    noPipelineData: "لا تتوفر تفاصيل مراحل التوتات.",
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
    chartContainerLabel: "حركة التوتات",
    hourlyDetails: "التفاصيل الساعية",
    pickingHourlyDetails: "تفاصيل الإنجاز الساعي للتجهيز",
    batchWarehouseSummary: "ملخص فرز الباتشات حسب المستودع",
    batchHourlyDetails: "المنجز الساعي حسب مستودع الفرز",
    crossdockWarehouseSummary: "ملخص فرز الكروس دوك حسب المستودع",
    crossdockHourlyDetails: "المنجز الساعي حسب مستودع الكروس دوك",
    stagingKpisTitle: "مؤشرات التجهيز والشحن",
    dispatchHourlyDetails: "حركة التوتات والشحن لكل ساعة",
    palletDispatchDetails: "تفاصيل البالتات والتوتات حسب الوجهة",
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
    totalContainerFlow: "إجمالي حركة التوتات",
    destinationCode: "كود الوجهة",
    darkStore: "اسم الدارك ستور",
    palletBarcode: "باركود البالتة",
    stagingLocation: "موقع الاستيج",
    destinationPallets: "بالتات الوجهة",
    containersPerPallet: "توتات بالبالتة",
    percentOfContainers: "من إجمالي التوتات",
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
    heatmapHint: "كل صف = مستودع · كل عمود = ساعة",
    peakHour: "الذروة", avgShort: "المتوسط", sortHint: "اضغط للترتيب",
    reportButton: "تقرير PDF", reportTitle: "تنزيل تقرير الأداء بصيغة PDF", reportPreparing: "جارٍ تجهيز التقرير…",
    reportKpiSection: "أبرز المؤشرات", reportHourlySection: "ملخص الإنتاجية الساعية",
    reportWarehouseSection: "أداء المستودعات", reportStagingSection: "التجهيز والشحن",
    reportSortingSection: "عمليات الفرز", reportIssuesSection: "الجودة والنواقص",
    reportHotspotsSection: "أبرز مواقع المشاكل", reportMetTarget: "ساعات حققت المستهدف",
    reportGenerated: "تاريخ التقرير", reportValue: "القيمة", reportPeak: "ساعة الذروة",
    sortingExplanation: "إجمالي كل قسم، وتحته ما يخص كل مخزن بالقطع",
    hourlyReportButton: "تقرير الساعة", hourlyReportTitle: "تنزيل التقرير الساعي لكل الأقسام بصيغة PDF",
    hourlyReportHeading: "التقرير الساعي للعمليات", reportDateLabel: "تاريخ البيانات",
    reportHourLabel: "ساعة التقرير", reportIssuedLabel: "وقت الإصدار", reportPeriodLabel: "الفترة",
    execSummary: "الملخص التنفيذي", pickingSection: "تجهيز الطلبات", lastHourSection: "أداء آخر ساعة",
    lastHourDone: "منجز الساعة", lastHourTarget: "مستهدف الساعة", lastHourRate: "إنجاز الساعة",
    allSectionsHour: "حركة كل الأقسام في آخر ساعة", sectionCol: "القسم", lastHourCol: "آخر ساعة",
    prevHourCol: "الساعة السابقة", changeCol: "التغير", cumulativeCol: "تراكمي حتى الساعة",
    targetToDate: "المستهدف حتى الساعة", gapToDate: "الفرق عن المستهدف", totalWorkforce: "إجمالي العمالة",
    closedQty: "كمية الفرز المنجز", closedTasks: "مهام منجزة", inProgressQty: "كمية قيد الفرز",
    inProgressTasks: "مهام قيد التنفيذ", pendingQty: "كمية معلقة", pendingTasks: "مهام معلقة",
    pendingContainers: "توتات تنتظر الاستيج", pendingPieces: "قطع تنتظر الاستيج",
    stagedContainers: "توتات تم استيجها", stagingRecords: "سجلات الاستيج", readyContainers: "توتات جاهزة للشحن",
    stageCol: "المرحلة", uniqueContainers: "التوتات", recordsUnits: "السجلات / القطع", distribution: "نسبة التوزيع",
    palletCount: "عدد البالتات", totalContainers: "إجمالي التوتات", avgPerPallet: "متوسط التوتات للبالتة",
    statusCol: "الحالة", statusPreparing: "قيد التجهيز",
    metStatus: "محقق", missStatus: "عجز", reportNoData: "لا توجد بيانات",
    hoursOnTarget: "ساعات محققة", issuesHourlySection: "النواقص الساعية", sectionsProgress: "تقدم الأقسام",
    branchStatus: "حالة التوتات والبالتات حسب الفرع", branchCol: "الفرع", onPallet: "على بالتة",
    productivityReportButton: "تقرير الإنتاجية", productivityReportTitle: "تنزيل تقرير مستهدف وإنتاجية الساعات والعمال بصيغة PDF",
    productivityReportHeading: "تقرير إنتاجية التجهيز", hourlyTargetsSection: "إنجاز التجهيز كل ساعة", requiredRemainingSection: "المطلوب والمتبقي لكل مخزن",
    pickersSection: "إنتاجية كل عامل", warehouseBreakdown: "كل مخزن على حدة", actualPerPicker: "فعلي لكل عامل", requiredPerPicker: "مطلوب لكل عامل", baseCol: "أساسي", adjustedCol: "معدّل", actualCol: "فعلي", requiredCol: "مطلوب",
    gapCol: "الفرق", userCol: "اليوزر", nameCol: "الاسم", shiftCol: "الشيفت", shiftMorning: "مورنينج", shiftNight: "نايت", shiftBetween: "بيتوين", warehouseShort: "مخزن", totalShort: "الإجمالي", pickerCol: "العامل", piecesCol: "القطع", hoursCol: "ساعات",
    ippActualAvg: "متوسط الإنتاجية الفعلي", ippRequiredAvg: "متوسط الإنتاجية المطلوب",
    pickersOnTarget: "عمال محققين", pickersBelow: "عمال أقل من المطلوب",
    productivityNote: "في كل خانة: الرقم الأعلى هو المنجز والأسفل هو المطلوب من العامل في الساعة. الأخضر محقق والأحمر أقل من المطلوب، والساعة الجارية لا تدخل في التقييم", hourOpen: "جارية", hourOpenShort: "جارية",
    adjustedTarget: "المستهدف المعدّل", nextHourTarget: "مستهدف الساعة القادمة",
    closedPalletsByBranch: "البالتات المقفولة لكل فرع", recordsWord: "سجل",
    warehouseOutput: "ما أنجزه كل مخزن", pickingDone: "منجز التجهيز",
    batchLastHour: "باتشات آخر ساعة", batchToDate: "باتشات تراكمي",
    toDateCol: "تراكمي", statusClosed: "اتقفل", statusInProgress: "شغالين فيه", statusPending: "متفتحش",
    skippedLastHour: "متخطاة آخر ساعة", skippedToDate: "متخطاة تراكمي",
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
    pageIntro: "A unified view of picking, productivity, tote flow, and quality.",
    sheetDateLabel: "Sheet data date", autoRefresh: "Auto-refresh",
    dailyPerformance: "DAILY PERFORMANCE", mainKpis: "Picking overview",
    lastSync: "Last synced", hourlyTitle: "Hourly productivity",
    hourlySubtitle: "Actual completed vs. hourly target", completed: "Completed",
    target: "Target", hourlyChartLabel: "Hourly productivity chart",
    dailyShift: "Daily shift", planProgress: "Progress to plan",
    planProgressSubtitle: "Completion against the total target",
    performanceComparison: "PERFORMANCE", warehousePerformance: "Warehouse performance",
    navPickers: "Picker productivity", pkEyebrow: "Picker tracking", pkHeadingMain: "Picker", pkHeadingAccent: "productivity",
    pkIntro: "What each picker picked every hour, what was required of them, and whether they met it.", pkSiteUpdate: "Last site update",
    pkKpiPickers: "Pickers worked", pkKpiPickersSub: "across all warehouses", pkKpiActive: "Working this hour", pkKpiActiveSub: "hour in progress",
    pkKpiUnits: "Units picked", pkKpiUnitsSub: "in the hour in progress", pkKpiIph: "Avg units per hour", pkKpiIphSub: "per picker, closed hours",
    pkKpiMet: "On target", pkKpiMissed: "Below target", pkOfScored: "of", pkKpiMissedSub: "picked less than required",
    pkAllWarehouses: "All warehouses", pkAllShifts: "All shifts", pkAllStatus: "All statuses", pkStatusActive: "Working now",
    pkSortLabel: "Sort", pkSortUnits: "Most units", pkSortIph: "Most units/hour", pkSortRate: "Highest achievement", pkSortLow: "Lowest achievement", pkSortName: "By name",
    pkSearch: "Search name or user…", pkTopTitle: "Top performers", pkTopSubtitle: "Top 5 by units per hour",
    pkBottomTitle: "Needs follow-up", pkBottomSubtitle: "Lowest 5 by achievement", pkWarehouseTitle: "Warehouse summary", pkWarehouseSubtitle: "Pickers and output in each warehouse",
    pkTableTitle: "Hourly output by picker", pkTableSubtitle: "In each cell the large figure is units picked and the small one is what was required that hour",
    pkNote: "Required per picker = the warehouse's hourly target ÷ the pickers who worked in it that hour. The hour in progress is not scored yet.",
    pkPicker: "Picker", pkHours: "Hours", pkDone: "Picked", pkRequired: "Required", pkRate: "Achieved", pkPerHour: "units/h",
    pkPickersCol: "Pickers", pkMetCol: "On target", pkMissedCol: "Below", pkNoData: "No picker data yet.", pkNoMatch: "No picker matches the filters.",
    pkShowing: "pickers", pkOf: "of", pkNowOnly: "only worked in the hour in progress",
    pkNoLive: "Site figures are not available right now; they will appear with the next update.",
    pkTimeFilter: "Time filter",
    pkTypeCol: "Picking type", pkAllTypes: "All types", rptByType: "By picking type", rptShare: "Share of hour",
    themeLight: "Day mode", themeDark: "Night mode",
    rptHourMet: "Pickers on target",
    rptHourBanner: "Figures for", rptHourClosed: "This hour is closed", rptHourRunning: "This hour is still running", rptHourDone: "Picked this hour", rptHourTarget: "Target this hour",
    rptHourGap: "Gap to target", rptHourWorkers: "Pickers this hour", rptHourPerPicker: "Units per picker", rptVsPrevious: "Versus the hour before",
    rptHourWarehouses: "Each warehouse this hour", rptRemainingNow: "Remaining now", rptRequiredEach: "Required per picker", rptHourPickers: "Pickers who worked this hour",
    rptPicked: "Picked", rptStopped: "Worked the hour before but not this hour",
    rptRunningNote: "The hour in progress is still running; picked so far from",
    pkExcel: "Download Excel", pkExcelTitle: "Download the picker table as shown, with its filters, as an Excel file", pkExcelFailed: "The Excel file could not be prepared. Please try again.",
    pkRemainingTitle: "Remaining by warehouse", pkRemainingSub: "What is left of the plan and who is working now; click a warehouse to filter",
    pkOfRequired: "of", pkPerActive: "per active picker", pkNoneActive: "nobody working this hour", pkFrom: "From", pkTo: "To",
    pkHourReport: "Hourly report", pkHourReportTitle: "Download the last finished hour: output, who worked and who needs follow-up",
    pkShiftReport: "End of shift", pkShiftReportTitle: "Download the shift report for the selected hours, warehouse and shift",
    rptPickHourHeading: "Hourly Picking Report", rptShiftHeading: "End of Shift Report", rptPeriod: "Period", rptShift: "Shift", rptWarehouse: "Warehouse",
    rptHoursSection: "Units picked each hour", rptRemainingSection: "Remaining by warehouse", rptTopSection: "Top performers", rptBottomSection: "Needs follow-up",
    rptPickersSection: "Each picker in the period", rptLastHourDone: "Picked at", rptCumulative: "Picked in period", rptHoursMet: "Hours on target",
    rptNote: "Figures come from Minutes Central. Required per picker = the warehouse's hourly target ÷ the pickers who worked in it that hour. The hour in progress is not scored.",
    searchWarehouse: "Search warehouses…", warehouse: "Warehouse",
    totalRequired: "Total required", actualCompleted: "Completed",
    remaining: "Remaining", shortages: "OOS", hourlyTarget: "Target / hr",
    completionRate: "Completion", sheetDataNote: "Data shown as provided in the source sheet",
    operationsFlow: "OPERATIONS FLOW", workflowShipping: "Workflow & dispatch",
    workflowSubtitle: "Track units and tasks across operational stages",
    containerPipeline: "Tote pipeline",
    containerPipelineSubtitle: "Tote distribution by operational stage",
    hourlyDispatch: "Hourly dispatch flow",
    hourlyDispatchSubtitle: "Tote movement by hour",
    dispatchChartLabel: "Hourly tote movement chart",
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
    progressRate: "Completion rate", containers: "totes", units: "units",
    totalUnitsRecorded: "Total units recorded",
    noPipelineData: "Tote pipeline details are unavailable.",
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
    chartContainerLabel: "Tote movement",
    hourlyDetails: "Hourly details",
    pickingHourlyDetails: "Hourly picking performance",
    batchWarehouseSummary: "Batch sorting by warehouse",
    batchHourlyDetails: "Hourly output by sorting warehouse",
    crossdockWarehouseSummary: "Cross-dock sorting by warehouse",
    crossdockHourlyDetails: "Hourly cross-dock output by warehouse",
    stagingKpisTitle: "Staging & dispatch metrics",
    dispatchHourlyDetails: "Hourly tote and dispatch flow",
    palletDispatchDetails: "Pallet and tote details by destination",
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
    totalContainerFlow: "Total tote flow",
    destinationCode: "Destination code",
    darkStore: "Dark store",
    palletBarcode: "Pallet barcode",
    stagingLocation: "Staging location",
    destinationPallets: "Destination pallets",
    containersPerPallet: "Totes / pallet",
    percentOfContainers: "Share of totes",
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
    heatmapHint: "Each row = warehouse · each column = hour",
    peakHour: "Peak", avgShort: "Avg", sortHint: "Click to sort",
    reportButton: "PDF report", reportTitle: "Download the performance report as PDF", reportPreparing: "Preparing report…",
    reportKpiSection: "Key metrics", reportHourlySection: "Hourly productivity summary",
    reportWarehouseSection: "Warehouse performance", reportStagingSection: "Staging & dispatch",
    reportSortingSection: "Sorting operations", reportIssuesSection: "Quality & shortages",
    reportHotspotsSection: "Top issue hotspots", reportMetTarget: "hours met target",
    reportGenerated: "Report date", reportValue: "Value", reportPeak: "Peak hour",
    sortingExplanation: "Section totals, with each warehouse listed underneath (units).",
    hourlyReportButton: "Hourly report", hourlyReportTitle: "Download the hourly all-sections report as PDF",
    hourlyReportHeading: "Hourly Operations Report", reportDateLabel: "Data date",
    reportHourLabel: "Report hour", reportIssuedLabel: "Issued at", reportPeriodLabel: "Period",
    execSummary: "Executive summary", pickingSection: "Picking", lastHourSection: "Latest hour performance",
    lastHourDone: "Hour output", lastHourTarget: "Hour target", lastHourRate: "Hour completion",
    allSectionsHour: "All sections in the latest hour", sectionCol: "Section", lastHourCol: "Latest hour",
    prevHourCol: "Previous hour", changeCol: "Change", cumulativeCol: "Total to report hour",
    targetToDate: "Target to report hour", gapToDate: "Gap to target", totalWorkforce: "Total workforce",
    closedQty: "Sorted qty (closed)", closedTasks: "Closed tasks", inProgressQty: "In-progress qty",
    inProgressTasks: "Tasks in progress", pendingQty: "Pending qty", pendingTasks: "Pending tasks",
    pendingContainers: "Awaiting staging", pendingPieces: "Units to stage",
    stagedContainers: "Staged totes", stagingRecords: "Staging records", readyContainers: "Totes ready",
    stageCol: "Stage", uniqueContainers: "Totes", recordsUnits: "Records / units", distribution: "Distribution",
    palletCount: "Pallets", totalContainers: "Totes", avgPerPallet: "Avg totes / pallet",
    statusCol: "Status", statusPreparing: "In preparation",
    metStatus: "Met", missStatus: "Below", reportNoData: "No data",
    hoursOnTarget: "Hours on target", issuesHourlySection: "Hourly shortages", sectionsProgress: "Section progress",
    branchStatus: "Totes & pallets by branch", branchCol: "Branch", onPallet: "On pallet",
    productivityReportButton: "Productivity report", productivityReportTitle: "Download the hourly target and per-picker productivity report as PDF",
    productivityReportHeading: "Picking Productivity Report", hourlyTargetsSection: "Picking output by hour", requiredRemainingSection: "Required and remaining by warehouse",
    pickersSection: "Productivity by picker", warehouseBreakdown: "Warehouse by warehouse", actualPerPicker: "Actual / picker", requiredPerPicker: "Required / picker", baseCol: "Base", adjustedCol: "Adjusted", actualCol: "Actual", requiredCol: "Required",
    gapCol: "Gap", userCol: "User", nameCol: "Name", shiftCol: "Shift", shiftMorning: "Morning", shiftNight: "Night", shiftBetween: "Between", warehouseShort: "WH", totalShort: "Total", pickerCol: "Picker", piecesCol: "Units", hoursCol: "Hours",
    ippActualAvg: "Average actual IPP", ippRequiredAvg: "Average required IPP",
    pickersOnTarget: "Pickers on target", pickersBelow: "Pickers below target",
    productivityNote: "In each cell the top figure is the units picked and the bottom is the units required from the picker that hour. Green met it, red fell short. The hour in progress is not scored.", hourOpen: "In progress", hourOpenShort: "Open",
    adjustedTarget: "Adjusted target", nextHourTarget: "Next hour target",
    closedPalletsByBranch: "Closed pallets by branch", recordsWord: "records",
    warehouseOutput: "Output by warehouse", pickingDone: "Picked",
    batchLastHour: "Batch latest hr", batchToDate: "Batch to date",
    toDateCol: "To date", statusClosed: "Closed", statusInProgress: "In progress", statusPending: "Not opened",
    skippedLastHour: "Skipped latest hr", skippedToDate: "Skipped to date",
  },
};

const $ = (selector) => document.querySelector(selector);
let refreshTimer;
let dashboardData;
let liveData = null;
let liveJobs = null;

// Reads today's LiveJobs rows (the sheet's own date sits next to "today_key" in the header row).
function parseLiveJobs(rows) {
  const header = (rows[0] || []).map((cell) => String(cell ?? "").trim());
  const columns = ["date_key", "hour", "picker", "warehouse", "picking_type", "picked_qty"].map((name) => header.indexOf(name));
  const todayAt = header.indexOf("today_key");
  if (columns.some((index) => index < 0) || todayAt < 0) return null;
  const [day, hour, picker, warehouse, type, picked] = columns;
  const today = textAt(rows[0], todayAt + 1);
  const list = rows.slice(1)
    .filter((row) => textAt(row, day) === today && textAt(row, picker))
    .map((row) => ({ hour: parseNumber(textAt(row, hour)), user: textAt(row, picker), warehouse: textAt(row, warehouse), type: textAt(row, type), picked: parseNumber(textAt(row, picked)) }))
    .filter((row) => row.picked > 0);
  return list.length ? { rows: list } : null;
}

// Reads the Live tab into a lookup of metric by warehouse code ("ALL" for every warehouse together).
function parseLive(rows) {
  const header = (rows[0] || []).map((cell) => String(cell ?? "").trim());
  const metrics = new Map(rows.slice(1).map((row) => [textAt(row, 0), row]));
  if (header[1] !== "ALL" || !metrics.has("total_qty")) return null;
  const columns = new Map(header.map((code, index) => [code, index]));
  return {
    codes: header.slice(2).filter(Boolean),
    value: (metric, code) => {
      const row = metrics.get(metric);
      const index = columns.get(code);
      return row && index !== undefined ? parseNumber(textAt(row, index)) : 0;
    },
  };
}
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
  const hourCells = records.map((row) => `<th scope="col">${escapeHtml(textAt(row, 1))}</th>`).join("");
  const body = warehouses.map(({ header, index }) => {
    const cells = records.map((row) => {
      const value = parseNumber(textAt(row, index));
      const ratio = value / maxValue;
      const classes = ["heat-cell"];
      if (value === 0) classes.push("is-empty");
      else if (ratio > .58) classes.push("on-bright");
      const tip = chartTip(`${header} · ${textAt(row, 1)}`, [[t("totalCompleted"), formatNumber(value)]]);
      return `<td class="${classes.join(" ")}" style="--heat:${heatColor(value > 0 ? .14 + ratio * .86 : 0)}" data-tip="${escapeHtml(tip)}">${formatNumber(value)}</td>`;
    }).join("");
    const rowTotal = records.reduce((sum, row) => sum + parseNumber(textAt(row, index)), 0);
    const totalTip = chartTip(header, [[t("totalCompleted"), formatNumber(rowTotal)]]);
    return `<tr><th scope="row" class="heat-label">${escapeHtml(header)}</th>${cells}<td class="heat-total-cell" data-tip="${escapeHtml(totalTip)}">${formatNumber(rowTotal)}</td></tr>`;
  }).join("");
  const hourTotals = records.map((row) => {
    const value = totalIndex >= 0 ? parseNumber(textAt(row, totalIndex)) : 0;
    return `<td class="heat-total-cell" data-tip="${escapeHtml(chartTip(textAt(row, 1), [[t("totalCompleted"), formatNumber(value)]]))}">${formatNumber(value)}</td>`;
  }).join("");
  const grandTotal = totalIndex >= 0 ? records.reduce((sum, row) => sum + parseNumber(textAt(row, totalIndex)), 0) : 0;
  container.innerHTML = `<div class="heatmap-wrap"><table class="heat-table"><thead><tr><th class="heat-corner-cell"></th>${hourCells}</tr></thead><tbody>${body}</tbody><tfoot><tr><th class="heat-label heat-total-label">${t("overallTotal")}</th>${hourTotals}<td class="heat-total-cell">${formatNumber(grandTotal)}</td></tr></tfoot></table></div><div class="heat-legend"><span>${t("heatmapLegend")}</span><span class="heat-scale"><i>0</i><i class="heat-gradient"></i><i class="heat-max">${formatNumber(maxValue)}</i></span><span class="heat-hint">${t("heatmapHint")}</span></div>`;
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

function reportTable(headers, rows, className = "") {
  const cell = (value) => (value && typeof value === "object" && "html" in value ? value.html : escapeHtml(value ?? "—"));
  return `<table class="report-table${className ? ` ${className}` : ""}"><thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((value, index) => `<td${index === 0 ? ' class="report-strong"' : ""}>${cell(value)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function buildReportDocument(data) {
  const picking = hourlyView(data.pickingHourly)?.records || [];
  const met = picking.filter((row) => parseNumber(textAt(row, 3)) >= parseNumber(textAt(row, hourTargetIndex(data.pickingHourly))) && parseNumber(textAt(row, hourTargetIndex(data.pickingHourly))) > 0).length;
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
  const sortingRows = [[t("batches"), data.batch], [t("crossDock"), data.crossdock]].flatMap(([label, section]) => {
    const total = section?.table?.total || [];
    const figures = (row) => [3, 4, 5].map((index) => reportCell(textAt(row, index)));
    const warehouses = (section?.table?.records || [])
      .filter((row) => [3, 4, 5].some((index) => parseNumber(textAt(row, index)) > 0))
      .map((row) => [{ html: `<span class="report-sub">${escapeHtml(textAt(row, 1))}</span>` }, ...figures(row)]);
    return [[label, ...figures(total).map((value) => ({ html: `<b>${typeof value === "object" ? value.html : escapeHtml(value)}</b>` }))], ...warehouses];
  });
  const issueStats = [
    reportStat(t("skippedPieces"), textAt(data.issueKpis, 1), colors.red),
    reportStat(t("issueReports"), textAt(data.issueKpis, 3), colors.amber),
    reportStat(t("missingPieces"), textAt(data.issueKpis, 5), "#ff9c67"),
    reportStat(t("damagedPieces"), textAt(data.issueKpis, 7), colors.red),
    reportStat(t("expiredPieces"), textAt(data.issueKpis, 9), colors.violet),
    reportStat(t("affectedLocations"), textAt(data.issueKpis, 11), colors.blue),
  ].join("");
  return `<div class="report-doc" lang="${locale}" dir="${locale === "en" ? "ltr" : "rtl"}">
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
      ${reportStat(t("productivityPerHour"), data.main.iph, colors.violet)}
      ${reportStat(t("totalShortages"), data.main.shortages, colors.red)}
    </div></section>
    <section class="report-block"><h2>${t("reportHourlySection")} <em>${escapeHtml(reportPeriodText())}</em></h2><div class="report-stats report-stats-5">
      ${reportStat(t("completed"), formatNumber(periodDone), colors.green)}
      ${reportStat(t("target"), formatNumber(periodTarget), colors.blue)}
      ${reportStat(t("kpiCompletion"), periodTarget > 0 ? `${((periodDone / periodTarget) * 100).toFixed(1)}%` : "—", colors.teal)}
      ${reportStat(t("reportMetTarget"), `${met}`, colors.amber)}
      ${reportStat(peak ? `${t("reportPeak")} · ${translateCell(textAt(peak, 1), "الساعة")}` : t("reportPeak"), peak ? formatNumber(textAt(peak, 3)) : "—", "#c9a227")}
    </div></section>
    <section class="report-block"><h2>${t("reportWarehouseSection")}</h2>
      ${reportTable([t("warehouse"), t("totalRequired"), t("actualCompleted"), t("remaining"), t("shortages"), t("completionRate")], warehouseRows)}
      <p class="report-note">${t("overallTotal")}: ${escapeHtml(textAt(data.warehouseTotal, 2))} ${t("required")} · ${escapeHtml(textAt(data.warehouseTotal, 3))} ${t("done")}</p>
    </section>
    <div class="report-split">
      <section class="report-block"><h2>${t("reportStagingSection")}</h2>${reportTable([t("stagingKpisTitle"), t("reportValue")], stagingRows)}</section>
      <section class="report-block report-sorting-block"><h2>${t("reportSortingSection")}</h2><p class="report-explainer">${t("sortingExplanation")}</p>${reportTable([t("sectionCol"), t("done"), t("inProgress"), t("pending")], sortingRows, "report-sorting-table")}</section>
    </div>
    <section class="report-block"><h2>${t("reportIssuesSection")}</h2><div class="report-stats">${issueStats}</div></section>
    <section class="report-block"><h2>${t("reportHotspotsSection")}</h2>
      ${reportTable([t("location"), t("warehouse"), t("totalQuantity"), t("share")], hotspotRows)}
    </section>
    <footer class="report-foot"><span>noon minutes · ${t("dashboard")}</span><span>${escapeHtml(t("designCredit"))} · ${escapeHtml(generatedAt)}</span></footer>
  </div>`;
}

function reportCell(value) {
  const text = String(value ?? "").trim();
  if (!text || text === "-" || text === "#N/A") return "—";
  if (/^0(?:\.0+)?%?$/.test(text)) return { html: `<span class="report-zero">${escapeHtml(text)}</span>` };
  return text;
}

function reportDataTable({ headers, rows, foot = null, current = -1, className = "", groups = null }) {
  const cell = (value) => (value && typeof value === "object" && "html" in value ? value.html : escapeHtml(value ?? "—"));
  const line = (row) => row.map((value, index) => `<td${index === 0 ? ' class="report-strong"' : ""}>${cell(value)}</td>`).join("");
  const body = rows.length
    ? rows.map((row, index) => `<tr${index === current ? ' class="is-current"' : ""}>${line(row)}</tr>`).join("")
    : `<tr><td colspan="${headers.length}" class="report-empty">${escapeHtml(t("reportNoData"))}</td></tr>`;
  const groupRow = groups ? `<tr class="report-group-row">${groups.map((group) => `<th colspan="${group.span}">${escapeHtml(group.label)}</th>`).join("")}</tr>` : "";
  return `<table class="report-table report-data${className ? ` ${className}` : ""}"><thead>${groupRow}<tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${body}</tbody>${foot && rows.length ? `<tfoot><tr>${line(foot)}</tr></tfoot>` : ""}</table>`;
}

function lastHeaderIndex(table) {
  const headers = table?.headers || [];
  for (let index = headers.length - 1; index >= 0; index -= 1) {
    if (String(headers[index] ?? "").trim()) return index;
  }
  return -1;
}

function latestReportHour(data) {
  const records = hourlyView(data.pickingHourly)?.records || [];
  const active = records.filter((row) => parseNumber(textAt(row, 3)) > 0);
  const row = active[active.length - 1] || records[0];
  return row ? hourValue(textAt(row, 1)) : null;
}

function hourSnapshot(table, valueIndex, reportHour) {
  const records = hourlyView(table)?.records || [];
  if (!records.length || valueIndex < 0 || reportHour === null) return { current: null, previous: null, cumulative: null };
  const at = (hour) => {
    const row = records.find((record) => hourValue(textAt(record, 1)) === hour);
    return row ? parseNumber(textAt(row, valueIndex)) : null;
  };
  const cumulative = records.reduce((sum, row) => {
    const hour = hourValue(textAt(row, 1));
    return hour !== null && hour <= reportHour ? sum + parseNumber(textAt(row, valueIndex)) : sum;
  }, 0);
  return { current: at(reportHour), previous: at(reportHour - 1), cumulative };
}

// Picking lists warehouses as ID01 while sorting and issues use CAIID01; both name the same site.
function warehouseKey(code) {
  return String(code ?? "").trim().replace(/^CAI/i, "");
}

function warehouseHourFigures(table, reportHour) {
  const figures = new Map();
  const totalIndex = lastHeaderIndex(table);
  (table?.headers || []).forEach((header, index) => {
    const key = warehouseKey(header);
    if (!key || index < 2 || index >= totalIndex) return;
    figures.set(key, hourSnapshot(table, index, reportHour));
  });
  return figures;
}

function reportDelta(snapshot, inverse = false) {
  if (snapshot.current === null || snapshot.previous === null) return "—";
  const delta = snapshot.current - snapshot.previous;
  if (delta === 0) return reportCell("0");
  const good = inverse ? delta < 0 : delta > 0;
  return { html: `<span class="report-delta is-${good ? "up" : "down"}">${delta > 0 ? "+" : "−"}${formatNumber(Math.abs(delta))}</span>` };
}

function buildHourlyReportDocument(data) {
  const reportHour = latestReportHour(data);
  const hourText = reportHour === null ? "—" : formatHour(reportHour);
  const now = new Date();
  const issuedAt = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const dateText = data.date || t("unknownDate");
  const heading = t("hourlyReportHeading");
  const chip = (label, value, key = false) => `<div class="report-chip${key ? " is-key" : ""}"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`;
  const block = (title, content) => `<section class="report-block"><h2>${escapeHtml(title)}</h2>${content}</section>`;
  const stats = (items, className = "") => `<div class="report-stats${className ? ` ${className}` : ""}">${items.map(([label, value, accent]) => reportStat(label, value, accent)).join("")}</div>`;
  const number = (value) => (value === null || value === undefined ? "—" : reportCell(formatNumber(value)));

  const pickingRecords = hourlyView(data.pickingHourly)?.records || [];
  const hourTarget = hourTargetIndex(data.pickingHourly);
  const toDate = pickingRecords.filter((row) => {
    const hour = hourValue(textAt(row, 1));
    return hour !== null && reportHour !== null && hour <= reportHour;
  });
  const targetToDate = toDate.reduce((sum, row) => sum + parseNumber(textAt(row, 2)), 0);
  const doneToDate = toDate.reduce((sum, row) => sum + parseNumber(textAt(row, 3)), 0);
  const gap = doneToDate - targetToDate;
  const met = toDate.filter((row) => parseNumber(textAt(row, hourTarget)) > 0 && parseNumber(textAt(row, 3)) >= parseNumber(textAt(row, hourTarget))).length;
  const currentRow = pickingRecords.find((row) => hourValue(textAt(row, 1)) === reportHour) || [];
  const nextRow = pickingRecords.find((row) => hourValue(textAt(row, 1)) === reportHour + 1) || [];

  const sectionRows = [
    [t("pickingSection"), data.pickingHourly, 3, false],
    [t("batches"), data.batchHourly, lastHeaderIndex(data.batchHourly), false],
    [t("crossDock"), data.crossdockHourly, lastHeaderIndex(data.crossdockHourly), false],
    [t("skippedPieces"), data.issueHourly, lastHeaderIndex(data.issueHourly), true],
  ].map(([label, table, index, inverse]) => {
    const snapshot = hourSnapshot(table, index, reportHour);
    return [label, number(snapshot.current), number(snapshot.previous), reportDelta(snapshot, inverse), number(snapshot.cumulative)];
  });

  const sortingProgress = (label, section) => {
    const total = section?.table?.total || [];
    return [label, ...[2, 3, 4, 5, 7].map((index) => reportCell(textAt(total, index)))];
  };
  const progressRows = [
    [t("pickingSection"), reportCell(data.main.target), reportCell(data.main.completed), "—", reportCell(data.main.remaining), reportCell(data.main.completion)],
    sortingProgress(t("batches"), data.batch),
    sortingProgress(t("crossDock"), data.crossdock),
  ];

  const pickingByWarehouse = new Map(data.warehouses.map((row) => [warehouseKey(textAt(row, 1)), row]));
  const batchFigures = warehouseHourFigures(data.batchHourly, reportHour);
  const issueFigures = warehouseHourFigures(data.issueHourly, reportHour);
  const crossdockByWarehouse = new Map((data.crossdock?.table?.records || []).map((row) => [warehouseKey(textAt(row, 1)), row]));
  const warehouseKeys = [...new Set([...pickingByWarehouse.keys(), ...batchFigures.keys(), ...crossdockByWarehouse.keys(), ...issueFigures.keys()])].sort();
  const warehouseRows = warehouseKeys.map((key) => {
    const row = pickingByWarehouse.get(key);
    const crossdock = crossdockByWarehouse.get(key);
    return [
      key,
      row ? reportCell(textAt(row, 3)) : "—",
      row ? { html: reportBar(textAt(row, 7), colors.teal) } : "—",
      number(batchFigures.get(key)?.current), number(batchFigures.get(key)?.cumulative),
      ...[3, 4, 5].map((index) => (crossdock ? reportCell(textAt(crossdock, index)) : "—")),
      number(issueFigures.get(key)?.current), number(issueFigures.get(key)?.cumulative),
    ];
  });
  const warehouseGroups = [
    { label: "", span: 1 }, { label: t("pickingSection"), span: 2 }, { label: t("batches"), span: 2 },
    { label: t("crossDock"), span: 3 }, { label: t("skippedPieces"), span: 2 },
  ];
  const warehouseHeaders = [
    t("warehouse"), t("completed"), t("completionRate"), t("lastHourCol"), t("toDateCol"),
    t("statusClosed"), t("statusInProgress"), t("statusPending"), t("lastHourCol"), t("toDateCol"),
  ];

  const issueStats = stats([
    [t("skippedPieces"), textAt(data.issueKpis, 1), colors.red],
    [t("issueReports"), textAt(data.issueKpis, 3), colors.amber],
    [t("missingPieces"), textAt(data.issueKpis, 5), "#ff9c67"],
    [t("damagedPieces"), textAt(data.issueKpis, 7), colors.red],
    [t("expiredPieces"), textAt(data.issueKpis, 9), colors.violet],
    [t("affectedLocations"), textAt(data.issueKpis, 11), colors.blue],
  ], "report-stats-3");

  const branchLine = (row, first) => [first, ...[3, 4, 5, 6].map((index) => reportCell(textAt(row, index)))];
  const branchRows = data.branchStaging.records.map((row) => branchLine(row, textAt(row, 2) || textAt(row, 1)));
  const branchTotal = data.branchStaging.total;
  const branchHeaders = [t("branchCol"), t("pendingStaging"), t("stagedRelease"), t("onPallet"), t("palletCount")];
  const branchHalf = Math.ceil(branchRows.length / 2);
  const branchTables = `<div class="report-split report-branches">${reportDataTable({ headers: branchHeaders, rows: branchRows.slice(0, branchHalf) })}${branchRows.length > 1 ? reportDataTable({ headers: branchHeaders, rows: branchRows.slice(branchHalf), foot: branchTotal.length ? branchLine(branchTotal, t("overallTotal")) : null }) : ""}</div>`;

  return `<div class="report-doc report-hourly" lang="${locale}" dir="${locale === "en" ? "ltr" : "rtl"}">
    <header class="report-head">
      <img src="assets/noon-minutes-logo.png" alt="noon minutes">
      <div class="report-head-copy"><strong>noon minutes</strong><h1>${escapeHtml(heading)}</h1></div>
      <div class="report-chips">${chip(t("reportDateLabel"), dateText)}${chip(t("reportHourLabel"), hourText, true)}${chip(t("reportIssuedLabel"), issuedAt)}${isHourFilterActive() ? chip(t("reportPeriodLabel"), `${formatHour(hourRange.from)} — ${formatHour(hourRange.to)}`) : ""}</div>
    </header>
    ${block(t("mainKpis"), `${stats([
      [t("kpiRequired"), data.main.target, colors.blue],
      [t("kpiCompleted"), data.main.completed, colors.green],
      [t("kpiRemaining"), data.main.remaining, colors.amber],
      [t("kpiCompletion"), data.main.completion, colors.teal],
      [t("productivityPerHour"), data.main.iph, colors.violet],
      [t("totalShortages"), data.main.shortages, colors.red],
    ])}${stats([
      [t("hourlyTargetShort"), data.main.targetHourly, colors.blue],
      [t("totalWorkforce"), data.main.workers, colors.violet],
      [t("shortageRate"), data.main.shortageRate, colors.red],
      [t("targetToDate"), formatNumber(targetToDate), colors.blue],
      [t("gapToDate"), `${gap > 0 ? "+" : gap < 0 ? "−" : ""}${formatNumber(Math.abs(gap))}`, gap < 0 ? colors.red : colors.green],
      [t("hoursOnTarget"), `${met} / ${toDate.length}`, colors.amber],
    ])}`)}
    ${block(t("lastHourSection"), stats([
      [t("lastHourDone"), textAt(currentRow, 3), colors.green],
      [t("lastHourTarget"), textAt(currentRow, hourTarget), colors.blue],
      [t("lastHourRate"), textAt(currentRow, 6), colors.teal],
      [t("activeStaff"), textAt(currentRow, 4), colors.violet],
      [t("productivityPerHour"), textAt(currentRow, 5), colors.amber],
      [t("nextHourTarget"), textAt(nextRow, hourTarget), colors.red],
    ]))}
    ${block(t("allSectionsHour"), reportDataTable({ headers: [t("sectionCol"), t("lastHourCol"), t("prevHourCol"), t("changeCol"), t("cumulativeCol")], rows: sectionRows }))}
    <div class="report-split">
      ${block(t("sectionsProgress"), reportDataTable({ headers: [t("sectionCol"), t("totalRequired"), t("done"), t("inProgress"), t("remaining"), t("completionRate")], rows: progressRows, className: "report-compact" }))}
      ${block(t("reportIssuesSection"), issueStats)}
    </div>
    ${block(t("warehouseOutput"), reportDataTable({ headers: warehouseHeaders, rows: warehouseRows, groups: warehouseGroups, className: "report-compact" }))}
    ${block(t("branchStatus"), branchTables)}
    <footer class="report-foot"><span>noon minutes · ${escapeHtml(heading)}</span><span>${escapeHtml(t("designCredit"))}</span></footer>
  </div>`;
}

function reportPill(label, tone) {
  return { html: `<span class="report-pill is-${tone}">${escapeHtml(label)}</span>` };
}

function shiftLabel(value) {
  return ({ morning: t("shiftMorning"), night: t("shiftNight"), between: t("shiftBetween") })[String(value).toLowerCase()] || value || "—";
}

// Each warehouse is scored on its own hourly target, shared across the pickers active in it
// that hour. The latest hour is usually still running, so it is listed but kept out of the scoring.
const PICKING_TYPES = [["batch_dynamic", "Batch Dynamic"], ["batch_static", "Batch Static"], ["multi_store_picking", "Multi Store Picking"]];
const PICKING_TYPE_SHORT = { batch_dynamic: "Batch Dynamic", batch_static: "Batch Static", multi_store_picking: "Multi Store" };
// The site's card breakdowns use their own names for each picking type.
const PICKING_TYPE_METRIC = { batch_dynamic: "batch_dynamic", batch_static: "batch_static", multi_store_picking: "multi_store" };

// Picking types a set of units came from, largest first, such as "Batch Dynamic + Multi Store".
function typeLabel(types) {
  if (!types || !types.size) return "—";
  return [...types.entries()].sort((left, right) => right[1] - left[1]).map(([type]) => PICKING_TYPE_SHORT[type] || type).join(" + ");
}

function addTypes(target, source) {
  source?.forEach((units, type) => target.set(type, (target.get(type) || 0) + units));
  return target;
}

// Rebuilds the sheet's picker and warehouse pivots from the LiveJobs rows, keeping only the chosen
// picking types, so every figure on the page can follow the type filter. Names and shifts still come
// from the sheet, which matches users against the attendance list.
function jobPivots(data) {
  if (!liveJobs) return null;
  const types = pickerFilter.types;
  const rows = liveJobs.rows.filter((row) => !types || types.includes(row.type));
  const nameIndex = data.pickers.headers.findIndex((header) => String(header ?? "").trim() === "الاسم");
  const shiftIndex = data.pickers.headers.findIndex((header) => String(header ?? "").trim() === "الشيفت");
  const people = new Map(data.pickers.records.map((record) => [textAt(record, 1).toLowerCase(), [nameIndex >= 0 ? textAt(record, nameIndex) : "", shiftIndex >= 0 ? textAt(record, shiftIndex) : ""]]));
  const hourList = [...new Set(liveJobs.rows.map((row) => row.hour))].sort((left, right) => left - right);
  const perPicker = new Map();
  const perWarehouse = new Map();
  rows.forEach((row) => {
    const pickerKey = `${row.user}|${row.warehouse}`;
    if (!perPicker.has(pickerKey)) perPicker.set(pickerKey, { user: row.user, warehouse: row.warehouse, units: new Map(), types: new Map() });
    const picker = perPicker.get(pickerKey);
    picker.units.set(row.hour, (picker.units.get(row.hour) || 0) + row.picked);
    if (!picker.types.has(row.hour)) picker.types.set(row.hour, new Map());
    addTypes(picker.types.get(row.hour), new Map([[row.type, row.picked]]));
    if (!perWarehouse.has(row.warehouse)) perWarehouse.set(row.warehouse, { units: new Map(), staff: new Map() });
    const warehouse = perWarehouse.get(row.warehouse);
    warehouse.units.set(row.hour, (warehouse.units.get(row.hour) || 0) + row.picked);
    if (!warehouse.staff.has(row.hour)) warehouse.staff.set(row.hour, new Set());
    warehouse.staff.get(row.hour).add(row.user);
  });
  const hours = hourList.map((hour, position) => ({ hour, index: position + 5 }));
  const pickerRecords = [...perPicker.values()].filter((picker) => [...picker.units.values()].some((units) => units > 0)).map((picker) => {
    const [name, shift] = people.get(picker.user.toLowerCase()) || ["", ""];
    return ["", picker.user, picker.warehouse, name, shift, ...hourList.map((hour) => Math.round(picker.units.get(hour) || 0))];
  });
  const pivot = (pick) => ({ headers: [], hours: hours.map(({ hour }, position) => ({ hour, index: position + 2 })), records: [...perWarehouse.entries()].map(([code, warehouse]) => ["", code, ...hourList.map((hour) => pick(warehouse, hour))]) });
  return {
    pickers: { headers: ["", "العامل", "المخزن", "الاسم", "الشيفت", ...hourList.map(String)], hours, records: pickerRecords },
    warehouseHourly: pivot((warehouse, hour) => Math.round(warehouse.units.get(hour) || 0)),
    warehouseStaff: pivot((warehouse, hour) => warehouse.staff.get(hour)?.size || 0),
    typeHours: new Map([...perPicker.values()].map((picker) => [`${picker.user.split("@")[0]}|${warehouseKey(picker.warehouse)}`, picker.types])),
  };
}

// A warehouse's hourly target belongs to all its picking; with some types chosen, the target is
// scaled to those types' share of the warehouse's work today, from the site's own cards.
function typeShare(code) {
  const types = pickerFilter.types;
  if (!types || !liveData) return 1;
  const workOf = (type) => ["picked", "in_progress", "pending"].reduce((total, stage) => total + liveData.value(`${stage}_${PICKING_TYPE_METRIC[type]}`, code), 0);
  const all = PICKING_TYPES.reduce((total, [type]) => total + workOf(type), 0);
  return all ? types.reduce((total, type) => total + workOf(type), 0) / all : 1;
}

function pickerProductivity(data, { allHours = false, from = null, to = null } = {}) {
  const reportHour = latestReportHour(data);
  const hourRows = ((allHours ? data.pickingHourly : hourlyView(data.pickingHourly))?.records || []).filter((row) => {
    const hour = hourValue(textAt(row, 1));
    return hour !== null && reportHour !== null && hour <= reportHour && (from === null || hour >= from) && (to === null || hour <= to);
  });
  const hours = hourRows.map((row) => hourValue(textAt(row, 1)));
  const isOpen = (hour) => hours.length > 1 && hour === reportHour;
  const source = jobPivots(data) || { pickers: data.pickers, warehouseHourly: data.warehouseHourly, warehouseStaff: data.warehouseStaff, typeHours: null };
  const pivotValues = (section, key) => {
    const row = section.records.find((record) => warehouseKey(textAt(record, 1)) === key);
    return new Map(section.hours.map(({ hour, index }) => [hour, row ? parseNumber(textAt(row, index)) : 0]));
  };
  // Warehouses without a plan in the sheet (such as cross-dock ones) still show their output, with no target.
  const planned = new Set(data.warehouses.map((warehouse) => warehouseKey(textAt(warehouse, 1))));
  const unplanned = source.warehouseHourly.records.map((record) => textAt(record, 1)).filter((code) => code && !planned.has(warehouseKey(code)));
  const warehouses = [...data.warehouses, ...unplanned.map((code) => [null, code])].map((warehouse) => {
    const key = warehouseKey(textAt(warehouse, 1));
    const target = planned.has(key) ? parseNumber(textAt(warehouse, 6)) * typeShare(textAt(warehouse, 1)) : 0;
    const units = pivotValues(source.warehouseHourly, key);
    const staff = pivotValues(source.warehouseStaff, key);
    const shares = new Map();
    hours.forEach((hour) => {
      if (!isOpen(hour) && staff.get(hour) && target) shares.set(hour, target / staff.get(hour));
    });
    return { row: planned.has(key) ? warehouse : null, code: textAt(warehouse, 1), key, target, units, staff, shares };
  });
  const sharesOf = new Map(warehouses.map((warehouse) => [warehouse.key, warehouse.shares]));
  const headerIndex = (label) => source.pickers.headers.findIndex((header) => String(header ?? "").trim() === label);
  const nameIndex = headerIndex("الاسم");
  const shiftIndex = headerIndex("الشيفت");
  const pickers = source.pickers.records.map((row) => {
    const warehouse = warehouseKey(textAt(row, 2));
    const shares = sharesOf.get(warehouse) || new Map();
    const typesByHour = source.typeHours?.get(`${textAt(row, 1).split("@")[0]}|${warehouse}`) || new Map();
    const types = new Map();
    const byHour = new Map(source.pickers.hours.map(({ hour, index }) => [hour, parseNumber(textAt(row, index))]));
    let units = 0;
    let worked = 0;
    let share = 0;
    let openUnits = 0;
    const cells = hours.map((hour) => {
      const picked = byHour.get(hour) || 0;
      if (!picked) return null;
      const cellTypes = typesByHour.get(hour) || new Map();
      addTypes(types, cellTypes);
      if (isOpen(hour)) {
        openUnits += picked;
        return { hour, picked, required: 0, open: true, types: cellTypes };
      }
      const required = shares.get(hour) || 0;
      units += picked;
      worked += 1;
      share += required;
      return { hour, picked, required, open: false, met: picked >= required, types: cellTypes };
    });
    const fullName = nameIndex >= 0 ? textAt(row, nameIndex) : "";
    const shiftKey = (shiftIndex >= 0 ? textAt(row, shiftIndex) : "").toLowerCase();
    return {
      user: textAt(row, 1).split("@")[0], fullName, name: fullName.split(/\s+/).slice(0, 2).join(" "),
      shiftKey, shift: shiftLabel(shiftKey), warehouse, cells, units, worked, share, openUnits, types,
      iph: worked ? units / worked : 0, rate: share > 0 ? units / share : 0, met: share > 0 && units >= share,
    };
  });
  return { reportHour, hourRows, hours, isOpen, closedRows: hourRows.filter((row) => !isOpen(hourValue(textAt(row, 1)))), warehouses, pickers };
}

function buildProductivityReportDocument(data) {
  const { reportHour, hourRows, hours, isOpen, closedRows, warehouses, pickers: allPickers } = pickerProductivity(data);
  const hourText = reportHour === null ? "—" : formatHour(reportHour);
  const now = new Date();
  const issuedAt = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const heading = t("productivityReportHeading");
  const chip = (label, value, key = false) => `<div class="report-chip${key ? " is-key" : ""}"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`;
  const status = (met) => reportPill(met ? t("metStatus") : t("missStatus"), met ? "good" : "bad");
  const openPill = () => reportPill(t("hourOpen"), "muted");
  const signed = (value) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${formatNumber(Math.abs(value))}`;
  const figure = (value) => (value ? formatNumber(value) : { html: '<span class="report-zero">0</span>' });

  let hoursMet = 0;
  const hourlyTable = hourRows.map((row) => {
    const hour = hourValue(textAt(row, 1));
    const target = parseNumber(textAt(row, 2));
    const done = parseNumber(textAt(row, 3));
    const met = target > 0 && done >= target;
    if (met && !isOpen(hour)) hoursMet += 1;
    return [
      formatHour(hour), reportCell(textAt(row, 2)), reportCell(textAt(row, 3)),
      { html: `<span class="report-delta is-${done >= target ? "up" : "down"}">${signed(done - target)}</span>` },
      reportCell(textAt(row, 4)), reportCell(textAt(row, 5)),
      isOpen(hour) ? openPill() : target > 0 ? status(met) : "—",
    ];
  });

  const warehouseBlocks = warehouses.map(({ row: warehouse, target, units, staff }) => {
    const line = (label, cell) => [label, ...hours.map(cell)];
    const rows = [
      line(t("completed"), (hour) => figure(units.get(hour) || 0)),
      line(t("activeStaff"), (hour) => figure(staff.get(hour) || 0)),
      line(t("actualPerPicker"), (hour) => (staff.get(hour) ? formatNumber((units.get(hour) || 0) / staff.get(hour)) : "—")),
      line(t("requiredPerPicker"), (hour) => (staff.get(hour) && !isOpen(hour) ? formatNumber(target / staff.get(hour)) : "—")),
      line(t("statusCol"), (hour) => (isOpen(hour) ? openPill() : target > 0 ? status((units.get(hour) || 0) >= target) : "—")),
    ];
    const summary = [
      [t("hourlyTarget"), textAt(warehouse, 6)], [t("totalRequired"), textAt(warehouse, 2)], [t("actualCompleted"), textAt(warehouse, 3)],
      [t("remaining"), textAt(warehouse, 4)], [t("completionRate"), textAt(warehouse, 7)],
    ].map(([label, value]) => `<span><small>${escapeHtml(label)}</small><b>${escapeHtml(value || "—")}</b></span>`).join("");
    return `<section class="report-block report-warehouse"><h2>${escapeHtml(textAt(warehouse, 1))}</h2><div class="report-summary">${summary}</div>${reportDataTable({ headers: [t("time"), ...hours.map(formatHour)], rows, className: "report-hours" })}</section>`;
  }).join("");

  // Each hour's cell is coloured by whether the picker covered their share of that hour.
  const hitCell = (cell) => {
    if (!cell) return "";
    if (cell.open) return { html: `<span class="report-hit is-open"><b>${formatNumber(cell.picked)}</b><small>${escapeHtml(t("hourOpenShort"))}</small></span>` };
    return { html: `<span class="report-hit is-${cell.met ? "good" : "bad"}"><b>${formatNumber(cell.picked)}</b><small>${cell.required ? formatNumber(cell.required) : "—"}</small></span>` };
  };
  const pickers = allPickers.filter((picker) => picker.worked > 0)
    .map((picker) => ({ ...picker, cells: picker.cells.map(hitCell) }))
    .sort((left, right) => left.warehouse.localeCompare(right.warehouse) || right.units - left.units);
  const onTarget = pickers.filter((picker) => picker.met).length;
  // A full shift has too many hour columns for "04:00" to fit, so the label drops the minutes.
  const hourLabel = (hour) => (hours.length > 12 ? String(hour).padStart(2, "0") : formatHour(hour));
  const pickerHeaders = [t("warehouseShort"), t("userCol"), t("nameCol"), t("shiftCol"), ...hours.map(hourLabel), t("totalShort"), t("statusCol")];
  const pickerLine = (picker) => [
    picker.warehouse, picker.user, picker.name || "—", picker.shift, ...picker.cells,
    { html: `<span class="report-hit is-${picker.met ? "good" : "bad"}"><b>${formatNumber(picker.units)}</b><small>${picker.share > 0 ? formatNumber(picker.share) : "—"}</small></span>` }, picker.share > 0 ? status(picker.met) : "—",
  ];
  const sum = (index) => closedRows.reduce((total, row) => total + parseNumber(textAt(row, index)), 0);
  const warehouseLine = (row, first) => [first, ...[2, 3, 5, 4].map((index) => reportCell(textAt(row, index))), { html: reportBar(textAt(row, 7), colors.teal) }];

  return `<div class="report-doc report-hourly report-productivity" lang="${locale}" dir="${locale === "en" ? "ltr" : "rtl"}">
    <header class="report-head">
      <img src="assets/noon-minutes-logo.png" alt="noon minutes">
      <div class="report-head-copy"><strong>noon minutes</strong><h1>${escapeHtml(heading)}</h1></div>
      <div class="report-chips">${chip(t("reportDateLabel"), data.date || t("unknownDate"))}${chip(t("reportHourLabel"), hourText, true)}${chip(t("reportIssuedLabel"), issuedAt)}</div>
    </header>
    <section class="report-block"><h2>${escapeHtml(t("reportKpiSection"))}</h2><div class="report-stats">${[
      [t("hourlyTargetShort"), data.main.targetHourly, colors.blue],
      [t("hoursOnTarget"), `${hoursMet} / ${closedRows.length}`, colors.amber],
      [t("ippActualAvg"), sum(4) > 0 ? formatNumber(sum(3) / sum(4)) : "—", colors.green],
      [t("ippRequiredAvg"), sum(4) > 0 ? formatNumber(sum(2) / sum(4)) : "—", colors.violet],
      [t("pickersOnTarget"), `${onTarget} / ${pickers.length}`, colors.teal],
      [t("pickersBelow"), `${pickers.length - onTarget}`, colors.red],
    ].map(([label, value, accent]) => reportStat(label, value, accent)).join("")}</div></section>
    <section class="report-block"><h2>${escapeHtml(t("requiredRemainingSection"))}</h2>${reportDataTable({
      headers: [t("warehouse"), t("totalRequired"), t("actualCompleted"), t("shortages"), t("remaining"), t("completionRate")],
      rows: data.warehouses.map((row) => warehouseLine(row, textAt(row, 1))),
      foot: data.warehouseTotal.length ? warehouseLine(data.warehouseTotal, t("overallTotal")) : null,
    })}</section>
    <section class="report-block"><h2>${escapeHtml(t("hourlyTargetsSection"))}</h2>${reportDataTable({
      headers: [t("time"), t("targetLabel"), t("completed"), t("gapCol"), t("activeStaff"), "IPP", t("statusCol")],
      rows: hourlyTable,
    })}</section>
    <div class="report-section-title">${escapeHtml(t("warehouseBreakdown"))}</div>
    ${warehouseBlocks}
    <section class="report-block report-pickers"><h2>${escapeHtml(t("pickersSection"))}</h2>${pickers.length
      ? `<div class="report-branches report-matrix">${reportDataTable({ headers: pickerHeaders, rows: pickers.map(pickerLine) })}</div>`
      : reportDataTable({ headers: pickerHeaders, rows: [] })}</section>
    <p class="report-footnote">${escapeHtml(t("productivityNote"))}</p>
    <footer class="report-foot"><span>noon minutes · ${escapeHtml(heading)}</span><span>${escapeHtml(t("designCredit"))}</span></footer>
  </div>`;
}

// Remaining work is a snapshot of now, so it ignores the hour range. It comes from the site's own
// cards: the Pending quantity only (in-progress units already have a picker). Total minus picked
// would also count cancelled units, which never get picked. The sheet's plan is the fallback.
function warehouseRemaining(view, keys = null) {
  const inScope = (key) => !keys || keys.includes(key);
  if (liveData) {
    return liveData.codes.filter((code) => liveData.value("total_qty", code) > 0 && inScope(warehouseKey(code))).map((code) => {
      const required = liveData.value("total_qty", code);
      const done = liveData.value("picked_qty", code);
      const oos = liveData.value("oos", code);
      const active = liveData.value("active_pickers", code);
      const remaining = liveData.value("pending_qty", code);
      return { key: warehouseKey(code), code, required, done, remaining, oos, active, perActive: active ? Math.max(0, remaining - oos) / active : 0 };
    });
  }
  return view.warehouses.filter((item) => item.row && inScope(item.key)).map(({ row, key, code, staff }) => {
    const remaining = parseNumber(textAt(row, 4));
    const active = view.reportHour === null ? 0 : staff.get(view.reportHour) || 0;
    return { key, code, required: parseNumber(textAt(row, 2)), done: parseNumber(textAt(row, 3)), remaining, oos: parseNumber(textAt(row, 5)), active, perActive: active ? remaining / active : 0 };
  });
}

// One line per hour, adding up the chosen warehouses (all of them when keys is null) against their hourly targets.
function hourLines(view, keys = null) {
  const scope = view.warehouses.filter((item) => !keys || keys.includes(item.key));
  return view.hours.map((hour) => {
    const byWarehouse = new Map(view.warehouses.map((item) => [item.key, item.units.get(hour) || 0]));
    const target = scope.reduce((total, item) => total + item.target, 0);
    const done = scope.reduce((total, item) => total + (item.units.get(hour) || 0), 0);
    const staff = scope.reduce((total, item) => total + (item.staff.get(hour) || 0), 0);
    return { hour, open: view.isOpen(hour), target, done, staff, ipp: staff ? done / staff : 0, byWarehouse, met: target > 0 && done >= target };
  });
}

// The sheet has one row per picker and warehouse, so a picker who moved between warehouses
// appears twice; across all warehouses those rows are merged into one person.
function mergePickers(pickers) {
  const byUser = new Map();
  pickers.forEach((picker) => {
    const key = picker.user.toLowerCase();
    byUser.set(key, [...(byUser.get(key) || []), picker]);
  });
  return [...byUser.values()].map((group) => {
    if (group.length === 1) return group[0];
    const cells = group[0].cells.map((_, index) => {
      const parts = group.map((picker) => picker.cells[index]).filter(Boolean);
      if (!parts.length) return null;
      const picked = parts.reduce((total, cell) => total + cell.picked, 0);
      const types = parts.reduce((total, cell) => addTypes(total, cell.types), new Map());
      if (parts.some((cell) => cell.open)) return { hour: parts[0].hour, picked, required: 0, open: true, types };
      const required = parts.reduce((total, cell) => total + cell.required, 0);
      return { hour: parts[0].hour, picked, required, open: false, met: picked >= required, types };
    });
    const closed = cells.filter((cell) => cell && !cell.open);
    const units = closed.reduce((total, cell) => total + cell.picked, 0);
    const share = closed.reduce((total, cell) => total + cell.required, 0);
    const named = group.find((picker) => picker.fullName) || group[0];
    return {
      ...named, warehouse: group.map((picker) => picker.warehouse).join(" / "), warehouses: group.map((picker) => picker.warehouse), cells, units, share,
      types: group.reduce((total, picker) => addTypes(total, picker.types), new Map()),
      worked: closed.length, openUnits: group.reduce((total, picker) => total + picker.openUnits, 0),
      iph: closed.length ? units / closed.length : 0, rate: share > 0 ? units / share : 0, met: share > 0 && units >= share,
    };
  });
}

function pickerScope(view, { keys = null, shift = "all" } = {}) {
  const pickers = view.pickers.filter((picker) => (picker.worked > 0 || picker.openUnits > 0)
    && (!keys || keys.includes(picker.warehouse))
    && (shift === "all" || picker.shiftKey === shift));
  return keys && keys.length === 1 ? pickers : mergePickers(pickers);
}

// The hour the hourly report covers: the latest finished hour up to the page's "to" hour.
function reportHourChoice(view) {
  const closed = view.hours.filter((hour) => !view.isOpen(hour));
  const capped = closed.filter((hour) => pickerFilter.to === null || hour <= pickerFilter.to);
  return capped[capped.length - 1] ?? closed[closed.length - 1] ?? view.hours[view.hours.length - 1] ?? null;
}

// One hour in full: what was picked against target, each warehouse, who worked and who fell short.
function buildHourReportDocument(data) {
  const view = pickerProductivity(data, { allHours: true });
  const hour = reportHourChoice(view);
  const index = view.hours.indexOf(hour);
  const keys = selectedKeys();
  const now = new Date();
  const issuedAt = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const heading = t("rptPickHourHeading");
  const chip = (label, value, key = false) => `<div class="report-chip${key ? " is-key" : ""}"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`;
  const status = (met) => reportPill(met ? t("metStatus") : t("missStatus"), met ? "good" : "bad");
  const signed = (value) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${formatNumber(Math.abs(value))}`;
  const delta = (value) => ({ html: `<span class="report-delta is-${value >= 0 ? "up" : "down"}">${signed(value)}</span>` });
  const figure = (value) => (value ? formatNumber(value) : { html: '<span class="report-zero">0</span>' });
  const percent = (part, whole) => (whole ? `${Math.round((part / whole) * 100)}%` : "—");
  const sum = (items, pick) => items.reduce((total, item) => total + pick(item), 0);
  const nextHour = hour === null ? null : (hour + 1) % 24;

  const lines = hourLines(view, keys);
  const line = lines[index] || { done: 0, target: 0, staff: 0, open: false };
  const previous = index > 0 ? lines[index - 1] : null;
  const running = view.isOpen(hour);
  const pickers = pickerScope(view, { keys });
  const cellAt = (picker) => (index >= 0 ? picker.cells[index] : null);
  // Lowest achievement first, so the pickers who need a word come at the top; unscored ones go last.
  const rateOf = (cell) => (cell.required ? cell.picked / cell.required : Infinity);
  const worked = pickers.filter((picker) => cellAt(picker)?.picked > 0).sort((left, right) => rateOf(cellAt(left)) - rateOf(cellAt(right)) || cellAt(left).picked - cellAt(right).picked);
  const stopped = previous ? pickers.filter((picker) => picker.cells[index - 1]?.picked > 0 && !(cellAt(picker)?.picked > 0)) : [];
  const workers = worked.length;

  const statItems = [
    [t("rptHourDone"), formatNumber(line.done), colors.green],
    [t("rptHourTarget"), line.target ? formatNumber(line.target) : "—", colors.blue],
    [t("rptHourGap"), line.target && !running ? signed(line.done - line.target) : "—", line.done >= line.target ? colors.teal : colors.red],
    [t("pkRate"), line.target ? percent(line.done, line.target) : "—", line.done >= line.target ? colors.teal : colors.red],
    [t("rptHourWorkers"), formatNumber(workers), colors.violet],
    [t("rptHourPerPicker"), workers ? formatNumber(line.done / workers) : "—", colors.amber],
    [t("rptHourMet"), running ? "—" : `${worked.filter((picker) => cellAt(picker).met).length} / ${worked.filter((picker) => cellAt(picker).required > 0).length}`, colors.green],
    [t("rptVsPrevious"), previous ? `${signed(line.done - previous.done)}` : "—", previous && line.done < previous.done ? colors.red : colors.green],
  ];

  const remainingOf = new Map(warehouseRemaining(view, keys).map((item) => [item.key, item]));
  const warehouses = view.warehouses.filter((item) => (!keys || keys.includes(item.key)) && (item.units.get(hour) || item.target || remainingOf.has(item.key)));
  const warehouseLine = (label, done, target, staff, remaining) => [
    label, { html: `<b>${formatNumber(done)}</b>` }, target ? formatNumber(target) : "—", target && !running ? delta(done - target) : "—",
    figure(staff), staff ? formatNumber(done / staff) : "—", staff && target ? formatNumber(target / staff) : "—",
    running ? reportPill(t("hourOpen"), "muted") : target ? status(done >= target) : "—", remaining === null ? "—" : formatNumber(remaining),
  ];
  const warehouseRows = warehouses.map((item) => warehouseLine(item.key, item.units.get(hour) || 0, item.target, item.staff.get(hour) || 0, remainingOf.get(item.key)?.remaining ?? null));
  const warehouseTable = reportDataTable({
    headers: [t("warehouse"), t("rptPicked"), t("targetLabel"), t("gapCol"), t("rptHourWorkers"), t("rptHourPerPicker"), t("rptRequiredEach"), t("statusCol"), t("rptRemainingNow")],
    rows: warehouseRows,
    // "Required per picker" only means something inside one warehouse, so the total leaves it out.
    foot: warehouses.length > 1 ? warehouseLine(t("overallTotal"), line.done, line.target, workers, sum([...remainingOf.values()], (item) => item.remaining)).map((cell, position) => (position === 6 ? "—" : cell)) : null,
  });

  // Each picking type's part of the hour, from the pickers who worked it.
  const byType = new Map();
  worked.forEach((picker) => cellAt(picker).types?.forEach((units, type) => {
    const entry = byType.get(type) || { units: 0, pickers: 0 };
    entry.units += units;
    entry.pickers += 1;
    byType.set(type, entry);
  }));
  const typeTable = byType.size
    ? reportDataTable({
      headers: [t("pkTypeCol"), t("rptPicked"), t("rptHourWorkers"), t("rptHourPerPicker"), t("rptShare")],
      rows: [...byType.entries()].sort((left, right) => right[1].units - left[1].units).map(([type, entry]) => [PICKING_TYPE_SHORT[type] || type, { html: `<b>${formatNumber(entry.units)}</b>` }, formatNumber(entry.pickers), formatNumber(entry.units / entry.pickers), percent(entry.units, line.done)]),
    })
    : "";

  const person = (picker) => ({ html: `<span class="report-person"><b>${escapeHtml(picker.name || picker.user)}</b><small>${escapeHtml(picker.user)}</small></span>` });
  const pickerLine = (picker, position) => {
    const cell = cellAt(picker);
    return [String(position + 1), person(picker), picker.warehouse, picker.shift, typeLabel(cell.types), { html: `<b>${formatNumber(cell.picked)}</b>` },
      cell.required ? formatNumber(cell.required) : "—", cell.required ? percent(cell.picked, cell.required) : "—",
      cell.open ? reportPill(t("hourOpen"), "muted") : cell.required ? status(cell.met) : "—"];
  };
  const workedTable = reportDataTable({
    headers: ["#", t("nameCol"), t("warehouseShort"), t("shiftCol"), t("pkTypeCol"), t("rptPicked"), t("pkRequired"), t("pkRate"), t("statusCol")],
    rows: worked.map(pickerLine),
  });
  const stoppedBlock = stopped.length
    ? `<section class="report-block"><h2>${escapeHtml(t("rptStopped"))}</h2>${reportDataTable({
      headers: ["#", t("nameCol"), t("userCol"), t("warehouseShort"), `${t("rptPicked")} ${formatHour(previous.hour)}`],
      rows: stopped.map((picker, position) => [String(position + 1), picker.name || picker.user, picker.user, picker.warehouse, formatNumber(picker.cells[index - 1].picked)]),
    })}</section>`
    : "";

  const openLine = lines.find((item) => item.open && item.hour !== hour);
  const runningNote = openLine ? `<p class="report-footnote">${escapeHtml(`${t("rptRunningNote")} ${formatHour(openLine.hour)}: ${formatNumber(openLine.done)}`)}</p>` : "";
  const hourText = hour === null ? "—" : `${formatHour(hour)} – ${formatHour(nextHour)}`;
  const banner = `<div class="report-hour-banner"><div><small>${escapeHtml(t("rptHourBanner"))}</small><strong>${escapeHtml(hourText)}</strong></div><span>${escapeHtml(t(running ? "rptHourRunning" : "rptHourClosed"))} · <bdi dir="ltr">${escapeHtml(data.date || "")}</bdi></span></div>`;
  const chips = `${chip(t("reportHourLabel"), hourText, true)}${chip(t("rptWarehouse"), selectionLabel())}${chip(t("pkTypeCol"), typesLabel())}${chip(t("reportIssuedLabel"), issuedAt)}${chip(t("pkSiteUpdate"), data.siteUpdatedAt || "—")}`;

  return `<div class="report-doc report-hourly report-productivity" lang="${locale}" dir="${locale === "en" ? "ltr" : "rtl"}">
    <header class="report-head">
      <img src="assets/noon-minutes-logo.png" alt="noon minutes">
      <div class="report-head-copy"><strong>noon minutes</strong><h1>${escapeHtml(heading)}</h1></div>
      <div class="report-chips">${chips}</div>
    </header>
    ${banner}
    <section class="report-block"><h2>${escapeHtml(t("reportKpiSection"))}</h2><div class="report-stats report-stats-4">${statItems.map(([label, value, accent]) => reportStat(label, value, accent)).join("")}</div></section>
    <section class="report-block"><h2>${escapeHtml(t("rptHourWarehouses"))}</h2>${warehouseTable}</section>
    ${typeTable ? `<section class="report-block"><h2>${escapeHtml(t("rptByType"))}</h2>${typeTable}</section>` : ""}
    ${stoppedBlock}
    <section class="report-block"><h2>${escapeHtml(`${t("rptHourPickers")} (${workers})`)}</h2>${workedTable}</section>
    ${runningNote}
    <p class="report-footnote">${escapeHtml(t("rptNote"))}</p>
    <footer class="report-foot"><span>noon minutes · ${escapeHtml(heading)} · ${escapeHtml(hourText)}</span><span>${escapeHtml(t("designCredit"))}</span></footer>
  </div>`;
}

// The end-of-shift report follows the picker page's hour range, warehouses and shift.
function buildShiftReportDocument(data) {
  const view = pickerProductivity(data, { allHours: true, from: pickerFilter.from, to: pickerFilter.to });
  const { hours } = view;
  const scopeKeys = selectedKeys();
  const now = new Date();
  const issuedAt = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const heading = t("rptShiftHeading");
  const chip = (label, value, key = false) => `<div class="report-chip${key ? " is-key" : ""}"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`;
  const status = (met) => reportPill(met ? t("metStatus") : t("missStatus"), met ? "good" : "bad");
  const signed = (value) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${formatNumber(Math.abs(value))}`;
  const figure = (value) => (value ? formatNumber(value) : { html: '<span class="report-zero">0</span>' });
  const sum = (items, pick) => items.reduce((total, item) => total + pick(item), 0);

  const lines = hourLines(view, scopeKeys);
  const closed = lines.filter((line) => !line.open);
  const hoursScored = closed.filter((line) => line.target > 0).length;
  const hoursMet = closed.filter((line) => line.met).length;
  // With more than one warehouse chosen, each gets its own column next to the total.
  const inScope = view.warehouses.filter((item) => (!scopeKeys || scopeKeys.includes(item.key)) && lines.some((line) => line.byWarehouse.get(item.key)));
  const keys = inScope.length > 1 ? inScope.map((item) => item.key) : [];
  const hourHeaders = [t("time"), ...keys, keys.length ? t("totalShort") : t("completed"), t("targetLabel"), t("gapCol"), t("activeStaff"), "IPP", t("statusCol")];
  const hourRows = lines.map((line) => [
    formatHour(line.hour), ...keys.map((key) => figure(line.byWarehouse.get(key))), { html: `<b>${formatNumber(line.done)}</b>` },
    line.target ? formatNumber(line.target) : "—",
    line.open || !line.target ? "—" : { html: `<span class="report-delta is-${line.done >= line.target ? "up" : "down"}">${signed(line.done - line.target)}</span>` },
    figure(line.staff), line.staff ? formatNumber(line.ipp) : "—",
    line.open ? reportPill(t("hourOpen"), "muted") : line.target ? status(line.met) : "—",
  ]);
  const closedTarget = sum(closed, (line) => line.target);
  const closedDone = sum(closed, (line) => line.done);
  const closedStaff = sum(closed, (line) => line.staff);
  const hourFoot = [
    t("overallTotal"), ...keys.map((key) => formatNumber(sum(lines, (line) => line.byWarehouse.get(key)))), formatNumber(sum(lines, (line) => line.done)),
    formatNumber(closedTarget), closedTarget ? signed(closedDone - closedTarget) : "—", "—", closedStaff ? formatNumber(closedDone / closedStaff) : "—", `${hoursMet} / ${hoursScored}`,
  ];

  const remaining = warehouseRemaining(view, scopeKeys);
  const remainingLine = (label, item) => [label, formatNumber(item.required), formatNumber(item.done), { html: `<b>${formatNumber(item.remaining)}</b>` }, figure(item.oos), { html: reportBar(item.required ? `${Math.round((item.done / item.required) * 100)}%` : "0%", colors.teal) }, figure(item.active), item.active ? formatNumber(item.perActive) : "—"];
  const remainingTotal = { required: sum(remaining, (item) => item.required), done: sum(remaining, (item) => item.done), remaining: sum(remaining, (item) => item.remaining), oos: sum(remaining, (item) => item.oos), active: sum(remaining, (item) => item.active) };
  remainingTotal.perActive = remainingTotal.active ? Math.max(0, remainingTotal.remaining - remainingTotal.oos) / remainingTotal.active : 0;
  const remainingTable = reportDataTable({
    headers: [t("warehouse"), t("totalRequired"), t("actualCompleted"), t("remaining"), "OOS", t("completionRate"), t("pkStatusActive"), t("pkPerActive")],
    rows: remaining.map((item) => remainingLine(item.key, item)),
    foot: remaining.length > 1 ? remainingLine(t("overallTotal"), remainingTotal) : null,
  });

  const pickers = pickerScope(view, { keys: scopeKeys, shift: pickerFilter.shift });
  const scored = pickers.filter((picker) => picker.share > 0);
  const met = scored.filter((picker) => picker.met).length;
  const units = sum(pickers, (picker) => picker.units);
  const openUnits = sum(pickers, (picker) => picker.openUnits);
  const pickerHours = sum(pickers, (picker) => picker.worked);
  const active = remainingTotal.active;
  const statItems = [
    [t("pkKpiActive"), formatNumber(active), colors.blue],
    [t("pkKpiUnits"), formatNumber(units + openUnits), colors.green],
    [t("pkKpiIph"), pickerHours ? formatNumber(units / pickerHours) : "—", colors.violet],
    [t("pkKpiMet"), `${met} / ${scored.length}`, colors.teal],
    [t("pkKpiMissed"), formatNumber(scored.length - met), colors.red],
    [t("rptHoursMet"), `${hoursMet} / ${hoursScored}`, colors.amber],
  ];

  const hitCell = (cell) => {
    if (!cell) return "";
    if (cell.open) return { html: `<span class="report-hit is-open"><b>${formatNumber(cell.picked)}</b><small>${escapeHtml(t("hourOpenShort"))}</small></span>` };
    return { html: `<span class="report-hit is-${cell.met ? "good" : "bad"}"><b>${formatNumber(cell.picked)}</b><small>${cell.required ? formatNumber(cell.required) : "—"}</small></span>` };
  };
  const hourLabel = (hour) => (hours.length > 12 ? String(hour).padStart(2, "0") : formatHour(hour));
  const pickerMatrix = reportDataTable({
    headers: [t("warehouseShort"), t("userCol"), t("nameCol"), t("shiftCol"), t("pkTypeCol"), ...hours.map(hourLabel), t("totalShort"), t("statusCol")],
    rows: pickers.slice().sort((left, right) => left.warehouse.localeCompare(right.warehouse) || right.units + right.openUnits - left.units - left.openUnits).map((picker) => [
      picker.warehouse, picker.user, picker.name || "—", picker.shift, typeLabel(picker.types), ...picker.cells.map(hitCell),
      { html: `<span class="report-hit is-${picker.met ? "good" : "bad"}"><b>${formatNumber(picker.units + picker.openUnits)}</b><small>${picker.share > 0 ? formatNumber(picker.share) : "—"}</small></span>` },
      picker.share > 0 ? status(picker.met) : picker.openUnits ? reportPill(t("hourOpen"), "muted") : "—",
    ]),
  });

  const period = hours.length ? `${formatHour(hours[0])} – ${formatHour(hours[hours.length - 1])}` : "—";
  const chips = `${chip(t("reportDateLabel"), data.date || t("unknownDate"))}${chip(t("rptPeriod"), period, true)}${chip(t("rptWarehouse"), selectionLabel())}${chip(t("rptShift"), pickerFilter.shift === "all" ? t("pkAllShifts") : shiftLabel(pickerFilter.shift))}${chip(t("pkTypeCol"), typesLabel())}${chip(t("reportIssuedLabel"), issuedAt)}`;

  return `<div class="report-doc report-hourly report-productivity" lang="${locale}" dir="${locale === "en" ? "ltr" : "rtl"}">
    <header class="report-head">
      <img src="assets/noon-minutes-logo.png" alt="noon minutes">
      <div class="report-head-copy"><strong>noon minutes</strong><h1>${escapeHtml(heading)}</h1></div>
      <div class="report-chips">${chips}</div>
    </header>
    <section class="report-block"><h2>${escapeHtml(t("reportKpiSection"))}</h2><div class="report-stats">${statItems.map(([label, value, accent]) => reportStat(label, value, accent)).join("")}</div></section>
    <section class="report-block"><h2>${escapeHtml(t("rptHoursSection"))}</h2>${reportDataTable({ headers: hourHeaders, rows: hourRows, foot: hourFoot, current: lines.findIndex((line) => line.open) })}</section>
    <section class="report-block"><h2>${escapeHtml(t("rptRemainingSection"))}</h2>${remainingTable}</section>
    <section class="report-block report-pickers"><h2>${escapeHtml(t("rptPickersSection"))}</h2><div class="report-branches report-matrix">${pickerMatrix}</div></section>
    <p class="report-footnote">${escapeHtml(t("rptNote"))}</p>
    <footer class="report-foot"><span>noon minutes · ${escapeHtml(heading)}</span><span>${escapeHtml(t("designCredit"))}</span></footer>
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

const XLSX_LIBRARY_URL = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
let xlsxLibraryPromise;

function ensureXlsxLibrary() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  if (xlsxLibraryPromise) return xlsxLibraryPromise;
  xlsxLibraryPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = XLSX_LIBRARY_URL;
    script.onload = () => (window.XLSX ? resolve(window.XLSX) : reject(new Error("Excel writer missing")));
    script.onerror = () => {
      xlsxLibraryPromise = null;
      reject(new Error("Excel writer failed to load"));
    };
    document.body.appendChild(script);
  });
  return xlsxLibraryPromise;
}

// Saves the picker table exactly as filtered and sorted on the page, plus the hour-by-warehouse output.
async function exportPickersExcel() {
  const button = $("#pickerExcelButton");
  if (!pickerExport || button.disabled) return;
  const label = button.querySelector(".report-button-label");
  button.disabled = true;
  button.classList.add("is-loading");
  label.textContent = t("reportPreparing");
  try {
    const XLSX = await ensureXlsxLibrary();
    const { list, hours, lines, columns } = pickerExport;
    const period = hours.length ? `${formatHour(hours[0])} – ${formatHour(hours[hours.length - 1])}` : "—";
    const intro = [
      [t("pkTableTitle")],
      [t("reportDateLabel"), dashboardData?.date || ""],
      [t("rptPeriod"), period],
      [t("rptWarehouse"), selectionLabel()],
      [t("pkTypeCol"), typesLabel()],
      [t("pkSiteUpdate"), dashboardData?.siteUpdatedAt || ""],
      [],
    ];
    const status = (picker) => (picker.share > 0 ? t(picker.met ? "metStatus" : "missStatus") : picker.openUnits ? t("hourOpen") : "");
    const header = ["#", t("nameCol"), t("userCol"), t("warehouse"), t("shiftCol"), t("pkTypeCol"), t("pkHours"), t("pkDone"), t("pkRequired"), t("pkRate"), t("pkPerHour"), t("statusCol"),
      ...hours.flatMap((hour) => [`${formatHour(hour)} ${t("pkDone")}`, `${formatHour(hour)} ${t("pkRequired")}`])];
    const rows = list.map((picker, index) => [
      index + 1, picker.fullName || picker.name || "", picker.user, picker.warehouse, picker.shift === "—" ? "" : picker.shift, typeLabel(picker.types), picker.worked,
      Math.round(picker.units + picker.openUnits), picker.share > 0 ? Math.round(picker.share) : "", picker.share > 0 ? picker.rate : "",
      picker.worked ? Math.round(picker.iph) : "", status(picker),
      ...picker.cells.flatMap((cell) => (cell ? [Math.round(cell.picked), cell.open ? t("hourOpen") : cell.required ? Math.round(cell.required) : ""] : ["", ""])),
    ]);
    const pickerSheet = XLSX.utils.aoa_to_sheet([...intro, header, ...rows]);
    // The achievement column is stored as a fraction so Excel can sort and chart it; it shows as a percentage.
    rows.forEach((row, index) => {
      const cell = pickerSheet[XLSX.utils.encode_cell({ r: intro.length + 1 + index, c: 9 })];
      if (cell && typeof cell.v === "number") cell.z = "0%";
    });
    pickerSheet["!cols"] = [{ wch: 4 }, { wch: 30 }, { wch: 14 }, { wch: 10 }, { wch: 10 }, { wch: 26 }, { wch: 7 }, { wch: 9 }, { wch: 9 }, { wch: 9 }, { wch: 9 }, { wch: 10 }, ...hours.flatMap(() => [{ wch: 9 }, { wch: 9 }])];

    const hourHeader = [t("time"), ...columns, t("totalShort"), t("targetLabel"), t("gapCol"), t("activeStaff"), "IPP", t("statusCol")];
    const hourRows = lines.map((line) => [
      formatHour(line.hour), ...columns.map((key) => Math.round(line.byWarehouse.get(key) || 0)), Math.round(line.done), line.target ? Math.round(line.target) : "",
      line.open || !line.target ? "" : Math.round(line.done - line.target), line.staff, line.staff ? Math.round(line.ipp) : "",
      line.open ? t("hourOpen") : line.target ? t(line.met ? "metStatus" : "missStatus") : "",
    ]);
    const hourSheet = XLSX.utils.aoa_to_sheet([[t("rptHoursSection")], [t("rptWarehouse"), selectionLabel()], [], hourHeader, ...hourRows]);
    hourSheet["!cols"] = hourHeader.map((_, index) => ({ wch: index ? 10 : 8 }));

    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, pickerSheet, locale === "ar" ? "البيكرز" : "Pickers");
    XLSX.utils.book_append_sheet(book, hourSheet, locale === "ar" ? "كل ساعة" : "Hourly");
    if (locale === "ar") book.Workbook = { Views: [{ RTL: true }] };
    const pad = (hour) => String(hour ?? "").padStart(2, "0");
    XLSX.writeFile(book, `noon-pickers-${reportStamp()}-${pad(hours[0])}00-${pad(hours[hours.length - 1])}00.xlsx`);
  } catch (error) {
    console.error("Excel export failed:", error);
    alert(t("pkExcelFailed"));
  } finally {
    label.textContent = t("pkExcel");
    button.disabled = false;
    button.classList.remove("is-loading");
  }
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

// html2canvas drops the space before the last word of right-to-left text; non-breaking spaces keep each run in one piece.
function keepReportSpaces(root) {
  if (!root || typeof document.createTreeWalker !== "function") return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    // Branch column headers are narrow and must stay free to wrap onto two lines.
    if (node.parentElement?.closest(".report-branches thead")) continue;
    node.nodeValue = node.nodeValue.replace(/(\S) (?=\S)/g, "$1 ");
  }
}

function printReport() {
  document.body.classList.add("printing-report");
  window.addEventListener("afterprint", () => document.body.classList.remove("printing-report"), { once: true });
  window.print();
}

function numberReportPages(pdf) {
  const pages = pdf.internal.getNumberOfPages();
  if (pages < 2) return;
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  pdf.setFontSize(7.5);
  pdf.setTextColor(125, 140, 165);
  for (let page = 1; page <= pages; page += 1) {
    pdf.setPage(page);
    pdf.text(`${page} / ${pages}`, width / 2, height - 3.5, { align: "center" });
  }
}

let reportBusy = false;

async function exportReport({ buttonSelector, labelKey, buildDocument, filename, pagebreak }) {
  const button = $(buttonSelector);
  if (!dashboardData || reportBusy || !button) return;
  const container = getReportContainer();
  if (!container) return;
  const label = button.querySelector(".report-button-label");
  const previousLabel = label?.textContent || "";
  reportBusy = true;
  button.disabled = true;
  button.classList.add("is-loading");
  if (label) label.textContent = t("reportPreparing");
  container.innerHTML = buildDocument(dashboardData);
  if (locale === "ar") keepReportSpaces(container);
  try {
    const html2pdf = await ensurePdfLibrary();
    await html2pdf().set({
      margin: [6, 6, 9, 6],
      filename,
      image: { type: "jpeg", quality: .96 },
      html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false, scrollX: 0, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak,
    }).from(container.firstElementChild).toPdf().get("pdf").then(numberReportPages).save();
  } catch (error) {
    console.error("PDF report failed:", error);
    printReport();
  } finally {
    if (label) label.textContent = previousLabel || t(labelKey);
    reportBusy = false;
    button.disabled = false;
    button.classList.remove("is-loading");
  }
}

function reportStamp() {
  return (dashboardData?.date || "").replace(/[^\w-]/g, "") || "latest";
}

function generatePdfReport() {
  return exportReport({
    buttonSelector: "#reportButton",
    labelKey: "reportButton",
    buildDocument: buildReportDocument,
    filename: `noon-operations-report-${reportStamp()}.pdf`,
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  });
}

function generateHourlyReport() {
  const hour = dashboardData ? latestReportHour(dashboardData) : null;
  return exportReport({
    buttonSelector: "#hourlyReportButton",
    labelKey: "hourlyReportButton",
    buildDocument: buildHourlyReportDocument,
    filename: `noon-hourly-report-${reportStamp()}-${hour === null ? "latest" : `${String(hour).padStart(2, "0")}00`}.pdf`,
    pagebreak: { mode: ["css", "legacy"], avoid: ["tr", ".report-stats", ".report-block h2"] },
  });
}

function generateProductivityReport() {
  const hour = dashboardData ? latestReportHour(dashboardData) : null;
  return exportReport({
    buttonSelector: "#productivityReportButton",
    labelKey: "productivityReportButton",
    buildDocument: buildProductivityReportDocument,
    filename: `noon-productivity-report-${reportStamp()}-${hour === null ? "latest" : `${String(hour).padStart(2, "0")}00`}.pdf`,
    pagebreak: { mode: ["css", "legacy"], avoid: ["tr", ".report-stats", ".report-block h2", ".report-warehouse"] },
  });
}

function generatePickerHourReport() {
  const hour = dashboardData ? reportHourChoice(pickerProductivity(dashboardData, { allHours: true })) : null;
  return exportReport({
    buttonSelector: "#pickerHourReportButton",
    labelKey: "pkHourReport",
    buildDocument: buildHourReportDocument,
    filename: `noon-picking-hour-${reportStamp()}-${hour === null ? "latest" : `${String(hour).padStart(2, "0")}00`}.pdf`,
    pagebreak: { mode: ["css", "legacy"], avoid: ["tr", ".report-stats", ".report-block h2"] },
  });
}

function generatePickerShiftReport() {
  const pad = (hour) => (hour === null ? "" : String(hour).padStart(2, "0"));
  return exportReport({
    buttonSelector: "#pickerShiftReportButton",
    labelKey: "pkShiftReport",
    buildDocument: buildShiftReportDocument,
    filename: `noon-shift-report-${reportStamp()}-${pad(pickerFilter.from)}00-${pad(pickerFilter.to)}00.pdf`,
    pagebreak: { mode: ["css", "legacy"], avoid: ["tr", ".report-stats", ".report-block h2"] },
  });
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
    if (header.includes("المستهدف المعد")) {
      // Carried shortfalls repeat across hours, so the period's target stays the base plan.
      total[index] = formatNumber(sumColumn(targetIndex));
      return;
    }
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

// The sheet rolls each hour's shortfall into the next hour's target in its own column; older layouts only have the base target.
function hourTargetIndex(table) {
  const index = (table?.headers || []).findIndex((header) => String(header ?? "").includes("المستهدف المعد"));
  return index >= 0 ? index : 2;
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
  syncThemeButton();
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

// The sheet says "حاويات"; the floor calls them totes.
function toteWording(text) {
  return String(text).replace(/الحاويات/g, "التوتات").replace(/حاويات/g, "توتات");
}

function translateHeader(header) {
  const mappings = [
    ["الساعة", "time"], ["المستهدف المعد", "adjustedTarget"], ["المستهدف", "targetLabel"], ["المنجز", "actual"],
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
  if (!mapping) return toteWording(normalized);
  if (locale === "ar") {
    if (normalized.includes("المنجز (Closed)")) return "المنجز (Closed)";
    if (normalized.includes("المتبقي (Pending)")) return "المتبقي (Pending)";
    if (normalized.includes("بانتظار الاستيج")) return "بانتظار الاستيج (Pending)";
    if (normalized.includes("تم الاستيج")) return "تم الاستيج (Release)";
    if (normalized.includes("جاهزة للشحن")) return "جاهزة للشحن (Dispatch)";
    return toteWording(normalized);
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
    return `<td class="${identifier ? "code-cell" : numeric ? `numeric${/^0(?:\.0+)?%?$/.test(value) ? " is-zero" : ""}` : ""}">${escapeHtml(value)}</td>`;
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

function netRemaining(remaining, shortages) {
  if (!remaining) return "";
  return formatNumber(Math.max(0, parseNumber(remaining) - parseNumber(shortages)));
}

function mainMetrics(rows) {
  const header = findRow(rows, (row) => rowHas(row, "إجمالي المطلوب") && rowHas(row, "نسبة الإنجاز العامة"));
  const values = valuesAfterHeader(rows, header);
  if (header < 0 || values.length < 8) throw new Error(t("parseFailed"));
  const annotations = valuesAfterHeader(rows, header + 1);
  const shortages = textAt(values, 11);
  return {
    target: textAt(values, 1),
    completed: textAt(values, 3),
    remaining: netRemaining(textAt(values, 5), shortages),
    completion: textAt(values, 7),
    iph: textAt(values, 9),
    targetHourly: (textAt(annotations, 1).match(/\d[\d,]*/) || [])[0] || "",
    workers: (textAt(annotations, 9).match(/\d[\d,]*/) || [])[0] || "",
    shortages,
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

// The sheet pivots these tables by hour: one row per key, one column per hour of the day.
function pivotSection(rows, label) {
  const header = findRow(rows, (row) => textAt(row, 1) === label);
  if (header < 0) return { headers: [], hours: [], records: [] };
  const hours = rows[header].map((cell, index) => ({ hour: hourValue(cell), index })).filter(({ hour, index }) => index >= 2 && hour !== null);
  const records = [];
  for (let index = header + 1; index < rows.length && textAt(rows[index], 1); index += 1) records.push(rows[index]);
  return { headers: rows[header], hours, records };
}

// Branches are keyed by name: a branch with no code yet still has a row.
function branchSection(rows) {
  const header = findRow(rows, (row) => textAt(row, 1) === "كود الفرع" && textAt(row, 2) === "اسم الفرع");
  const records = [];
  let total = [];
  if (header < 0) return { records, total };
  for (let index = header + 1; index < rows.length; index += 1) {
    if (textAt(rows[index], 1).startsWith("الإجمالي العام")) {
      total = rows[index];
      break;
    }
    if (textAt(rows[index], 2)) records.push(rows[index]);
  }
  return { records, total };
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
  const branchStaging = branchSection(rows);
  const pickers = pivotSection(rows, "العامل");
  const siteUpdateRow = rows.find((row) => row.some((cell) => cell === "آخر تحديث من الموقع")) || [];
  const siteUpdatedAt = textAt(siteUpdateRow, siteUpdateRow.indexOf("آخر تحديث من الموقع") + 1);
  const warehouseHourly = pivotSection(rows, "مخزن التجهيز");
  const warehouseStaff = pivotSection(rows, "عمالة المخزن");
  const pickIssueSection = locateSection(rows, "مؤشرات مشاكل ونواقص تجهيز الطلبات");
  const expirySection = locateSection(rows, "منتهية الصلاحية (Expired)");
  const issueTotalLine = rows.find((row) => row.some((cell) => cell === "إجمالي أعلى 8 مواقع"));
  const hotspotTotal = issueTotalLine || [];

  if (  !warehouses.records.length || !pickingHourly.records.length) {
    throw new Error(t("layoutChanged"));
  }

  return {
    main,
    warehouses: warehouses.records.map((row) => row.map((cell, index) => (index === 4 ? netRemaining(textAt(row, 4), textAt(row, 5)) : cell))),
    warehouseTotal: warehouses.total.map((cell, index) => (index === 4 ? netRemaining(textAt(warehouses.total, 4), textAt(warehouses.total, 5)) : cell)),
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
    branchStaging,
    pickers,
    siteUpdatedAt,
    warehouseHourly,
    warehouseStaff,
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
  $("#hourlyChart").innerHTML = renderBarChart(rows, { labelIndex: 1, actualIndex: 3, targetIndex: hourTargetIndex(data.pickingHourly), activeIndex: 4 });
  const met = rows.filter((row) => parseNumber(textAt(row, 3)) >= parseNumber(textAt(row, hourTargetIndex(data.pickingHourly))) && parseNumber(textAt(row, hourTargetIndex(data.pickingHourly))) > 0).length;
  $("#hourlyNote").textContent = `${met} ${t("metHours")}`;
  $("#dispatchChart").innerHTML = renderAreaChart(dispatchRows, { labelIndex: 1, valueIndex: 7 });
  renderDataTable("#pickingHourlyTable", t("pickingHourlyDetails"), data.pickingHourly, { hourly: true });
  renderDataTable("#dispatchHourlyTable", t("dispatchHourlyDetails"), data.dispatchHourly, { hourly: true });
  renderDataTable("#issueHourlyTable", t("issuesHourlyDetails"), data.issueHourly, { hourly: true });
  renderDataTable("#hotspotFullTable", t("hotspotDetails"), data.hotspotTable);
  renderPalletTable(data);
  renderStagingMetrics(data);
  renderSortingTables(data);
}

// Branches with closed pallets come first; the per-branch tote breakdown stays in the hourly report.
function renderPalletTable(data) {
  const rows = (data.branchStaging.records.length
    ? data.branchStaging.records.map((row) => [textAt(row, 2), textAt(row, 6)])
    : data.palletTable.records.map((row) => [textAt(row, 2), textAt(row, 3)]))
    .sort((left, right) => parseNumber(right[1]) - parseNumber(left[1]) || left[0].localeCompare(right[0]));
  const total = rows.reduce((sum, row) => sum + parseNumber(row[1]), 0);
  const body = rows.map(([name, count]) => `<tr><td class="code-cell">${escapeHtml(name)}</td><td class="numeric${parseNumber(count) ? "" : " is-zero"}">${escapeHtml(count || "0")}</td></tr>`).join("")
    || `<tr><td colspan="2" class="empty-state">${t("noChartData")}</td></tr>`;
  $("#palletTable").innerHTML = `<article class="panel table-panel detail-panel"><div class="panel-heading detail-heading"><div><span class="panel-icon blue">▤</span><div><h3>${t("closedPalletsByBranch")}</h3><p>${t("sheetDataNote")}</p></div></div></div><div class="table-scroll detail-table-scroll"><table><thead><tr><th>${t("branchCol")}</th><th>${t("closedPallets")}</th></tr></thead><tbody>${body}</tbody><tfoot><tr><td>${t("overallTotal")}</td><td class="numeric">${formatNumber(total)}</td></tr></tfoot></table></div></article>`;
}

// One table per sorting type; the hour-by-hour breakdown per warehouse lives in the heatmap right below.
function renderSortingTables(data) {
  const sections = [
    { title: t("batchWarehouseSummary"), summary: data.batch?.table },
    { title: t("crossdockWarehouseSummary"), summary: data.crossdock?.table },
  ];
  $("#sortingTables").innerHTML = sections.map(() => '<div class="embedded-table"></div>').join("");
  const embedded = $("#sortingTables").querySelectorAll(".embedded-table");
  sections.forEach((section, index) => renderDataTable(embedded[index], section.title, section.summary));
}

function renderStagingMetrics(data) {
  const section = data.stagingMetrics;
  if (!section) {
    $("#stagingKpis").innerHTML = "";
    return;
  }
  const metricDefinitions = [
    { header: "حاويات بانتظار الاستيج", label: t("pendingStaging"), color: colors.amber },
    { header: "إجمالي قطع بانتظار الاستيج", label: t("pendingPieces"), color: colors.blue },
    { header: "حاويات تم استيجها (Release)", label: t("stagedRelease"), color: colors.teal },
    { header: "سجلات الاستيج للإفراج", label: t("stagingRecords"), color: colors.violet },
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
  const stageNames = [t("pendingStaging"), t("stagedRelease"), t("readyDispatch")];
  $("#pipelineContent").innerHTML = data.pipeline.length ? `<div class="pipeline-stages">${data.pipeline.map((row, index) => {
    const percent = parseNumber(textAt(row, 6));
    const stageName = stageNames[index] || textAt(row, 1).replace(/^\d+\.\s*/, "");
    return `<div class="pipeline-stage" style="--accent:${stageColors[index]}"><div class="pipeline-stage-title"><i class="stage-dot"></i>${escapeHtml(stageName)}</div><span class="pipeline-stage-value">${escapeHtml(textAt(row, 3))} ${t("containers")}</span><small>${escapeHtml(textAt(row, 4))} ${index === 1 ? t("recordsWord") : t("units")}</small><div class="pipeline-track"><div class="pipeline-fill" style="width:${Math.max(0, Math.min(percent, 100))}%;background:${stageColors[index]}"></div></div></div>`;
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

const pickerFilter = { types: null, shift: "all", status: "all", sort: "units", search: "", from: null, to: null };
try {
  const savedTypes = JSON.parse(localStorage.getItem("pickerTypes") || "null");
  if (Array.isArray(savedTypes)) {
    const valid = savedTypes.filter((type) => PICKING_TYPES.some(([key]) => key === type));
    pickerFilter.types = valid.length && valid.length < PICKING_TYPES.length ? valid : null;
  }
} catch (error) {
  // Private windows can refuse storage; every type is shown then.
}

function fillSelect(select, options, value) {
  select.innerHTML = options.map(([key, label]) => `<option value="${escapeHtml(key)}"${key === value ? " selected" : ""}>${escapeHtml(label)}</option>`).join("");
}

function pickerStatusPill(picker) {
  if (picker.share > 0) return `<span class="picker-pill is-${picker.met ? "good" : "bad"}">${escapeHtml(t(picker.met ? "metStatus" : "missStatus"))}</span>`;
  if (picker.openUnits) return `<span class="picker-pill is-open" title="${escapeHtml(t("pkNowOnly"))}">${escapeHtml(t("hourOpen"))}</span>`;
  return "—";
}

function pickerRateBar(picker) {
  if (!(picker.share > 0)) return `<span class="picker-muted">—</span>`;
  const percent = Math.round(picker.rate * 100);
  const tone = picker.met ? colors.green : percent >= 75 ? colors.amber : colors.red;
  return `<span class="picker-rate"><span class="picker-rate-track"><i style="width:${Math.min(100, percent)}%;background:${tone}"></i></span><b>${percent}%</b></span>`;
}

function pickerNameCell(picker, rank) {
  return `<span class="picker-name" title="${escapeHtml(picker.fullName || picker.user)}">${rank ? `<span class="picker-rank-no">${rank}</span>` : ""}<span><strong>${escapeHtml(picker.name || picker.user)}</strong><small>${escapeHtml(picker.user)}</small></span></span>`;
}

const WAREHOUSE_STORAGE_KEY = "pickerWarehouses";
let selectedCodes = null;
let pickerExport = null;
let offeredCodes = [];
const openSummaries = new Set();

// The warehouse filter offers the site's warehouses that have work today, or the sheet's when the site figures are missing.
function availableCodes(view) {
  const live = liveData ? liveData.codes.filter((code) => liveData.value("total_qty", code) > 0) : [];
  if (live.length) return live;
  return [...new Set(view.warehouses.map((item) => item.code).filter(Boolean))].sort();
}

function syncSelection(codes) {
  offeredCodes = codes;
  if (!selectedCodes) {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(WAREHOUSE_STORAGE_KEY) || "null");
    } catch (error) {
      saved = null;
    }
    selectedCodes = new Set(Array.isArray(saved) ? saved : codes);
  }
  [...selectedCodes].forEach((code) => {
    if (!codes.includes(code)) selectedCodes.delete(code);
  });
  if (!selectedCodes.size) codes.forEach((code) => selectedCodes.add(code));
}

function saveSelection() {
  try {
    localStorage.setItem(WAREHOUSE_STORAGE_KEY, JSON.stringify([...selectedCodes]));
  } catch (error) {
    // Private windows can refuse storage; the choice then lasts until the page closes.
  }
}

// null means every offered warehouse is chosen, so the site's own "all" figures can be used as they are.
function selectedKeys() {
  if (!selectedCodes || offeredCodes.every((code) => selectedCodes.has(code))) return null;
  return [...selectedCodes].map(warehouseKey);
}

function selectionLabel() {
  return selectedKeys() ? [...selectedCodes].join(", ") : t("pkAllWarehouses");
}

// Sums the site's per-warehouse cards for the chosen warehouses. IPH cannot be added up, so for
// several warehouses it is rebuilt from each one's units and IPH, which is close to the site's figure.
function liveSelection() {
  if (!liveData) return null;
  const codes = selectedKeys() ? [...selectedCodes] : null;
  const value = (metric) => (codes ? codes.reduce((total, code) => total + liveData.value(metric, code), 0) : liveData.value(metric, "ALL"));
  const iph = (pickedMetric, iphMetric) => {
    if (!codes) return { value: liveData.value(iphMetric, "ALL"), approx: false };
    if (codes.length === 1) return { value: liveData.value(iphMetric, codes[0]), approx: false };
    const hours = codes.reduce((total, code) => {
      const rate = liveData.value(iphMetric, code);
      return total + (rate ? liveData.value(pickedMetric, code) / rate : 0);
    }, 0);
    return { value: hours ? value(pickedMetric) / hours : 0, approx: true };
  };
  return { value, iph };
}

function summaryPercent(part, total, tone) {
  const percent = total ? (part / total) * 100 : 0;
  return `<span class="summary-pill is-${tone}">${percent > 0 && percent < 1 ? "<1%" : `${Math.round(percent)}%`}</span>`;
}

// The four cards copy Minutes Central's Picking Summary, including what each one opens up to show.
function renderSiteSummary(data) {
  const live = liveSelection();
  const day = /^\d{4}-\d{2}-\d{2}$/.test(data.date || "") ? new Date(`${data.date}T12:00:00`) : null;
  $("#summaryDate").textContent = day ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(day) : data.date || "—";
  if (!live) {
    $("#pickerSummary").innerHTML = `<div class="empty-state">${t("pkNoLive")}</div>`;
    return;
  }
  const number = (metric) => formatNumber(live.value(metric));
  const rate = ({ value, approx }) => (value ? `${approx ? "≈" : ""}${formatNumber(value)}` : "—");
  const types = (prefix) => [["Multi Store Picking", number(`${prefix}_multi_store`)], ["Batch Dynamic", number(`${prefix}_batch_dynamic`)], ["Batch Static", number(`${prefix}_batch_static`)]];
  const total = live.value("total_qty");
  const cards = [
    { key: "pending", title: "Qty Pending for assignment", value: live.value("pending_qty"), pill: summaryPercent(live.value("pending_qty"), total, "warn"), chip: "", details: [["Pending Reservation", number("pending_reservation")], ["OOS", number("oos")], ...types("pending")] },
    { key: "progress", title: "Qty in Progress", value: live.value("in_progress_qty"), pill: summaryPercent(live.value("in_progress_qty"), total, "info"), chip: `Active Pickers: ${number("active_pickers")}`, details: types("in_progress") },
    { key: "completed", title: "Qty Completed", value: live.value("picked_qty"), pill: summaryPercent(live.value("picked_qty"), total, "good"), chip: `IPH:${rate(live.iph("picked_qty", "iph"))}`, details: [...types("picked"), ["IPH Multi Store", rate(live.iph("picked_multi_store", "iph_multi_store"))], ["IPH Batch Dynamic", rate(live.iph("picked_batch_dynamic", "iph_batch_dynamic"))], ["IPH Batch Static", rate(live.iph("picked_batch_static", "iph_batch_static"))]] },
    { key: "total", title: "Total Qty", value: total, pill: "", chip: "ATS/Manual", details: [["ATS", number("ats_qty")], ["Manual", number("manual_qty")], ["Cancelled", number("cancelled_qty")]] },
  ];
  $("#pickerSummary").innerHTML = cards.map((card) => {
    const open = openSummaries.has(card.key);
    return `<article class="summary-card${open ? " is-open" : ""}">
      <button class="summary-head" type="button" data-summary="${card.key}" aria-expanded="${open}"><span>${escapeHtml(card.title)}</span><span class="summary-chevron" aria-hidden="true">⌄</span></button>
      <div class="summary-value"><strong>${formatNumber(card.value)}</strong>${card.pill}</div>
      ${card.chip ? `<span class="summary-chip">${escapeHtml(card.chip)}</span>` : ""}
      <dl class="summary-details">${card.details.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>
    </article>`;
  }).join("");
}

function typesLabel() {
  return pickerFilter.types ? pickerFilter.types.map((type) => PICKING_TYPE_SHORT[type]).join(", ") : t("pkAllTypes");
}

// The type filter needs the per-job rows; without them the page falls back to the sheet's totals and hides it.
function renderTypePicker() {
  $("#typePicker").hidden = !liveJobs;
  $("#typeButtonLabel").textContent = typesLabel();
  const chosen = pickerFilter.types || PICKING_TYPES.map(([type]) => type);
  $("#typeMenu").innerHTML = `<label class="wh-option wh-option-all"><input type="checkbox" data-type="all"${pickerFilter.types ? "" : " checked"}><span>${escapeHtml(t("pkAllTypes"))}</span></label>${PICKING_TYPES.map(([type, label]) => `<label class="wh-option"><input type="checkbox" data-type="${type}"${chosen.includes(type) ? " checked" : ""}><span>${escapeHtml(label)}</span></label>`).join("")}`;
}

function renderWarehousePicker() {
  const all = offeredCodes.every((code) => selectedCodes.has(code));
  $("#warehouseButtonLabel").textContent = all ? offeredCodes.join(", ") : [...selectedCodes].join(", ");
  const qty = (code) => (liveData ? formatNumber(liveData.value("total_qty", code)) : "");
  $("#warehouseMenu").innerHTML = `<label class="wh-option wh-option-all"><input type="checkbox" data-code="all"${all ? " checked" : ""}><span>${escapeHtml(t("pkAllWarehouses"))}</span></label>${offeredCodes.map((code) => `<label class="wh-option"><input type="checkbox" data-code="${escapeHtml(code)}"${selectedCodes.has(code) ? " checked" : ""}><span>${escapeHtml(code)}</span><small>${qty(code)}</small></label>`).join("")}`;
}

// Every part of the page follows the warehouse choice; the hour range applies to picker output only.
function renderPickersPage(data, { animate = true } = {}) {
  // Shifts and the hour range come from the whole day so a narrow range never hides its own options.
  const day = pickerProductivity(data, { allHours: true });
  const dayHours = day.hours;
  if (!dayHours.includes(pickerFilter.from)) pickerFilter.from = dayHours[0] ?? null;
  if (!dayHours.includes(pickerFilter.to)) pickerFilter.to = dayHours[dayHours.length - 1] ?? null;
  if (pickerFilter.from !== null && pickerFilter.to !== null && pickerFilter.from > pickerFilter.to) pickerFilter.to = pickerFilter.from;
  const view = pickerProductivity(data, { allHours: true, from: pickerFilter.from, to: pickerFilter.to });
  const { hours, isOpen } = view;
  syncSelection(availableCodes(day));
  const keys = selectedKeys();
  renderWarehousePicker();
  renderSiteSummary(data);
  renderTypePicker();

  const shiftKeys = [...new Set(day.pickers.filter((picker) => picker.worked > 0 || picker.openUnits > 0).map((picker) => picker.shiftKey).filter(Boolean))].sort();
  const hourOptions = dayHours.map((hour) => [String(hour), formatHour(hour)]);
  fillSelect($("#pickerFrom"), hourOptions, String(pickerFilter.from));
  fillSelect($("#pickerTo"), hourOptions, String(pickerFilter.to));

  const remaining = warehouseRemaining(view, keys);
  const soleKey = keys && keys.length === 1 ? keys[0] : null;
  $("#pickerRemaining").innerHTML = remaining.length ? remaining.map((item) => {
    const percent = item.required ? Math.min(100, Math.round((item.done / item.required) * 100)) : 0;
    return `<button class="remaining-card${soleKey === item.key ? " active" : ""}" type="button" data-warehouse="${escapeHtml(item.code || item.key)}">
      <span class="remaining-top"><strong>${escapeHtml(item.key)}</strong><span>${percent}%</span></span>
      <span class="remaining-value">${formatNumber(item.remaining)}</span>
      <span class="remaining-sub">${escapeHtml(t("remaining"))} · ${escapeHtml(t("pkOfRequired"))} ${formatNumber(item.required)}${item.oos ? ` · OOS ${formatNumber(item.oos)}` : ""}</span>
      <span class="remaining-track"><i style="width:${percent}%"></i></span>
      <span class="remaining-foot">${item.active ? `${formatNumber(item.active)} ${escapeHtml(t("pkStatusActive"))} · <b>${formatNumber(item.perActive)}</b> ${escapeHtml(t("pkPerActive"))}` : escapeHtml(t("pkNoneActive"))}</span>
    </button>`;
  }).join("") : `<div class="empty-state">${t("pkNoData")}</div>`;

  const inScope = pickerScope(view, { keys });
  const scored = inScope.filter((picker) => picker.share > 0);
  const onTarget = scored.filter((picker) => picker.met).length;
  const closedUnits = inScope.reduce((total, picker) => total + picker.units, 0);
  const openUnits = inScope.reduce((total, picker) => total + picker.openUnits, 0);
  const pickerHours = inScope.reduce((total, picker) => total + picker.worked, 0);
  // The site's Active Pickers cover every picking type, so a type filter counts from the jobs instead.
  const siteActive = liveData && !pickerFilter.types;
  const activeNow = siteActive ? remaining.reduce((total, item) => total + item.active, 0) : inScope.filter((picker) => picker.openUnits > 0).length;
  const metrics = [
    { label: t("pkKpiActive"), value: formatNumber(activeNow), sub: keys ? escapeHtml(keys.join(" · ")) : t("pkKpiPickersSub"), icon: "◉", accent: colors.teal },
    { label: t("pkKpiUnits"), value: formatNumber(closedUnits + openUnits), sub: `<strong>${formatNumber(openUnits)}</strong> ${t("pkKpiUnitsSub")}`, icon: "✓", accent: colors.green },
    { label: t("pkKpiIph"), value: pickerHours ? formatNumber(closedUnits / pickerHours) : "—", sub: t("pkKpiIphSub"), icon: "⌁", accent: colors.violet },
    { label: t("pkKpiMet"), value: formatNumber(onTarget), sub: `${t("pkOfScored")} <strong>${formatNumber(scored.length)}</strong>`, icon: "▲", accent: colors.green },
    { label: t("pkKpiMissed"), value: formatNumber(scored.length - onTarget), sub: t("pkKpiMissedSub"), icon: "!", accent: colors.red },
  ];
  $("#pickerKpis").innerHTML = metrics.map((metric, index) => `<article class="kpi-card" style="--accent:${metric.accent};--i:${index}"><div class="kpi-top"><span>${metric.label}</span><span class="kpi-icon">${metric.icon}</span></div><div class="kpi-value" data-count="${escapeHtml(metric.value)}" data-final="${escapeHtml(metric.value)}">${escapeHtml(metric.value)}</div><div class="kpi-sub">${metric.sub}</div></article>`).join("");
  if (animate) countUpElements($("#pickerKpis"));

  fillSelect($("#pickerShift"), [["all", t("pkAllShifts")], ...shiftKeys.map((key) => [key, shiftLabel(key)])], pickerFilter.shift);
  fillSelect($("#pickerStatus"), [["all", t("pkAllStatus")], ["met", t("metStatus")], ["missed", t("missStatus")], ["active", t("pkStatusActive")]], pickerFilter.status);
  fillSelect($("#pickerSort"), [["units", t("pkSortUnits")], ["iph", t("pkSortIph")], ["rate", t("pkSortRate")], ["low", t("pkSortLow")], ["name", t("pkSortName")]], pickerFilter.sort);

  const search = pickerFilter.search.trim().toLowerCase();
  const list = inScope.filter((picker) => {
    if (pickerFilter.shift !== "all" && picker.shiftKey !== pickerFilter.shift) return false;
    if (pickerFilter.status === "met" && !(picker.share > 0 && picker.met)) return false;
    if (pickerFilter.status === "missed" && !(picker.share > 0 && !picker.met)) return false;
    if (pickerFilter.status === "active" && !picker.openUnits) return false;
    return !search || picker.user.toLowerCase().includes(search) || picker.fullName.toLowerCase().includes(search);
  });
  const unscoredLast = (picker) => (picker.share > 0 ? 0 : 1);
  const sorters = {
    units: (left, right) => right.units + right.openUnits - left.units - left.openUnits,
    iph: (left, right) => right.iph - left.iph,
    rate: (left, right) => unscoredLast(left) - unscoredLast(right) || right.rate - left.rate,
    low: (left, right) => unscoredLast(left) - unscoredLast(right) || left.rate - right.rate,
    name: (left, right) => (left.name || left.user).localeCompare(right.name || right.user),
  };
  list.sort(sorters[pickerFilter.sort] || sorters.units);
  const lines = hourLines(view, keys);
  const columns = view.warehouses.filter((item) => (!keys || keys.includes(item.key)) && lines.some((line) => line.byWarehouse.get(item.key))).map((item) => item.key);
  pickerExport = { list, hours, lines, columns };

  const rankItem = (picker, index, value, unit, tone) => `<div class="picker-rank-item">${pickerNameCell(picker, index + 1)}<span class="picker-rank-meta">${escapeHtml(picker.warehouse)}</span><span class="picker-rank-value" style="--tone:${tone}"><strong>${value}</strong><small>${escapeHtml(unit)}</small></span></div>`;
  const top = list.filter((picker) => picker.worked > 0).sort(sorters.iph).slice(0, 5);
  const bottom = list.filter((picker) => picker.share > 0).sort(sorters.low).slice(0, 5);
  $("#pickerTop").innerHTML = top.length ? top.map((picker, index) => rankItem(picker, index, formatNumber(picker.iph), t("pkPerHour"), colors.green)).join("") : `<div class="empty-state">${t("pkNoData")}</div>`;
  $("#pickerBottom").innerHTML = bottom.length ? bottom.map((picker, index) => rankItem(picker, index, `${Math.round(picker.rate * 100)}%`, `${formatNumber(picker.units)} / ${formatNumber(picker.share)}`, picker.met ? colors.green : colors.red)).join("") : `<div class="empty-state">${t("pkNoData")}</div>`;

  // "Working now" comes from the site's Active Pickers when its figures are loaded.
  const activeOf = new Map(remaining.map((item) => [item.key, item.active]));
  const tableKeys = [...new Set(view.pickers.filter((picker) => (picker.worked > 0 || picker.openUnits > 0) && (!keys || keys.includes(picker.warehouse))).map((picker) => picker.warehouse))].sort();
  const summaryLine = (label, group, active) => {
    const groupScored = group.filter((picker) => picker.share > 0);
    const groupMet = groupScored.filter((picker) => picker.met).length;
    const groupHours = group.reduce((total, picker) => total + picker.worked, 0);
    const groupUnits = group.reduce((total, picker) => total + picker.units, 0);
    return `<td class="warehouse-name">${escapeHtml(label)}</td><td>${formatNumber(active)}</td><td>${formatNumber(groupUnits + group.reduce((total, picker) => total + picker.openUnits, 0))}</td><td>${groupHours ? formatNumber(groupUnits / groupHours) : "—"}</td><td class="picker-good">${formatNumber(groupMet)}</td><td class="picker-bad">${formatNumber(groupScored.length - groupMet)}</td>`;
  };
  const warehouseActive = (key, group) => (siteActive ? activeOf.get(key) || 0 : group.filter((picker) => picker.openUnits > 0).length);
  $("#pickerWarehouses").innerHTML = tableKeys.length
    ? `<table class="picker-summary"><thead><tr><th>${t("warehouse")}</th><th>${t("pkStatusActive")}</th><th>${t("pkDone")}</th><th>${t("pkPerHour")}</th><th>${t("pkMetCol")}</th><th>${t("pkMissedCol")}</th></tr></thead><tbody>${tableKeys.map((key) => {
      const group = pickerScope(view, { keys: [key] });
      return `<tr>${summaryLine(key, group, warehouseActive(key, group))}</tr>`;
    }).join("")}</tbody><tfoot><tr>${summaryLine(t("overallTotal"), inScope, activeNow)}</tr></tfoot></table>`
    : `<div class="empty-state">${t("pkNoData")}</div>`;

  const hourCell = (cell) => {
    if (!cell) return `<td class="picker-hour"></td>`;
    if (cell.open) return `<td class="picker-hour"><span class="picker-hit is-open"><b>${formatNumber(cell.picked)}</b><small>${escapeHtml(t("hourOpenShort"))}</small></span></td>`;
    return `<td class="picker-hour"><span class="picker-hit is-${cell.met ? "good" : "bad"}"><b>${formatNumber(cell.picked)}</b><small>${cell.required ? formatNumber(cell.required) : "—"}</small></span></td>`;
  };
  const head = `<thead><tr><th class="picker-sticky">${t("pkPicker")}</th><th>${t("warehouseShort")}</th><th>${t("shiftCol")}</th><th>${t("pkTypeCol")}</th><th>${t("pkHours")}</th><th>${t("pkDone")}</th><th>${t("pkRequired")}</th><th>${t("pkRate")}</th><th>${t("pkPerHour")}</th><th>${t("statusCol")}</th>${hours.map((hour) => `<th class="picker-hour${isOpen(hour) ? " is-open" : ""}">${formatHour(hour)}</th>`).join("")}</tr></thead>`;
  const body = list.map((picker, index) => `<tr><td class="picker-sticky">${pickerNameCell(picker, index + 1)}</td><td>${escapeHtml(picker.warehouse)}</td><td>${escapeHtml(picker.shift)}</td><td class="picker-type">${escapeHtml(typeLabel(picker.types))}</td><td>${formatNumber(picker.worked)}</td><td><b>${formatNumber(picker.units + picker.openUnits)}</b></td><td>${picker.share > 0 ? formatNumber(picker.share) : "—"}</td><td>${pickerRateBar(picker)}</td><td>${picker.worked ? formatNumber(picker.iph) : "—"}</td><td>${pickerStatusPill(picker)}</td>${picker.cells.map(hourCell).join("")}</tr>`).join("");
  $("#pickerTable").innerHTML = `${head}<tbody>${body || `<tr><td colspan="${10 + hours.length}" class="empty-state">${t(inScope.length ? "pkNoMatch" : "pkNoData")}</td></tr>`}</tbody>`;
  $("#pickerCount").textContent = `${list.length} ${t("pkOf")} ${inScope.length} ${t("pkShowing")}`;
  $("#pickersUpdated").textContent = data.siteUpdatedAt || data.date || "—";
}

function renderDashboard(data) {
  dashboardData = data;
  // The site shows only the picker page; the older dashboard sections are hidden and no longer drawn.
  syncHourOptions();
  renderPickersPage(data);
  $("#connectionBanner").hidden = !lastSyncError;
}

async function loadDashboard() {
  const button = $("#refreshButton");
  button.classList.add("is-loading");
  button.disabled = true;
  try {
    const request = (url) => fetch(`${url}&_=${Date.now()}`, { cache: "no-store", headers: { Accept: "text/csv" } });
    // The site's own cards live in a separate tab; the page still works from the dashboard tab if they fail to load.
    const [response, liveResponse, jobsResponse] = await Promise.all([request(SHEET_URL), request(LIVE_URL).catch(() => null), request(LIVE_JOBS_URL).catch(() => null)]);
    if (!response.ok) throw new Error(`${t("requestFailed")} (${response.status}).`);
    const csv = await response.text();
    if (!csv.trim() || csv.includes("<!DOCTYPE html")) throw new Error(t("invalidCsv"));
    const rows = parseCsv(csv);
    const data = parseDashboard(rows);
    const liveCsv = liveResponse?.ok ? await liveResponse.text().catch(() => "") : "";
    liveData = liveCsv && !liveCsv.includes("<!DOCTYPE html") ? parseLive(parseCsv(liveCsv)) : null;
    const jobsCsv = jobsResponse?.ok ? await jobsResponse.text().catch(() => "") : "";
    liveJobs = jobsCsv && !jobsCsv.includes("<!DOCTYPE html") ? parseLiveJobs(parseCsv(jobsCsv)) : null;
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

// Day or night look, remembered per browser; the head script applies it before the first paint.
function syncThemeButton() {
  const light = document.documentElement.dataset.theme === "light";
  const label = t(light ? "themeDark" : "themeLight");
  $("#themeButton").firstElementChild.textContent = light ? "☾" : "☀";
  $("#themeButton").setAttribute("aria-label", label);
  $("#themeButton").title = label;
}
$("#themeButton").addEventListener("click", () => {
  const light = document.documentElement.dataset.theme !== "light";
  if (light) document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem("dashboardTheme", light ? "light" : "dark");
  } catch (error) {
    // Storage can be blocked; the choice then lasts until the page closes.
  }
  syncThemeButton();
});
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

function setWarehouseMenu(open) {
  $("#warehouseMenu").hidden = !open;
  $("#warehouseButton").setAttribute("aria-expanded", String(open));
}
$("#warehouseButton").addEventListener("click", () => setWarehouseMenu($("#warehouseMenu").hidden));
function setTypeMenu(open) {
  $("#typeMenu").hidden = !open;
  $("#typeButton").setAttribute("aria-expanded", String(open));
}
$("#typeButton").addEventListener("click", () => setTypeMenu($("#typeMenu").hidden));
document.addEventListener("click", (event) => {
  if (!event.target.closest("#warehousePicker")) setWarehouseMenu(false);
  if (!event.target.closest("#typePicker")) setTypeMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setWarehouseMenu(false);
  setTypeMenu(false);
});
// Ticking every type, or "All", clears the filter; the last ticked type cannot be unticked.
$("#typeMenu").addEventListener("change", (event) => {
  const box = event.target.closest("[data-type]");
  if (!box || !dashboardData) return;
  const chosen = new Set(pickerFilter.types || PICKING_TYPES.map(([type]) => type));
  if (box.dataset.type === "all") chosen.clear();
  else if (box.checked) chosen.add(box.dataset.type);
  else if (chosen.size > 1) chosen.delete(box.dataset.type);
  pickerFilter.types = chosen.size && chosen.size < PICKING_TYPES.length ? PICKING_TYPES.map(([type]) => type).filter((type) => chosen.has(type)) : null;
  try {
    localStorage.setItem("pickerTypes", JSON.stringify(pickerFilter.types));
  } catch (error) {
    // Storage can be blocked; the choice then lasts until the page closes.
  }
  renderPickersPage(dashboardData, { animate: false });
});
$("#warehouseMenu").addEventListener("change", (event) => {
  const box = event.target.closest("[data-code]");
  if (!box || !dashboardData || !selectedCodes) return;
  if (box.dataset.code === "all") {
    offeredCodes.forEach((code) => selectedCodes.add(code));
  } else if (box.checked) {
    selectedCodes.add(box.dataset.code);
  } else if (selectedCodes.size > 1) {
    selectedCodes.delete(box.dataset.code);
  }
  saveSelection();
  renderPickersPage(dashboardData, { animate: false });
});
// A warehouse card narrows the page to that warehouse; clicking it again brings every warehouse back.
$("#pickerRemaining").addEventListener("click", (event) => {
  const card = event.target.closest("[data-warehouse]");
  if (!card || !dashboardData || !selectedCodes) return;
  const code = card.dataset.warehouse;
  const alone = selectedCodes.size === 1 && selectedCodes.has(code);
  selectedCodes = new Set(alone ? offeredCodes : [code]);
  saveSelection();
  renderPickersPage(dashboardData, { animate: false });
});
$("#pickerSummary").addEventListener("click", (event) => {
  const head = event.target.closest("[data-summary]");
  if (!head || !dashboardData) return;
  const key = head.dataset.summary;
  if (openSummaries.has(key)) openSummaries.delete(key);
  else openSummaries.add(key);
  renderSiteSummary(dashboardData);
});
[["#pickerFrom", "from"], ["#pickerTo", "to"]].forEach(([selector, key]) => {
  $(selector).addEventListener("change", (event) => {
    pickerFilter[key] = Number(event.target.value);
    if (key === "from" && pickerFilter.to < pickerFilter.from) pickerFilter.to = pickerFilter.from;
    if (key === "to" && pickerFilter.from > pickerFilter.to) pickerFilter.from = pickerFilter.to;
    if (dashboardData) renderPickersPage(dashboardData, { animate: false });
  });
});
$("#pickerExcelButton").addEventListener("click", exportPickersExcel);
$("#pickerHourReportButton").addEventListener("click", generatePickerHourReport);
$("#pickerShiftReportButton").addEventListener("click", generatePickerShiftReport);
[["#pickerShift", "shift"], ["#pickerStatus", "status"], ["#pickerSort", "sort"]].forEach(([selector, key]) => {
  $(selector).addEventListener("change", (event) => {
    pickerFilter[key] = event.target.value;
    if (dashboardData) renderPickersPage(dashboardData, { animate: false });
  });
});
$("#pickerSearch").addEventListener("input", (event) => {
  pickerFilter.search = event.target.value;
  if (dashboardData) renderPickersPage(dashboardData, { animate: false });
});
setAutoRefresh(true);
syncHourOptions();
applyLocale();
loadDashboard();
