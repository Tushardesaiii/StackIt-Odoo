import { Tag } from "../models/tag.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new tag (Admin only, or you can allow users too)
export const createTag = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) throw new ApiError(400, "Tag name is required");

  const exists = await Tag.findOne({ name: name.toLowerCase() });
  if (exists) throw new ApiError(409, "Tag already exists");

  const tag = await Tag.create({
    name,
    description,
    createdBy: req.user?._id || null,
  });

  res.status(201).json(new ApiResponse(201, tag, "Tag created successfully"));
});

// Get all tags
export const getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find({}).sort({ name: 1 });
  res.status(200).json(new ApiResponse(200, tags, "Tags fetched successfully"));
});
