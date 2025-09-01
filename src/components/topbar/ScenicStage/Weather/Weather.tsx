// src/components/topbar/ScenicStage/Weather/Weather.tsx
// Placeholder: shows a small cloud icon; later we'll drive from live weather
export default function Weather() {
    return (
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          fontSize: 14,
          opacity: 0.8,
          userSelect: "none",
        }}
        aria-hidden
      >
        ☁️
      </div>
    );
  }