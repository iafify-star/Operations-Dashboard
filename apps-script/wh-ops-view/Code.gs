/**
 * WH Ops View — Apps Script bound to the "WH Ops View" spreadsheet.
 *
 * Capacity  : read from the monthly IB/OB plan ("Daily view (...)" tab) for the date in OB!A2.
 *             OB tab gets the day's plan per warehouse; IB tab gets Today and MTD (1st of month → date).
 * Created / Pending : pushed from Minutes Central (Outbound › Picking) by the bookmarklet.
 *             Created = "Total Qty" card, Pending = "Qty Pending for assignment" card, per warehouse.
 *
 * Setup: see README.md next to this file.
 */

var CONFIG = {
  // Plan files to search. Add next month's file from the menu (no code change needed).
  PLAN_SPREADSHEET_IDS: ['1xjKoSuM0nxYwyIh1LUZ6sSqj5uTVg1aFx5uXy9mwM6s'],
  PLAN_TAB_PREFIX: 'Daily view',

  OB_SHEET: 'OB',
  IB_SHEET: 'IB',

  // Warehouse → plan columns (summed). Edit here if a warehouse's mapping changes.
  OB_CAPACITY: {
    'CAIID01': ['OB AM Sort'],
    'CAIID02': ['OB AM Non-sort'],
    'CAIID03': ['OB TC - Chocolates'],
    'CAIID04': ['OB TC - Chilled'],
    'CAIID05': ['OB FZ'],
    'CAIID06': ['Xdock CAIID06'],
    'CAIID07': ['Xdock CAIID07']
  },
  IB_CAPACITY: {
    'CAIID01': ['IB AM Sort'],
    'CAIID02': ['IB AM Non-sort'],
    'CAIID03 & CAIID04': ['IB TC - Chilled', 'IB TC - Chocolates'],
    'CAIID05': ['IB FZ'],
    'CAIID06': ['Xdock CAIID06'],
    'CAIID07': ['Xdock CAIID07']
  },

  // The dashboard sheet's "Live" tab: Minutes Central's picking cards for today, one column per warehouse,
  // kept current by the dashboard's own sync. The Refresh All button takes Created/Pending from here.
  LIVE_SPREADSHEET_ID: '1ZxfAGaLTjWE5CSpdpi2v8UMN4XS_zi6ov9Yr2X7OiCk',
  LIVE_TAB: 'Live',
  LIVE_CREATED_METRIC: 'total_qty',
  LIVE_PENDING_METRIC: 'pending_qty',

  // Warehouses the bookmarklet reads from Minutes Central.
  MINUTES_WAREHOUSES: ['CAIID01', 'CAIID02', 'CAIID03', 'CAIID04', 'CAIID05', 'CAIID06', 'CAIID07'],

  // Small status block on the OB tab (label column, value column = next one).
  STATUS_CELL: 'G1'
};

/* ───────────────────────── Menu ───────────────────────── */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚙️ Ops View')
    .addItem('🔄 حدّث كل حاجة (Capacity + Created + Pending)', 'refreshAll')
    .addItem('🔄 حدّث الكابستي بس', 'refreshCapacity')
    .addItem('🟨 حط زرار Refresh All في تاب OB', 'insertRefreshButton')
    .addSeparator()
    .addItem('🔖 هات البوكمارك (Created / Pending)', 'showBookmarkletDialog')
    .addSeparator()
    .addItem('⏰ شغّل التحديث التلقائي (كل ساعة + لما التاريخ يتغير)', 'installHourlyTrigger')
    .addItem('➕ ضيف شيت خطة لشهر جديد', 'addPlanSpreadsheet')
    .addToUi();
}

/* ───────────────────────── Refresh All (the button) ───────────────────────── */

