import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const app = express();

// ✅ Enable CORS to prevent frontend request blocking
app.use(cors({ origin: "http://localhost:5174", credentials: true }));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// ✅ Global Error Handling Middleware
app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(3000, () => console.log("🚀 Server is running on port 3000!"));
