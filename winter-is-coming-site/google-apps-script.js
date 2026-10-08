// Paste this into Extensions → Apps Script of your RSVP Google Sheet.
// Each RSVP sent from the website becomes a new row in the "RSVPs" tab.

const SHEET_NAME = 'RSVPs';
const HEADERS = ['Submitted', 'Name', 'Attending', 'Guests', 'Arrival guess', 'Wish'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    const p = (e && e.parameter) || {};
    sheet.appendRow([
      new Date(),
      clean(p.name),
      clean(p.attending),
      Number(p.guests) || 0,
      clean(p.guess),
      clean(p.wish)
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Keeps guest text from being treated as a spreadsheet formula, and caps its length.
function clean(value) {
  let s = String(value || '').slice(0, 1000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}