// One button: Created/Pending from the dashboard's Live tab, then the capacity, all for the date in A2.
// If A2 is empty or holds another day than the Live data, A2 is set to the Live day (today).
function refreshAll() {
  var ss = SpreadsheetApp.getActive();
  var live = readLive_();
  var message;
  if (!live) {
    message = 'مش قادر أقرا تاب Live — الكابستي بس اتحدث.';
  } else {
    var tz = ss.getSpreadsheetTimeZone();
    var day = Utilities.parseDate(live.date, tz, 'yyyy-MM-dd');
    [CONFIG.OB_SHEET, CONFIG.IB_SHEET].forEach(function (name) {
      var tab = ss.getSheetByName(name);
      if (tab) tab.getRange('A2').setValue(day).setNumberFormat('mm/dd/yyyy');
    });
    writeMinutes_(ss, { date: live.date, wh: live.wh });
    message = 'Created/Pending من Minutes (' + live.updated + ')';
  }
  var cap = refreshCapacity();
  message += cap.found ? ' — الكابستي اتحدث.' : ' — مفيش خطة لـ ' + cap.date + '.';
  ss.toast(message, '✅ Ops View', 8);
  return message;
}

function readLive_() {
  var sheet;
  try { sheet = SpreadsheetApp.openById(CONFIG.LIVE_SPREADSHEET_ID).getSheetByName(CONFIG.LIVE_TAB); } catch (err) { return null; }
  if (!sheet) return null;
  var values = sheet.getDataRange().getValues();
  var header = values[0].map(function (h) { return String(h).trim(); });
  var rows = {};
  values.slice(1).forEach(function (row) { rows[String(row[0]).trim()] = row; });
  var created = rows[CONFIG.LIVE_CREATED_METRIC];
  var pending = rows[CONFIG.LIVE_PENDING_METRIC];
  if (!created || !pending) return null;
  var updated = rows.updated_at ? rows.updated_at[1] : '';
  if (updated instanceof Date) updated = Utilities.formatDate(updated, SpreadsheetApp.getActive().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm');
  updated = String(updated || '');
  var date = (updated.match(/^\d{4}-\d{2}-\d{2}/) || [Utilities.formatDate(new Date(), SpreadsheetApp.getActive().getSpreadsheetTimeZone(), 'yyyy-MM-dd')])[0];
  var wh = {};
  CONFIG.MINUTES_WAREHOUSES.forEach(function (code) {
    var i = header.indexOf(code);
    wh[code] = i < 0 ? { created: 0, pending: 0 } : { created: toNumber_(created[i]), pending: toNumber_(pending[i]) };
  });
  return { date: date, updated: updated, wh: wh };
}

// Puts a yellow "Refresh All" button on the OB tab that runs refreshAll when clicked.
function insertRefreshButton() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(CONFIG.OB_SHEET);
  sheet.getImages().forEach(function (img) { if (img.getScript && img.getScript() === 'refreshAll') img.remove(); });
  var blob = Utilities.newBlob(Utilities.base64Decode(REFRESH_BUTTON_PNG_), 'image/png', 'refresh.png');
  sheet.insertImage(blob, 7, 4).assignScript('refreshAll').setAltTextTitle('Refresh All');
  SpreadsheetApp.getActive().toast('الزرار اتحط في G4 — تقدر تسحبه لأي مكان.', 'Ops View', 6);
}

var REFRESH_BUTTON_PNG_ = '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';

/* ───────────────────────── Capacity ───────────────────────── */

function refreshCapacity() {
  var lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    var ss = SpreadsheetApp.getActive();
    var plan = loadPlan_();
    var result = { date: '', found: false };
    [[CONFIG.OB_SHEET, CONFIG.OB_CAPACITY], [CONFIG.IB_SHEET, CONFIG.IB_CAPACITY]].forEach(function (pair, i) {
      var sheet = ss.getSheetByName(pair[0]);
      if (!sheet) return;
      // Each tab is worked out on the date in its own A2 (today if A2 is empty).
      var date = reportDateKey_(ss, sheet);
      var day = planDay_(plan, date);
      writeCapacityBlocks_(sheet, pair[1], day.day, day.mtd);
      if (i === 0) result = { date: date, found: !!day.day };
    });
    var note = result.found ? 'OK ' + result.date : 'مفيش خطة لـ ' + result.date + ' في شيت الخطة';
    setStatus_(ss, 0, 'Capacity', now_(ss) + ' — ' + note);
    if (!result.found) ss.toast('مفيش يوم ' + result.date + ' في شيتات الخطة. ضيف شيت الشهر من القائمة.', 'Ops View', 8);
    return result;
  } finally {
    lock.releaseLock();
  }
}

