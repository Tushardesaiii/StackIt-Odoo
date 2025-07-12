import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  guestLogin,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js"; // ✅ consistent

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/guest-login", guestLogin);
router.post("/refresh-token", refreshAccessToken);

// Protected routes
router.get("/me", verifyJWT, getCurrentUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;
