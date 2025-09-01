// src/components/topbar/BorderFrame/BorderFrame.tsx
export default function BorderFrame({ children }: { children: React.ReactNode }) {
    return (
      <div
        style={{
          background: "#fff",
          color: "#2A2C34",
          border: "1px solid #E1E2E6",
          borderRadius: 16,
          padding: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
          marginBottom: 12,
        }}
      >
        {children}
      </div>
    );
  }