function planDay_(plan, date) {
  var day = null;
  var mtd = {};
  plan.forEach(function (item) {
    if (item.key === date) day = item.row;
    if (item.key.slice(0, 7) === date.slice(0, 7) && item.key <= date) {
      Object.keys(item.row).forEach(function (h) { mtd[h] = (mtd[h] || 0) + item.row[h]; });
    }
  });
  return { day: day, mtd: Object.keys(mtd).length ? mtd : null };
}

// Installable on-edit trigger: changing the date in OB!A2 or IB!A2 refreshes the capacity.
function onDateEdit(e) {
  if (!e || !e.range) return;
  var name = e.range.getSheet().getName();
  if (name !== CONFIG.OB_SHEET && name !== CONFIG.IB_SHEET) return;
  if (e.range.getRow() > 2 || e.range.getColumn() > 1 || e.range.getLastRow() < 2) return;
  var date = reportDateKey_(e.source, e.range.getSheet());
  var result = refreshCapacity();
  if (result.found || name === CONFIG.IB_SHEET) e.source.toast('الكابستي اتحدث على تاريخ ' + date, 'Ops View', 5);
}

// Finds every header row that starts a "WH | Capacity ..." block and fills Capacity.
// A block whose label above says "MTD" gets the month-to-date sum, otherwise the day's plan.
function writeCapacityBlocks_(sheet, mapping, day, mtd) {
  var values = sheet.getDataRange().getValues();
  for (var r = 0; r < values.length; r++) {
    for (var c = 0; c < values[r].length; c++) {
      if (norm_(values[r][c]) !== 'wh') continue;
      var capCol = findInRow_(values[r], 'capacity', c);
      if (capCol < 0) continue;
      var label = r > 0 ? norm_(values[r - 1][c]) : '';
      var source = label === 'mtd' ? mtd : day;
      var pctCol = findInRow_(values[r], '%', c);
      var createdCol = findInRow_(values[r], 'created', c);
      var receivedCol = findInRow_(values[r], 'received', c);
      var doneCol = createdCol >= 0 ? createdCol : receivedCol;

      for (var rr = r + 1; rr < values.length; rr++) {
        var wh = String(values[rr][c]).trim();
        if (!wh || norm_(wh) === 'total') break;
        var cols = mapping[wh];
        if (!cols) continue;
        var cell = sheet.getRange(rr + 1, capCol + 1);
        if (!source) { cell.setValue(''); continue; }
        var sum = 0;
        cols.forEach(function (h) { sum += source[h] || 0; });
        cell.setValue(sum).setNumberFormat('#,##0');
        if (pctCol >= 0 && doneCol >= 0) {
          sheet.getRange(rr + 1, pctCol + 1)
            .setFormulaR1C1('=IFERROR(R[0]C' + (doneCol + 1) + '/R[0]C' + (capCol + 1) + ',"")')
            .setNumberFormat('0%');
        }
      }
    }
  }
}

function loadPlan_() {
  var rows = [];
  planIds_().forEach(function (id) {
    var plan;
    try { plan = SpreadsheetApp.openById(id); } catch (err) { return; }
    var tz = plan.getSpreadsheetTimeZone();
    plan.getSheets().forEach(function (sheet) {
      if (sheet.getName().indexOf(CONFIG.PLAN_TAB_PREFIX) !== 0) return;
      var values = sheet.getDataRange().getValues();
      var headers = values[0].map(function (h) { return String(h).trim(); });
      for (var r = 1; r < values.length; r++) {
        var key = dateKey_(values[r][0], tz);
        if (!key) continue;
        var row = {};
        headers.forEach(function (h, i) { if (h) row[h] = toNumber_(values[r][i]); });
        rows.push({ key: key, row: row });
      }
    });
  });
  return rows;
}

