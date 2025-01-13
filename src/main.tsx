import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import InputComponent from "./InputComponent.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <InputComponent />
  </StrictMode>
);
