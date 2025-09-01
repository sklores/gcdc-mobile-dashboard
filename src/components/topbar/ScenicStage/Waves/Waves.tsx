// src/components/topbar/ScenicStage/Waves/Waves.tsx
export default function Waves() {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          background: "linear-gradient(180deg, rgba(189,219,230,0.6) 0%, rgba(189,219,230,0.1) 100%)",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
        aria-hidden
      />
    );
  }