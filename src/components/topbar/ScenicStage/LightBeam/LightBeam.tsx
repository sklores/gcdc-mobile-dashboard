// src/components/topbar/ScenicStage/LightBeam/LightBeam.tsx
export default function LightBeam() {
    // static translucent triangle as a placeholder
    return (
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 26,
          width: 0,
          height: 0,
          borderLeft: "14px solid rgba(255,255,200,0.28)",
          borderTop: "10px solid transparent",
          borderBottom: "18px solid transparent",
          filter: "blur(0.3px)",
        }}
        aria-hidden
      />
    );
  }