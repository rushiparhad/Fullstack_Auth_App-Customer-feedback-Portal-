import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import { ensureAdminUser } from "./utils/seedAdmin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ORIGIN, credentials: true }));

connectDB().then(ensureAdminUser);

app.get("/", (req,res)=>res.json({status:"OK", message:"Customer Feedback Portal API"}));

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/feedback", feedbackRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
