// lib/db.js

import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

 try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogApp");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
  }
};