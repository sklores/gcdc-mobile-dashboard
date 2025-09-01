// src/components/bottombar/LastSync/LastSync.tsx
export default function LastSync({ at }: { at: Date | null }) {
    const label = at ? at.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "—";
    return <span>Last Sync: {label}</span>;
  }