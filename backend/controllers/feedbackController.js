import Feedback from "../models/Feedback.js";
import User from "../models/User.js";
import { sendReplyEmail } from "../utils/mailer.js";

export const createFeedback = async (req,res) => {
  const { productId,productName,segment,title,message,rating } = req.body;
  if(!productId||!productName||!segment||!title||!message||!rating)
    return res.status(400).json({message:"All fields are required"});
  const fb = await Feedback.create({ user:req.user.id, productId, productName, segment, title, message, rating });
  res.status(201).json(fb);
};

export const listByProduct = async (req,res) => {
  const { productId } = req.params;
  const items = await Feedback.find({productId}).populate("user","name email").sort({createdAt:-1});
  res.json(items);
};

export const listAll = async (req,res) => {
  const items = await Feedback.find().populate("user","name email").sort({createdAt:-1});
  res.json(items);
};

export const updateStatus = async (req,res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed=["open","in_progress","resolved"];
  if(!allowed.includes(status)) return res.status(400).json({message:"Invalid status"});
  const fb = await Feedback.findById(id);
  if(!fb) return res.status(404).json({message:"Feedback not found"});
  fb.status = status;
  await fb.save();
  res.json(fb);
};

export const adminReply = async (req,res) => {
  const { id } = req.params;
  const { message } = req.body;
  if(!message) return res.status(400).json({message:"Reply message required"});
  const fb = await Feedback.findById(id);
  if(!fb) return res.status(404).json({message:"Feedback not found"});
  fb.replies.push({ admin:req.user.id, message });
  await fb.save();
  try{
    const user = await User.findById(fb.user).select("email");
    if(user?.email){
      await sendReplyEmail({ to:user.email, productName:fb.productName, title:fb.title, reply:message });
    }
  }catch(e){ console.warn("[mailer] skip:", e.message); }
  res.json(fb);
};

export const removeFeedback = async (req,res) => {
  const { id } = req.params;
  const del = await Feedback.findOneAndDelete({ _id:id, user:req.user.id });
  if(!del) return res.status(404).json({message:"Feedback not found"});
  res.json({ message:"Deleted" });
};
