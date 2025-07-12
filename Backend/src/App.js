import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./DB/index.js"; // make sure this is a default export

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Add your routes here
// app.use("/api/v1/auth", authRoutes);

export default app;
