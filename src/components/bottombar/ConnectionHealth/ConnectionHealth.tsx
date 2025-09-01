// src/components/bottombar/ConnectionHealth/ConnectionHealth.tsx
export default function ConnectionHealth({ ok }: { ok: boolean }) {
    const dot = {
      display: "inline-block",
      width: 8, height: 8, borderRadius: 999,
      marginRight: 6,
      background: ok ? "#38b000" : "#d00000"
    } as const;
    return <span><i style={dot} />{ok ? "OK" : "Error"}</span>;
  }