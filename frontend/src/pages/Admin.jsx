import React, { useEffect, useMemo, useState } from "react";
import { apiAuth } from "../services/api.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function Admin(){
  const [list, setList] = useState([]);
  const [reply, setReply] = useState({});
  const load = async ()=>{ const {data} = await apiAuth.get("/feedback"); setList(data); };
  useEffect(()=>{ load(); }, []);
  const setStatus = async (id, status)=>{ await apiAuth.patch(`/feedback/${id}/status`, {status}); await load(); };
  const sendReply = async (id)=>{ const message=reply[id]; if(!message) return; await apiAuth.post(`/feedback/${id}/reply`, {message}); setReply(r=>({...r,[id]:""})); await load(); };

  const byProduct = useMemo(()=>{
    const map={}; list.forEach(f=>{ map[f.productName]=(map[f.productName]||0)+1; });
    return Object.entries(map).map(([name,count])=>({name,count}));
  },[list]);
  const byStatus = useMemo(()=>{
    const map={open:0,in_progress:0,resolved:0}; list.forEach(f=>{ map[f.status]=(map[f.status]||0)+1; });
    return Object.entries(map).map(([name,value])=>({name,value}));
  },[list]);

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>
      <p className="muted">Manage feedback across all products</p>

      <div className="charts">
        <div className="chart-card">
          <h3>Feedback Count per Product</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byProduct}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Feedback by Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" outerRadius={100}>
                {byStatus.map((entry, i)=>(<Cell key={i} />))}
              </Pie>
              <Legend /><Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ul className="list" style={{marginTop:16}}>
        {list.map(item => (
          <li key={item._id} className="list-item">
            <div style={{flex:1}}>
              <div className="item-title">{item.productName} • {item.title} <span className="badge">★ {item.rating}</span></div>
              <div className="item-sub">{item.message}</div>
              <div className="item-meta"><strong>{item.segment}</strong> • Status: <strong>{item.status}</strong> • by {item.user?.name} ({item.user?.email})</div>
              {item.replies?.length>0 && (
                <div className="item-sub" style={{marginTop:6}}>
                  <div>Replies:</div>
                  <ul style={{margin:0, paddingLeft:18}}>
                    {item.replies.map((r,idx)=>(<li key={idx} className="muted">— {r.message}</li>))}
                  </ul>
                </div>
              )}
            </div>
            <div style={{minWidth:220}}>
              <select value={item.status} onChange={e=>setStatus(item._id, e.target.value)}>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <textarea rows={2} placeholder="Reply..." value={reply[item._id]||""} onChange={e=>setReply(v=>({...v,[item._id]:e.target.value}))} style={{marginTop:8,width:"100%"}} />
              <button className="btn-outline" onClick={()=>sendReply(item._id)} style={{marginTop:6}}>Send reply</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