function planIds_() {
  var stored = PropertiesService.getScriptProperties().getProperty('PLAN_IDS');
  var ids = CONFIG.PLAN_SPREADSHEET_IDS.slice();
  if (stored) JSON.parse(stored).forEach(function (id) { if (ids.indexOf(id) < 0) ids.push(id); });
  return ids;
}

function addPlanSpreadsheet() {
  var ui = SpreadsheetApp.getUi();
  var res = ui.prompt('شيت خطة جديد', 'الصق لينك شيت الـ IB/OB بتاع الشهر (لازم فيه تاب يبدأ بـ "Daily view"):', ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;
  var match = res.getResponseText().match(/\/d\/([a-zA-Z0-9_-]+)/) || res.getResponseText().trim().match(/^([a-zA-Z0-9_-]{20,})$/);
  if (!match) { ui.alert('اللينك مش مفهوم.'); return; }
  var props = PropertiesService.getScriptProperties();
  var ids = JSON.parse(props.getProperty('PLAN_IDS') || '[]');
  if (ids.indexOf(match[1]) < 0) ids.push(match[1]);
  props.setProperty('PLAN_IDS', JSON.stringify(ids));
  var result = refreshCapacity();
  ui.alert(result.found ? 'تمام، الكابستي اتحدث.' : 'اتضاف، بس لسه مفيش يوم ' + result.date + ' في الخطة.');
}

// Hourly refresh plus refresh whenever the date in A2 changes.
function installHourlyTrigger() {
  var ss = SpreadsheetApp.getActive();
  ScriptApp.getProjectTriggers().forEach(function (t) {
    var fn = t.getHandlerFunction();
    if (fn === 'refreshCapacity' || fn === 'refreshAll' || fn === 'onDateEdit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('refreshAll').timeBased().everyHours(1).create();
  ScriptApp.newTrigger('onDateEdit').forSpreadsheet(ss).onEdit().create();
  refreshAll();
  SpreadsheetApp.getUi().alert('تمام: كل حاجة هتتحدث كل ساعة، والكابستي كمان أول ما تغيّر التاريخ في A2 (OB أو IB).');
}

/* ───────────────────────── Created / Pending (web app) ───────────────────────── */

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'push') return handlePush_(p);
  return installPage_();
}

function handlePush_(p) {
  if (p.token !== token_()) return page_('❌ التوكن غلط', '<p>هات البوكمارك من جديد من قائمة ⚙️ Ops View.</p>');
  var data;
  try { data = JSON.parse(p.data); } catch (err) { return page_('❌ البيانات مش مفهومة', ''); }

  var lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  var written = [];
  var ss = SpreadsheetApp.getActive();
  try {
    written = writeMinutes_(ss, data);
    if (!written) return page_('❌ مش لاقي عمود Created في تاب OB', '');
    // One click keeps the whole sheet on the same day: the Minutes date becomes A2 on OB and IB.
    if (/^\d{4}-\d{2}-\d{2}$/.test(data.date || '')) {
      var day = Utilities.parseDate(data.date, ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
      [CONFIG.OB_SHEET, CONFIG.IB_SHEET].forEach(function (name) {
        var tab = ss.getSheetByName(name);
        if (tab) tab.getRange('A2').setValue(day).setNumberFormat('mm/dd/yyyy');
      });
    }
  } finally {
    lock.releaseLock();
  }

  // Refresh capacity in the same click so the whole row is current.
  var cap = '';
  try { var res = refreshCapacity(); cap = res.found ? 'الكابستي اتحدث كمان.' : 'مفيش خطة لـ ' + res.date + '.'; }
  catch (err) { cap = 'الكابستي ما اتحدثش: ' + err.message; }

  var rows = written.map(function (w) {
    return '<tr><td>' + w[0] + '</td><td>' + fmt_(w[1]) + '</td><td>' + fmt_(w[2]) + '</td></tr>';
  }).join('');
  return page_('✅ اتحدث', '<p>تاريخ Minutes: ' + (data.date || '—') + ' — ' + cap + '</p>' +
    '<table><tr><th>WH</th><th>Created</th><th>Pending</th></tr>' + rows + '</table>' +
    '<p class="muted">تقدر تقفل الصفحة دي.</p>');
}

// Writes Created/Pending per warehouse into the OB tab. Returns the rows written, or null without a Created column.
function writeMinutes_(ss, data) {
  var sheet = ss.getSheetByName(CONFIG.OB_SHEET);
  var values = sheet.getDataRange().getValues();
  var head = findHeader_(values, 'created');
  if (!head) return null;
  var createdCol = findInRow_(values[head.row], 'created', head.col);
  var pendingCol = findInRow_(values[head.row], 'pending', head.col);
  var written = [];
  for (var r = head.row + 1; r < values.length; r++) {
    var wh = String(values[r][head.col]).trim();
    if (!wh) break;
    var item = data.wh && data.wh[wh];
    if (!item) continue;
    if (item.created !== null && item.created !== undefined) sheet.getRange(r + 1, createdCol + 1).setValue(item.created).setNumberFormat('#,##0');
    if (pendingCol >= 0 && item.pending !== null && item.pending !== undefined) sheet.getRange(r + 1, pendingCol + 1).setValue(item.pending).setNumberFormat('#,##0');
    written.push([wh, item.created, item.pending]);
  }
  setStatus_(ss, 1, 'Created/Pending', now_(ss) + ' — Minutes ' + (data.date || ''));
  return written;
}

function installPage_() {
  var url = ScriptApp.getService().getUrl();
  var code = bookmarkletCode_(url);
  var body =
    '<p>1) اسحب الزرار الأصفر ده وحطه في شريط البوكماركس (Ctrl+Shift+B لو الشريط مش ظاهر):</p>' +
    '<p><a class="bm" href="' + code.replace(/"/g, '&quot;') + '">🔄 Ops View Sync</a></p>' +
    '<p>2) افتح Minutes Central › Outbound › Picking ودوس على البوكمارك. هيقرا Total Qty و Qty Pending for assignment لكل مخزن ويبعتهم للشيت.</p>' +
    '<details><summary>السحب مش شغال؟</summary><p>اعمل بوكمارك جديد بأي اسم والصق الكود ده في خانة الـ URL:</p>' +
    '<textarea readonly onclick="this.select()">' + code.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</textarea></details>';
  return page_('بوكمارك Ops View', body);
}

// Shows the bookmarklet inside the sheet, so it works whichever Google account the browser opens links with.
function showBookmarkletDialog() {
  var url = ScriptApp.getService().getUrl();
  var html;
  if (!url) {
    html = '<p style="font-family:Arial" dir="rtl">لازم تعمل Deploy للسكربت كـ Web app الأول (Deploy › New deployment › Web app). شوف README.</p>';
  } else {
    var code = bookmarkletCode_(url);
    html = '<div dir="rtl" style="font:14px/1.6 Arial">' +
      '<p>اسحب الزرار الأصفر ده وحطه في شريط البوكماركس (Ctrl+Shift+B لو الشريط مش ظاهر):</p>' +
      '<p style="text-align:center"><a href="' + code.replace(/"/g, '&quot;') + '" onclick="return false" ' +
      'style="display:inline-block;background:#ffe900;color:#111;font-weight:bold;padding:10px 18px;border-radius:8px;text-decoration:none">🔄 Ops View Sync</a></p>' +
      '<p>السحب مش شغال؟ اعمل بوكمارك جديد بأي اسم (Ctrl+D ثم More/تعديل) والصق الكود ده في خانة الـ URL:</p>' +
      '<textarea readonly onclick="this.select()" style="width:100%;height:70px;direction:ltr;font:11px monospace">' +
      code.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</textarea></div>';
  }
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(560).setHeight(330), 'بوكمارك Ops View');
}

function bookmarkletCode_(url) {
  var src = OPS_BOOKMARKLET_.toString().replace(/\s*\n\s*/g, ' ');
  return 'javascript:' + encodeURIComponent('(' + src + ')(' + JSON.stringify(url) + ',' + JSON.stringify(token_()) + ',' +
    JSON.stringify(CONFIG.MINUTES_WAREHOUSES) + ');void 0');
}

/*
 * Runs on the Minutes Central page, not in Apps Script. Kept here so the web app can hand it out
 * with the deployment URL and token filled in. Uses only block comments and explicit semicolons
 * because it is joined into one line.
 */
function OPS_BOOKMARKLET_(APP, TOKEN, WHS) {
  var LABELS = { created: 'total qty', pending: 'qty pending for assignment' };
  if (location.hostname.indexOf('minutes-central') < 0) { alert('افتح Minutes Central › Outbound › Picking الأول وبعدين دوس البوكمارك.'); return; }
  if (window.__opsSyncRunning) return;
  window.__opsSyncRunning = true;
  var out = window.open('', 'ops_view_sync');
  try { out.document.write('<p style="font:16px Arial;padding:20px">⏳ بيقرا الأرقام من Minutes...</p>'); } catch (e) {}

  var params = new URLSearchParams(location.search);
  var d = new Date();
  var today = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  var date = prompt('Ops View Sync — اليوم (yyyy-mm-dd):', params.get('from') || today);
  if (!date) { window.__opsSyncRunning = false; try { out.close(); } catch (e) {} return; }
  date = date.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { alert('اكتب التاريخ كده: 2026-11-01'); window.__opsSyncRunning = false; try { out.close(); } catch (e) {} return; }

  var panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;top:12px;right:12px;z-index:2147483647;background:#111;color:#fff;font:13px/1.5 Arial;padding:12px 14px;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.4);min-width:260px;direction:rtl';
  document.body.appendChild(panel);
  var state = {};
  WHS.forEach(function (w) { state[w] = '⏳'; });
  function draw(extra) {
    panel.innerHTML = '<b style="color:#ffe900">Ops View Sync — ' + date + '</b><br>' +
      WHS.map(function (w) { return w + ': ' + state[w]; }).join('<br>') + (extra ? '<hr style="border-color:#333">' + extra : '');
  }
  draw();

  function readCard(doc, label) {
    var all = doc && doc.body ? doc.body.getElementsByTagName('*') : [];
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.children.length > 2) continue;
      if ((el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase() !== label) continue;
      var box = el;
      for (var up = 0; up < 4 && box; up++) {
        box = box.parentElement;
        if (!box) break;
        var walker = doc.createTreeWalker(box, 4);
        var node;
        while ((node = walker.nextNode())) {
          if (!(el.compareDocumentPosition(node) & 4) || el.contains(node)) continue;
          var value = (node.nodeValue || '').trim();
          if (/^\d[\d,]*$/.test(value)) return Number(value.replace(/,/g, ''));
        }
      }
    }
    return null;
  }

  function readWarehouse(wh) {
    return new Promise(function (resolve) {
      var p = new URLSearchParams(location.search);
      p.set('wh', wh); p.set('from', date); p.set('to', date); p.set('page', '1');
      var frame = document.createElement('iframe');
      frame.style.cssText = 'position:fixed;left:-20000px;top:0;width:1400px;height:1000px;border:0';
      frame.src = location.origin + location.pathname + '?' + p.toString();
      document.body.appendChild(frame);
      var started = Date.now();
      var last = null;
      var timer = setInterval(function () {
        var doc = null;
        try { doc = frame.contentDocument; } catch (e) {}
        var created = readCard(doc, LABELS.created);
        var pending = readCard(doc, LABELS.pending);
        var now = created === null || pending === null ? null : created + '|' + pending;
        var ready = now && now === last && Date.now() - started > 4000;
        last = now;
        if (ready || Date.now() - started > 60000) {
          clearInterval(timer);
          frame.remove();
          state[wh] = ready ? 'Created ' + created.toLocaleString() + ' · Pending ' + pending.toLocaleString() : '❌ ما قدرتش أقرا';
          draw();
          resolve(ready ? { created: created, pending: pending } : null);
        }
      }, 1000);
    });
  }

  var results = {};
  var queue = WHS.slice();
  function worker() {
    var wh = queue.shift();
    if (!wh) return Promise.resolve();
    return readWarehouse(wh).then(function (r) { if (r) results[wh] = r; return worker(); });
  }
  Promise.all([worker(), worker(), worker()]).then(function () {
    window.__opsSyncRunning = false;
    if (!Object.keys(results).length) {
      draw('❌ مفيش أرقام. اتأكد إن كروت Picking Summary ظاهرة في الصفحة.');
      try { out.close(); } catch (e) {}
      return;
    }
    var url = APP + '?action=push&token=' + encodeURIComponent(TOKEN) + '&data=' + encodeURIComponent(JSON.stringify({ date: date, wh: results }));
    if (out && !out.closed) { out.location.href = url; draw('✅ اتبعت للشيت (شوف التاب الجديدة).'); }
    else { draw('<a href="' + url + '" target="_blank" style="color:#ffe900">اضغط هنا عشان تبعت للشيت</a>'); }
    setTimeout(function () { panel.remove(); }, 20000);
  });
}

/* ───────────────────────── Helpers ───────────────────────── */

function token_() {
  var props = PropertiesService.getScriptProperties();
  var t = props.getProperty('PUSH_TOKEN');
  if (!t) { t = Utilities.getUuid().replace(/-/g, ''); props.setProperty('PUSH_TOKEN', t); }
  return t;
}

// The day a tab reports on: its A2 if it holds a date, otherwise today.
function reportDateKey_(ss, sheet) {
  var tz = ss.getSpreadsheetTimeZone();
  sheet = sheet || ss.getSheetByName(CONFIG.OB_SHEET);
  var v = sheet ? sheet.getRange('A2').getValue() : '';
  return dateKey_(v, tz) || Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
}

function dateKey_(v, tz) {
  if (v instanceof Date && !isNaN(v)) return Utilities.formatDate(v, tz, 'yyyy-MM-dd');
  var s = String(v || '').trim();
  var m = s.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})$/);
  if (m) {
    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    var mi = months.indexOf(m[2].toLowerCase());
    if (mi < 0) return '';
    var y = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
    return y + '-' + pad_(mi + 1) + '-' + pad_(Number(m[1]));
  }
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? s : '';
}

