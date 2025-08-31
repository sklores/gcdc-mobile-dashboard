// src/components/bottombar/RefreshButton/RefreshButton.tsx
export default function RefreshButton() {
    return (
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: "10px 14px",
          borderRadius: 12,
          border: "1px solid #E1E2E6",
          background: "#fff",
          fontWeight: 800
        }}
      >
        Refresh
      </button>
    );
  }