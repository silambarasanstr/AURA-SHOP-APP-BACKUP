import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppProviders from "./app/AppProviders";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
      <Toaster position="top-right" />
    </AppProviders>
  </StrictMode>
);
