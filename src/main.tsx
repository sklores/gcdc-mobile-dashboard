import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";   // <-- updated path
import "./index.css";              // ok to keep for now

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);