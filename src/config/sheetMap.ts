// KPI → Google Sheets A1 ranges (from guide/sketch; fill later)
// Day/Week/Month tabs will map to these same cells on each tab.

export const SHEET_MAP = {
    SALES:        "", // e.g., 'Day!B2'
    LABOR:        "", // e.g., 'Day!B3'
    COGS:         "", // e.g., 'Day!B4'
    PRIME_COST:   "", // (Labor + COGS)
    BANK_BAL:     "", // e.g., 'Day!B5'
    ONLINE_VIEWS: "", // e.g., 'Day!B6'
    NET_PROFIT:   "", // e.g., 'Day!B7'
    REVIEW_SCORE: ""  // e.g., 'Day!B8'
  };
  
  // Notes:
  // - We’ll switch the sheet name (Day/Week/Month) via the TabBar later.
  // - Ranges match the dashboard order: Sales → 2×3 grid → Net Profit → Live Feed.