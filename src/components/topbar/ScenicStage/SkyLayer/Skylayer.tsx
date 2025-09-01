// src/components/topbar/ScenicStage/SkyLayer/SkyLayer.tsx
export default function SkyLayer() {
    // pastel daypart gradient (simple time-based)
    const hour = new Date().getHours();
    const grad =
      hour < 6
        ? "linear-gradient(180deg, #1a1e2a 0%, #2a2f3d 100%)"      // night
        : hour < 12
        ? "linear-gradient(180deg, #FFEDE1 0%, #E6F3FF 100%)"     // morning
        : hour < 18
        ? "linear-gradient(180deg, #E6F3FF 0%, #F0F8FF 100%)"     // afternoon
        : "linear-gradient(180deg, #FCE2E2 0%, #EDEBF7 100%)";    // dusk
  
    return (
      <div
        style={{
          height: 60,
          borderRadius: 12,
          background: grad,
          position: "relative",
          overflow: "hidden",
        }}
      />
    );
  }