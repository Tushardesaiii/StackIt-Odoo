import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js"; // ✅ Correct

import {
  getUserNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

// @route   GET /api/v1/notifications
// @desc    Get all notifications for current user
router.get("/", verifyJWT, getUserNotifications);

// @route   PATCH /api/v1/notifications/read-all
// @desc    Mark all notifications as read
router.patch("/read-all", verifyJWT, markAllNotificationsRead);

// @route   PATCH /api/v1/notifications/:id/read
// @desc    Mark single notification as read
router.patch("/:id/read", verifyJWT, markNotificationRead);

export default router;
