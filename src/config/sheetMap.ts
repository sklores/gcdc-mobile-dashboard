// src/config/sheetMap.ts
// Central mapping of Google Sheets configuration → single source of truth

// ✅ Your confirmed working API key
export const API_KEY = "AIzaSyB35kXXoqnEO-m-w_pb0aMU8R-sWq4qf_s";

// ✅ Your spreadsheet ID (from the URL)
export const SPREADSHEET_ID = "1S_eFTn-Hg4nAfUjj4wZMG8pKK1WahxSTqR7ztx4rOnw";

// ✅ The exact tab name in that spreadsheet
export const SHEET_NAME = "GCDC Test Sheet";

// ✅ Range for KPIs + marquee cells
// A2:G17 covers:
//   - 9 KPI rows (labels, values, green/red thresholds, units)
//   - marquee texts (rows B8, B9, B15, B16, B17)
//   - speed control (G12)
export const RANGE = "A2:G17";

// Build the exact URL for fetch
export function buildSheetsURL() {
  const encoded = encodeURIComponent(`${SHEET_NAME}!${RANGE}`);
  return `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encoded}?key=${API_KEY}`;
}

// Row/column index map for downstream use (optional helper)
export const sheetMap = {
  kpiRows: [0, 1, 2, 3, 4, 5, 8, 9, 10], // which rows in RANGE map to KPI tiles
  marquee: {
    questions: 6, // B8
    reviews: 7,   // B9
    banking: 13,  // B15
    social: 14,   // B16
    news: 15,     // B17
  },
  speed: { row: 10, col: 6 }, // G12 (0-based offset inside RANGE)
};