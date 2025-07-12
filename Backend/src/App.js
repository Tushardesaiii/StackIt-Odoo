import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/erored.js"

import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/Question.routes.js";
import answerRoutes from "./routes/answer.routes.js";
import voteRoutes from "./routes/vote.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", userRoutes); // Handles: register, login, guest-login, refresh-token, me, logout
app.use("/api/v1/questions", questionRoutes); // Handles: ask, get, update, delete questions
app.use("/api/v1/answers", answerRoutes); // Handles: answer questions, edit, delete
app.use("/api/v1/votes", voteRoutes); // Handles: upvote/downvote
app.use("/api/v1/notifications", notificationRoutes); // Handles: fetch & mark notifications

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to StackIt API!");
});

// Error middleware (must be last)
app.use(errorMiddleware);

export default app;
