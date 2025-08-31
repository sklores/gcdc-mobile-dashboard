// src/components/dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import { fetchSheetValues } from "../../features/data/sheets/fetch";

export default function Dashboard() {
  const [sales, setSales] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const rows = await fetchSheetValues();   // RANGE A2:G17
        // B2 -> rows[0][1]
        const raw = rows?.[0]?.[1];
        const n = Number(String(raw).replace(/[^\d.-]/g, ""));
        setSales(Number.isFinite(n) ? n : null);
      } catch (e: any) {
        setErr(String(e?.message || e));
        setSales(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const display = sales == null ? "—" :
    sales.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <main className="main">
      <h1 style={{ margin: "12px 0 16px" }}>Innovue Dashboard</h1>

      <section
        style={{
          background: "#fff",
          color: "#2A2C34",
          border: "1px solid #E1E2E6",
          borderRadius: 16,
          padding: 14,
          boxShadow: "0 2px 10px rgba(0,0,0,0.18)"
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Sales</div>
        <div style={{
          height: 64, display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: 12, background: "#C1DCEE", color: "#0b2540",
          fontWeight: 900, fontSize: 24, letterSpacing: 0.3
        }}>
          {loading ? "Syncing…" : err ? "Error" : display}
        </div>
      </section>
    </main>
  );
}