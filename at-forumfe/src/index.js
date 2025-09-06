import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { AuthProvider } from "./components/authenticationContext";
import { LikeProvider } from "./components/likedContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LikeProvider>
          <App />
        </LikeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
