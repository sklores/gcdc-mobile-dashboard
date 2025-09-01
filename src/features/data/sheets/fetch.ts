// src/features/data/sheets/fetch.ts
import { buildSheetsURL } from "../../../config/sheetMap";

export type SheetRows = string[][];

/** Fetches RANGE (A2:G17) as rows */
export async function fetchSheetValues(noCache = true): Promise<SheetRows> {
  const url = buildSheetsURL();
  const res = await fetch(url, { cache: noCache ? "no-store" : "default" });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      if (j?.error?.message) msg += ` — ${j.error.message}`;
    } catch {}
    throw new Error(msg);
  }

  const json = await res.json();
  return (json?.values ?? []) as SheetRows;
}

/** Helper to safely read a cell from the fetched rows */
export function getCell(
  rows: SheetRows,
  rowIndex: number,
  colIndex: number
): string | null {
  const v = rows?.[rowIndex]?.[colIndex];
  return v == null ? null : String(v);
}