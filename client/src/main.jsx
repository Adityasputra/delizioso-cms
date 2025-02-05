import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/great-vibes";
import "@fontsource/playfair-display";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer position="top-center" autoClose={3000} />
    <RouterProvider router={router} />
  </StrictMode>
);
