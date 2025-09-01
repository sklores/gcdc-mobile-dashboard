// src/components/topbar/TopBarShell.tsx
import BorderFrame from "./BorderFrame/BorderFrame";
import ClientLogo from "./ClientLogo/ClientLogo";
import ScenicStage from "./ScenicStage";
import TabBar from "./TabBar/TabBar";

export default function TopBarShell() {
  return (
    <BorderFrame>
      {/* top row: logo centered */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <ClientLogo />
      </div>

      {/* scenic stage */}
      <ScenicStage />

      {/* tab strip */}
      <div style={{ marginTop: 10 }}>
        <TabBar view="Day" onRefresh={() => window.location.reload()} />
      </div>
    </BorderFrame>
  );
}