

import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

//  Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

//  Protected Routes
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;
