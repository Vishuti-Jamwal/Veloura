import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import voterAuthRoutes from "./routes/authRoutes.js";



dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/voter", voterAuthRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
