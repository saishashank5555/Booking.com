import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ErrorBoundary } from "./ErrorBoundary.jsx";
import { AuthProvider } from "./lib/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  </BrowserRouter>
);
