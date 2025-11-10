import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login(){
  const nav = useNavigate();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const onSubmit = async (e)=>{
    e.preventDefault(); setError("");
    try{
      const { data } = await api.post("/auth/login", form);
      setAuth(data.token, data.user); nav("/");
    }catch(err){ setError(err?.response?.data?.message || "Login failed"); }
  };
  return (
    <div className="card">
      <h2>Welcome back</h2>
      <form onSubmit={onSubmit} className="form">
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        {error && <div className="error">{error}</div>}
        <button className="btn-primary" type="submit">Login</button>
      </form>
      <p className="muted">No account? <Link to="/signup">Create one</Link></p>
    </div>
  );
}
