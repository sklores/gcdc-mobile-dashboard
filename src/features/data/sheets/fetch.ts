// src/features/data/sheets/fetch.ts
import { buildSheetsURL } from "@/config/sheetMap";

export async function fetchSheetValues(): Promise<string[][]> {
  const url = buildSheetsURL();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      if (j?.error?.message) msg += ` — ${j.error.message}`;
    } catch {}
    throw new Error(msg);
  }
  const json = await res.json();
  return (json.values || []) as string[][];
}