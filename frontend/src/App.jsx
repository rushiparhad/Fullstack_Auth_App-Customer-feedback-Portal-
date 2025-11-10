import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ProductFeedback from "./pages/ProductFeedback.jsx";
import Admin from "./pages/Admin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

export default function App() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">Customer Feedback Portal</div>
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggle} title="Toggle theme">
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          {user?.role === "admin" && <Link to="/admin" className="btn-outline">Admin</Link>}
          {user ? (
            <>
              <span className="welcome">Hi, {user.name}</span>
              <button className="btn-outline" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductFeedback /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <footer className="footer">© {new Date().getFullYear()} Feedback Inc.</footer>
    </div>
  );
}
