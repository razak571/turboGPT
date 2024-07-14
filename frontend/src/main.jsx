import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASEURL;

axios.defaults.baseURL = backendBaseURL;
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "Outfit, serif",
    allVariants: { color: "white" },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position="top-center" />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
);
