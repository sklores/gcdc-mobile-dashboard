// src/components/dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import { fetchSheetValues } from "../../features/data/sheets/fetch";

// helpers
const toNum = (v: unknown) => {
  const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : null;
};
const fmtUSD = (n: number | null) =>
  n == null ? "—" : n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtPct = (n: number | null) => (n == null ? "—" : `${Math.round(n)}%`);
const fmtInt = (n: number | null) => (n == null ? "—" : n.toLocaleString("en-US"));

export default function Dashboard() {
  // KPI state (Day view cells)
  const [sales, setSales] = useState<number | null>(null);       // B2
  const [cogs, setCogs] = useState<number | null>(null);         // B3
  const [labor, setLabor] = useState<number | null>(null);       // B4
  const [prime, setPrime] = useState<number | null>(null);       // B5
  const [bank, setBank] = useState<number | null>(null);         // B6
  const [online, setOnline] = useState<number | null>(null);     // B7
  const [review, setReview] = useState<number | null>(null);     // B11
  const [netProfit, setNetProfit] = useState<number | null>(null); // B12

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const rows = await fetchSheetValues(); // RANGE A2:G17 → rows[0] is row 2, rows[10] is row 12, etc.

        setSales(toNum(rows?.[0]?.[1]));      // B2
        setCogs(toNum(rows?.[1]?.[1]));       // B3
        setLabor(toNum(rows?.[2]?.[1]));      // B4
        setPrime(toNum(rows?.[3]?.[1]));      // B5
        setBank(toNum(rows?.[4]?.[1]));       // B6
        setOnline(toNum(rows?.[5]?.[1]));     // B7
        setReview(toNum(rows?.[9]?.[1]));     // B11 (rows[9] because A2 offset → row 11 = index 9)
        setNetProfit(toNum(rows?.[10]?.[1])); // B12 (index 10)
      } catch (e: any) {
        setErr(String(e?.message || e));
        setSales(null); setCogs(null); setLabor(null);
        setPrime(null); setBank(null); setOnline(null);
        setReview(null); setNetProfit(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
  const title: React.CSSProperties = { fontWeight: 800, fontSize: 16, marginBottom: 8 };

  const show = (node: React.ReactNode) => (loading ? "Syncing…" : err ? "Error" : node);

  return (
    <main className="main">
      <h1 style={{ margin: "12px 0 16px" }}>Innovue Dashboard</h1>

      {/* Sales */}
      <section style={shell}>
        <div style={title}>Sales</div>
        <div style={bar("#C1DCEE")}>{show(fmtUSD(sales))}</div>
      </section>

      {/* Row: COGS + Labor */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <section style={shell}>
          <div style={title}>COGS</div>
          <div style={bar("#F8D5AA")}>{show(fmtPct(cogs))}</div>
        </section>
        <section style={shell}>
          <div style={title}>Labor</div>
          <div style={bar("#C1DCEE")}>{show(fmtPct(labor))}</div>
        </section>
      </div>

      {/* Row: Prime + Bank */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <section style={shell}>
          <div style={title}>Prime</div>
          <div style={bar("#C6E2D6")}>{show(fmtPct(prime))}</div>
        </section>
        <section style={shell}>
          <div style={title}>Bank</div>
          <div style={bar("#BDDBE6")}>{show(fmtUSD(bank))}</div>
        </section>
      </div>

      {/* Row: Online Views + Review Score */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <section style={shell}>
          <div style={title}>Online Views</div>
          <div style={bar("#C1DCEE")}>{show(fmtInt(online))}</div>
        </section>
        <section style={shell}>
          <div style={title}>Review Score</div>
          <div style={bar("#CCBAF6")}>{show(fmtInt(review))}</div>
        </section>
      </div>

      {/* Net Profit */}
      <section style={{ ...shell, marginTop: 16, marginBottom: 24 }}>
        <div style={title}>Net Profit</div>
        <div style={bar("#F9F1C7")}>{show(fmtUSD(netProfit))}</div>
      </section>
    </main>
  );
}