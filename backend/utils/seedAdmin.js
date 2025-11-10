import bcrypt from "bcryptjs";
import User from "../models/User.js";
export const ensureAdminUser = async () => {
  try{
    const email = process.env.ADMIN_EMAIL || "rushinparhad@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "rushi";
    let admin = await User.findOne({ email });
    if(!admin){
      const hashed = await bcrypt.hash(password, 10);
      admin = await User.create({ name:"Admin", email, password:hashed, role:"admin" });
      console.log("[seed] Admin user created:", email);
    }else if(admin.role !== "admin"){
      admin.role = "admin"; await admin.save();
      console.log("[seed] Existing user upgraded to admin:", email);
    }else{
      console.log("[seed] Admin exists:", email);
    }
  }catch(e){
    console.error("Admin seed failed:", e.message);
  }
};
