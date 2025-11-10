import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const protect = async (req,res,next) => {
  try{
    const auth = req.headers.authorization || "";
    if(!auth.startsWith("Bearer ")) return res.status(401).json({message:"Not authorized"});
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if(!user) return res.status(401).json({message:"User not found"});
    req.user = user;
    next();
  }catch{
    return res.status(401).json({message:"Token invalid"});
  }
};
export const adminOnly = (req,res,next) => {
  if(req.user?.role!=="admin") return res.status(403).json({message:"Admin only"});
  next();
};
