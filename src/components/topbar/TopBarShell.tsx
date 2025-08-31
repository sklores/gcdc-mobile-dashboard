// src/components/topbar/TopBarShell.tsx
import TabBar from "./TabBar/TabBar";

export default function TopBarShell() {
  return (
    <header
      style={{
        background: "#fff",
        color: "#2A2C34",
        border: "1px solid #E1E2E6",
        borderRadius: 16,
        padding: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
        marginBottom: 12
      }}
    >
      {/* Scenic area placeholder (logo slot) */}
      <div style={{
        height: 60, borderRadius: 12, border: "1px dashed #E1E2E6",
        display:"flex", alignItems:"center", justifyContent:"center",
        marginBottom: 10
      }}>
        <strong>Innovue</strong> • Scenic TopBar
      </div>

      {/* Tab bar strip */}
      <TabBar view="Day" onRefresh={() => window.location.reload()} />
    </header>
  );
}