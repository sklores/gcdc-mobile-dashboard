// src/components/dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import { fetchSheetValues } from "../../features/data/sheets/fetch";

// simple helpers
const toNum = (v: unknown) => {
  const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : null;
};
const fmtUSD = (n: number | null) =>
  n == null ? "—" : n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtPct = (n: number | null) =>
  n == null ? "—" : `${Math.round(n)}%`;

export default function Dashboard() {
  // live KPI state
  const [sales, setSales] = useState<number | null>(null);       // B2
  const [cogs, setCogs] = useState<number | null>(null);         // B3
  const [labor, setLabor] = useState<number | null>(null);       // B4
  const [netProfit, setNetProfit] = useState<number | null>(null); // B12

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const rows = await fetchSheetValues(); // RANGE A2:G17 → rows[0] is A2.., rows[10] is A12..
        setSales(toNum(rows?.[0]?.[1]));      // B2
        setCogs(toNum(rows?.[1]?.[1]));       // B3
        setLabor(toNum(rows?.[2]?.[1]));      // B4
        setNetProfit(toNum(rows?.[10]?.[1])); // B12
      } catch (e: any) {
        setErr(String(e?.message || e));
        setSales(null); setCogs(null); setLabor(null); setNetProfit(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // shared card style (Pastel / Pill / Soft)
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
  const title: React.CSSProperties = { fontWeight: 800, fontSize: 16, marginBottom: 8 };

  return (
    <main className="main">
      <h1 style={{ margin: "12px 0 16px" }}>Innovue Dashboard</h1>

      {/* Sales */}
      <section style={shell}>
        <div style={title}>Sales</div>
        <div style={bar("#C1DCEE")}>
          {loading ? "Syncing…" : err ? "Error" : fmtUSD(sales)}
        </div>
      </section>

      {/* COGS + Labor row (two-up) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <section style={shell}>
          <div style={title}>COGS</div>
          <div style={bar("#F8D5AA")}>
            {loading ? "…" : err ? "Error" : fmtPct(cogs)}
          </div>
        </section>

        <section style={shell}>
          <div style={title}>Labor</div>
          <div style={bar("#C1DCEE")}>
            {loading ? "…" : err ? "Error" : fmtPct(labor)}
          </div>
        </section>
      </div>

      {/* Net Profit */}
      <section style={{ ...shell, marginTop: 16 }}>
        <div style={title}>Net Profit</div>
        <div style={bar("#F9F1C7")}>
          {loading ? "Syncing…" : err ? "Error" : fmtUSD(netProfit)}
        </div>
      </section>
    </main>
  );
}