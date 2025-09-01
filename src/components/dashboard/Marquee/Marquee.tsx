// src/components/dashboard/Marquee/Marquee.tsx
// Mobile marquee shell (pastel pill + smooth scroll)

export default function Marquee({
    text,
    speedSec = 80,
  }: {
    text: string;
    speedSec?: number;
  }) {
    const clean = (text || "").trim();
    if (!clean) return null;
  
    return (
      <div style={{ marginTop: 12 }}>
        <style>{`
          @keyframes innovue_marquee_loop {
            0% { transform: translateX(0%) }
            100% { transform: translateX(-100%) }
          }
        `}</style>
  
        <div
          style={{
            borderRadius: 14,
            background: "#CCBAF6",         // pastel lavender (tokens doc)
            color: "#0b2540",
            boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", overflow: "hidden", padding: "12px 0" }}>
            <div
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                willChange: "transform",
                animation: `innovue_marquee_loop ${speedSec}s linear infinite`,
              }}
            >
              <span style={{ display: "inline-block", paddingRight: 80, fontSize: 16, fontWeight: 600, letterSpacing: 0.2 }}>
                {clean}
              </span>
              {/* repeat once so the loop looks seamless */}
              <span style={{ display: "inline-block", paddingRight: 80, fontSize: 16, fontWeight: 600, letterSpacing: 0.2 }}>
                {clean}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }