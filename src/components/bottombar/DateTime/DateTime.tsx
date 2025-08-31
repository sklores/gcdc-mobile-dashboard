// src/components/bottombar/DateTime/DateTime.tsx
import { useEffect, useState } from "react";

export default function DateTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return <span>{date} • {time}</span>;
}