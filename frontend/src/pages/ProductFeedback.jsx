import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiAuth } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProductFeedback(){
  const { user } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title:"", message:"", rating:5 });

  const loadProduct = async () => {
    const { data } = await apiAuth.get("/products");
    const p = data.products.find(x=>x.id===id);
    setProduct(p);
  };
  const loadFeedback = async () => {
    const { data } = await apiAuth.get(`/feedback/product/${id}`);
    setList(data);
  };
  useEffect(()=>{ loadProduct(); loadFeedback(); }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await apiAuth.post("/feedback", { productId:id, productName:product.name, segment:product.segment, ...form, rating:Number(form.rating) });
    setForm({ title:"", message:"", rating:5 });
    await loadFeedback();
  };
  const remove = async (fid) => {
    await apiAuth.delete(`/feedback/${fid}`); await loadFeedback();
  };

  if(!product) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="product-img" style={{maxHeight:220, objectFit:"cover", borderRadius:12, marginBottom:12}} />
      <h2>{product.name}</h2>
      <p className="muted">{product.segment}</p>

      <form onSubmit={submit} className="form">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <textarea placeholder="Message" rows={3} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required />
        <label className="inline">Rating:
          <select value={form.rating} onChange={e=>setForm({...form, rating:Number(e.target.value)})}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <button className="btn-primary" type="submit">Send</button>
      </form>

      <ul className="list" style={{marginTop:16}}>
        {list.map(item => (
          <li key={item._id} className="list-item">
            <div>
              <div className="item-title">{item.title} <span className="badge">★ {item.rating}</span></div>
              <div className="item-sub">{item.message}</div>
              <div className="item-meta">{item.user?.name} • {new Date(item.createdAt).toLocaleString()}</div>
            </div>
            <div className="actions">
              {item.user?._id === user?.id && <button className="btn-outline" onClick={()=>remove(item._id)}>Delete</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
