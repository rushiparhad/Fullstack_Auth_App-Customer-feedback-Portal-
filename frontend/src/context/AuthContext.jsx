import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);
export function AuthProvider({ children }){
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const setAuth = (tk, usr) => {
    setToken(tk); setUser(usr);
    localStorage.setItem("token", tk);
    localStorage.setItem("user", JSON.stringify(usr));
  };
  const logout = () => {
    setToken(null); setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return <AuthContext.Provider value={{ token, user, setAuth, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
