import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup(){
  const nav = useNavigate();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [error, setError] = useState("");
  const onSubmit = async (e)=>{
    e.preventDefault(); setError("");
    try{
      const { data } = await api.post("/auth/signup", form);
      setAuth(data.token, data.user); nav("/");
    }catch(err){ setError(err?.response?.data?.message || "Signup failed"); }
  };
  return (
    <div className="card">
      <h2>Create account</h2>
      <form onSubmit={onSubmit} className="form">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required minLength={6} />
        {error && <div className="error">{error}</div>}
        <button className="btn-primary" type="submit">Sign up</button>
      </form>
      <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
