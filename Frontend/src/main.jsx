import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import { UserProvider } from "./context/UserContext";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={
        import.meta.env
          .VITE_GOOGLE_CLIENT_ID
      }
    >
      <BrowserRouter>
        <UserProvider>
          <App />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,

              style: {
                borderRadius: "14px",
              },
            }}
          />
        </UserProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);