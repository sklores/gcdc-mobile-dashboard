// src/components/dashboard/KpiTiles/NetProfitBar/NetProfitBar.tsx
// Reusable NetProfitBar — pastel red→amber→green by score/targets (higher is better).

type Unit = "$" | "%" | "";

// helpers
const toNum = (v: unknown) => {
  const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : null;
};
const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

// pastel ramp
const PASTEL = { red: "#F6C1C1", amber: "#F8D5AA", green: "#C6E2D6" };
const scoreToPastel = (s: number) => (s >= 70 ? PASTEL.green : s >= 40 ? PASTEL.amber : PASTEL.red);

// compute score using optional green/red targets (higher is better)
function computeScore({
  value, unit, greenAt, redAt,
}: { value: number | null; unit: Unit; greenAt?: number | null; redAt?: number | null; }) {
  if (value == null) return 0;
  const G = toNum(greenAt ?? null);
  const R = toNum(redAt ?? null);
  if (G != null && R != null && G !== R) {
    const t = (value - R) / (G - R);
    return clamp(Math.round(t * 100));
  }
  return value > 0 ? 75 : 25;
}

export default function NetProfitBar({
  value,
  greenAt,
  redAt,
  unit = "$",
  loading,
  err,
}: {
  value: number | null;
  greenAt?: number | null;
  redAt?: number | null;
  unit?: Unit;
  loading: boolean;
  err: string | null;
}) {
  const shown =
    value == null
      ? "—"
      : value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const score = computeScore({ value, unit, greenAt, redAt });
  const bg = scoreToPastel(score);

  return (
    <section
      style={{
        background: "#fff",
        color: "#2A2C34",
        border: "1px solid #E1E2E6",
        borderRadius: 16,
        padding: 14,
        boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Net Profit</div>
      <div
        style={{
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
        }}
      >
        {loading ? "Syncing…" : err ? "Error" : shown}
      </div>
    </section>
  );
}