import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id:false });

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: String, required: true, index: true },
  productName: { type: String, required: true },
  segment: { type: String, enum: ["Electronics","Food","Sport","Automobiles"], required: true },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  status: { type: String, enum: ["open","in_progress","resolved"], default: "open" },
  replies: { type: [replySchema], default: [] }
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
