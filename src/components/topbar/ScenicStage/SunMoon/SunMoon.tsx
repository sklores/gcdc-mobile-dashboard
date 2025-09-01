// src/components/topbar/ScenicStage/SunMoon/SunMoon.tsx
export default function SunMoon() {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const icon = isDay ? "☀️" : "🌙";
    return (
      <div
        style={{
          position: "absolute",
          top: 6,
          right: 8,
          fontSize: 18,
          opacity: 0.9,
          userSelect: "none",
        }}
        aria-hidden
      >
        {icon}
      </div>
    );
  }