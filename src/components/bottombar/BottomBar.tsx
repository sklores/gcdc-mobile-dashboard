// src/components/bottombar/BottomBar.tsx
import DateTime from "./DateTime/DateTime";
import LastSync from "./LastSync/LastSync";
import ConnectionHealth from "./ConnectionHealth/ConnectionHealth";
import RefreshButton from "./RefreshButton/RefreshButton";

export default function BottomBar({
  lastSync,
  ok
}: {
  lastSync: Date | null;
  ok: boolean;
}) {
  return (
    <footer
      style={{
        position: "sticky",
        bottom: 0,
        background: "#fff",
        color: "#2A2C34",
        border: "1px solid #E1E2E6",
        borderRadius: 16,
        padding: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // iOS safe area
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
        marginTop: 16
      }}
    >
      <div style={{ fontSize: 12, display: "flex", gap: 12 }}>
        <DateTime />
        <span style={{ color: "#787D85" }}>•</span>
        <LastSync at={lastSync} />
        <span style={{ color: "#787D85" }}>•</span>
        <ConnectionHealth ok={ok} />
      </div>
      <RefreshButton />
    </footer>
  );
}