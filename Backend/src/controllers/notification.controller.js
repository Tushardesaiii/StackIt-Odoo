import { Notification } from "../models/notification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Get all notifications for current user
export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id })
    .sort({ createdAt: -1 })
    .limit(30);

  res
    .status(200)
    .json(new ApiResponse(200, notifications, "Notifications fetched"));
});

// ✅ Mark all notifications as read
export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user._id, read: false },
    { $set: { read: true } }
  );

  res
    .status(200)
    .json(new ApiResponse(200, null, "All notifications marked as read"));
});

// ✅ Mark single notification as read
export const markNotificationRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findOneAndUpdate(
    { _id: id, recipient: req.user._id },
    { $set: { read: true } },
    { new: true }
  );

  if (!notification) throw new ApiError(404, "Notification not found");

  res
    .status(200)
    .json(new ApiResponse(200, notification, "Notification marked as read"));
});

// ✅ Create a notification (use internally from other controllers)
export const createNotification = async ({
  recipient,
  sender,
  message,
  link,
  type,
}) => {
  return await Notification.create({
    recipient,
    sender,
    message,
    link,
    type,
  });
};
