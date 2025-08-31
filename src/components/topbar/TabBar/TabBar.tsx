// src/components/topbar/TabBar/TabBar.tsx
type View = "Day" | "Week" | "Month";

export default function TabBar({
  view = "Day",
  onChange,
  onRefresh
}: {
  view?: View;
  onChange?: (v: View) => void;
  onRefresh?: () => void;
}) {
  const btn = (active: boolean): React.CSSProperties => ({
    padding: "8px 12px",
    borderRadius: 10,
    fontWeight: 800,
    fontSize: 14,
    color: active ? "#0b2540" : "#787D85",
    background: active ? "#E1F3FF" : "transparent",
    border: active ? "1px solid #B7DFFF" : "1px solid #E1E2E6",
  });
  const Row = ({v}:{v:View}) => (
    <button onClick={() => onChange?.(v)} style={btn(view === v)}>{v}</button>
  );
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
      <div style={{ display:"flex", gap:8 }}>
        <Row v="Day" />
        <Row v="Week" />
        <Row v="Month" />
      </div>
      <button
        onClick={onRefresh}
        style={{ padding:"8px 12px", borderRadius:10, border:"1px solid #E1E2E6", fontWeight:800 }}
      >
        Refresh
      </button>
    </div>
  );
}