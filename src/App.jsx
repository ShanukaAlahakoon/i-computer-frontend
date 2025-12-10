import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import AdminPage from "./pages/adminPage.jsx";
import TestPage from "./pages/test.jsx";
import ForgetPasswordPage from "./pages/forgetPasswordPage.jsx";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="w-full h-screen bg-primary text-secondary">
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
