import React, { useEffect, useState } from "react";
import { apiAuth } from "../services/api.js";
import { Link } from "react-router-dom";

export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{ apiAuth.get("/products").then(res=>setProducts(res.data.products)); }, []);
  return (
    <div className="card">
      <h2>Select a Product</h2>
      <p className="muted">Click a product to view & submit feedback</p>
      <div className="grid-cards">
        {products.map(p => (
          <Link key={p.id} className="product-card" to={`/product/${p.id}`}>
            <img src={p.image} alt={p.name} className="product-img" />
            <div className="product-meta">
              <div className="product-name">{p.name}</div>
              <div className="muted">{p.segment}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
