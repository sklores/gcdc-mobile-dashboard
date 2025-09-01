// src/components/topbar/ScenicStage/Birds/Birds.tsx
export default function Birds() {
    // static flock placeholder (3 dots)
    const dot = (x: number) => (
      <span key={x} style={{ marginLeft: 6, fontSize: 8, opacity: 0.7 }}>•</span>
    );
    return (
      <div style={{ position: "absolute", top: 12, left: 14, color: "#2A2C34" }}>
        {Array.from({ length: 3 }).map((_, i) => dot(i))}
      </div>
    );
  }