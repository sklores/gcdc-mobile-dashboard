// src/components/dashboard/Dashboard.tsx
// New build — mobile-only dashboard workbench
// - Reads KPI rows from Sheets (A2:G17)
// - Maps KPIs by LABEL text (column A) so row order can change
// - Pastel red→amber→green backgrounds by score/targets
// - Day view only for now

import { useEffect, useMemo, useState } from "react";
import { fetchSheetValues } from "../../features/data/sheets/fetch";

// ---------- helpers ----------
const toNum = (v: unknown) => {
  const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : null;
};
const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

// formatters
const fmtUSD = (n: number | null) =>
  n == null ? "—" : n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtPct = (n: number | null) => (n == null ? "—" : `${Math.round(n)}%`);
const fmtInt = (n: number | null) => (n == null ? "—" : n.toLocaleString("en-US"));

type Unit = "$" | "%" | "";

// pastel traffic-light colors
const PASTEL = { red: "#F6C1C1", amber: "#F8D5AA", green: "#C6E2D6" };
const scoreToPastel = (score: number) => (score >= 70 ? PASTEL.green : score >= 40 ? PASTEL.amber : PASTEL.red);

// compute score with optional green/red targets
function computeScore(opts: {
  value: number | null;
  unit: Unit;
  higherIsBetter: boolean;
  greenAt?: number | null;
  redAt?: number | null;
}): number {
  const { value, unit, higherIsBetter, greenAt, redAt } = opts;
  if (value == null) return 0;

  const G = toNum(greenAt ?? null);
  const R = toNum(redAt ?? null);
  if (G != null && R != null && G !== R) {
    let t = higherIsBetter ? (value - R) / (G - R) : (R - value) / (R - G);
    return clamp(Math.round(t * 100));
  }

  if (unit === "%") return clamp(Math.round(higherIsBetter ? value : 100 - value));
  return value > 0 ? 75 : 25;
}

// ---------- component ----------
export default function Dashboard() {
  const [rows, setRows] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const r = await fetchSheetValues(); // A2:G17
        setRows(r || []);
      } catch (e: any) {
        setErr(String(e?.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Old build’s 9 KPI rows (0-based within A2:G17)
  const kpiRowIdx = [0, 1, 2, 3, 4, 5, 8, 9, 10];

  type KpiRow = {
    label: string;         // A
    value: number | null;  // B
    greenAt: number | null;// C
    redAt: number | null;  // D
    unit: Unit;            // F ("$", "%", or "")
  };

  const kpis = useMemo(() => {
    const out: KpiRow[] = [];
    for (const idx of kpiRowIdx) {
      const r = rows[idx] || [];
      const label = String(r[0] ?? "").trim();
      if (!label) continue;
      const unitToken = String(r[5] ?? "").trim().toLowerCase();
      const unit: Unit =
        unitToken === "$" || unitToken === "usd" || unitToken === "dollar"
          ? "$"
          : unitToken === "%"
          ? "%"
          : "";
      out.push({
        label,
        value: toNum(r[1]),
        greenAt: toNum(r[2]),
        redAt: toNum(r[3]),
        unit,
      });
    }
    return out;
  }, [rows]);

  // Map by label text (case/space-insensitive)
  const byLabel = useMemo(() => {
    const map = new Map<string, KpiRow>();
    const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
    for (const k of kpis) map.set(norm(k.label), k);
    const get = (...names: string[]): KpiRow | undefined => {
      for (const raw of names) {
        const k = map.get(norm(raw));
        if (k) return k;
      }
      return undefined;
    };
    return { get };
  }, [kpis]);

  // Resolve KPIs by friendly names (aliases supported)
  const sales     = byLabel.get("sales");
  const cogs      = byLabel.get("cogs", "cost of goods", "cost of goods sold");
  const labor     = byLabel.get("labor", "labour");
  const prime     = byLabel.get("prime", "prime cost");
  const bank      = byLabel.get("bank", "bank balance");
  const online    = byLabel.get("online views", "views", "online");
  const review    = byLabel.get("review score", "reviews", "rating");
  const netProfit = byLabel.get("net profit", "profit");

  // shared styles (Pastel / Pill / Soft)
  const shell: React.CSSProperties = {
    background: "#fff",
    color: "#2A2C34",
    border: "1px solid #E1E2E6",
    borderRadius: 16,
    padding: 14,
    boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
  };
  const bar = (bg: string): React.CSSProperties => ({
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    background: bg,
    color: "#0b2540",
    fontWeight: 900,
    fontSize: 24,
    letterSpacing: 0.3,
  });
  const titleStyle: React.CSSProperties = { fontWeight: 800, fontSize: 16, marginBottom: 8 };

  const KpiCard = ({
    title,
    row,
    higherIsBetter,
  }: {
    title: string;
    row: KpiRow | undefined;
    higherIsBetter: boolean;
  }) => {
    const value = row?.value ?? null;
    const unit: Unit = row?.unit ?? "";
    const score = computeScore({
      value,
      unit,
      higherIsBetter,
      greenAt: row?.greenAt ?? null,
      redAt: row?.redAt ?? null,
    });
    const bg = scoreToPastel(score);
    const shown =
      unit === "$" ? fmtUSD(value) : unit === "%" ? fmtPct(value) : fmtInt(value);

    return (
      <section style={shell}>
        <div style={titleStyle}>{title}</div>
        <div style={bar(bg)}>{loading ? "Syncing…" : err ? "Error" : shown}</div>
      </section>
    );
  };

  return (
    <main className="main">
      <h1 style={{ margin: "12px 0 16px" }}>Innovue Dashboard</h1>

      {/* Sales (higher better) */}
      <KpiCard title="Sales" row={sales} higherIsBetter />

      {/* COGS + Labor (lower better) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <KpiCard title="COGS" row={cogs} higherIsBetter={false} />
        <KpiCard title="Labor" row={labor} higherIsBetter={false} />
      </div>

      {/* Prime (lower better) + Bank (higher better) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <KpiCard title="Prime" row={prime} higherIsBetter={false} />
        <KpiCard title="Bank" row={bank} higherIsBetter />
      </div>

      {/* Online Views + Review Score (higher better) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <KpiCard title="Online Views" row={online} higherIsBetter />
        <KpiCard title="Review Score" row={review} higherIsBetter />
      </div>

      {/* Net Profit (higher better) */}
      <div style={{ marginTop: 16, marginBottom: 24 }}>
        <KpiCard title="Net Profit" row={netProfit} higherIsBetter />
      </div>
    </main>
  );
}