function findHeader_(values, name) {
  for (var r = 0; r < values.length; r++) {
    for (var c = 0; c < values[r].length; c++) {
      if (norm_(values[r][c]) === 'wh' && findInRow_(values[r], name, c) >= 0) return { row: r, col: c };
    }
  }
  return null;
}

// Looks for a header to the right of a block's "WH" cell, stopping at the next block.
function findInRow_(row, name, from) {
  for (var c = from + 1; c < row.length; c++) {
    var v = norm_(row[c]);
    if (v === 'wh') return -1;
    if (v === name) return c;
  }
  return -1;
}

function setStatus_(ss, offset, label, value) {
  var sheet = ss.getSheetByName(CONFIG.OB_SHEET);
  if (!sheet) return;
  sheet.getRange(CONFIG.STATUS_CELL).offset(offset, 0, 1, 2).setValues([['Last ' + label, value]]);
}

function page_(title, body) {
  var html = '<!doctype html><html dir="rtl"><head><meta charset="utf-8"><title>' + title + '</title><style>' +
    'body{font:15px/1.6 Arial,sans-serif;max-width:720px;margin:32px auto;padding:0 16px;color:#111}' +
    'h2{margin:0 0 12px}table{border-collapse:collapse}td,th{border:1px solid #ddd;padding:6px 12px;text-align:center}' +
    'th{background:#ffe900}.bm{display:inline-block;background:#ffe900;color:#111;font-weight:bold;padding:10px 18px;border-radius:8px;text-decoration:none}' +
    'textarea{width:100%;height:120px;direction:ltr;font:11px monospace}.muted{color:#777}</style></head><body><h2>' + title + '</h2>' + body + '</body></html>';
  return HtmlService.createHtmlOutput(html).setTitle(title).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function norm_(v) { return String(v === null || v === undefined ? '' : v).trim().toLowerCase(); }
function toNumber_(v) { return typeof v === 'number' ? v : Number(String(v || '').replace(/,/g, '')) || 0; }
function pad_(n) { return (n < 10 ? '0' : '') + n; }
function fmt_(n) { return n === null || n === undefined ? '—' : Number(n).toLocaleString('en-US'); }
function now_(ss) { return Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm'); }
