import { Vote } from "../models/vote.model.js";
import { Question } from "../models/Question.model.js";
import { Answer } from "../models/answer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// POST /api/v1/votes
export const vote = asyncHandler(async (req, res) => {
  const { targetType, targetId, voteType } = req.body;

  if (!["Question", "Answer"].includes(targetType)) {
    throw new ApiError(400, "Invalid target type (must be 'Question' or 'Answer')");
  }

  if (!["upvote", "downvote"].includes(voteType)) {
    throw new ApiError(400, "Invalid vote type (must be 'upvote' or 'downvote')");
  }

  const existingVote = await Vote.findOne({
    user: req.user._id,
    targetType,
    targetId,
  });

  // If the same vote already exists → remove it (toggle)
  if (existingVote) {
    if (existingVote.voteType === voteType) {
      await existingVote.deleteOne();
      return res.status(200).json(new ApiResponse(200, null, "Vote removed"));
    } else {
      existingVote.voteType = voteType;
      await existingVote.save();
      return res.status(200).json(new ApiResponse(200, existingVote, "Vote updated"));
    }
  }

  // Create a new vote
  const newVote = await Vote.create({
    user: req.user._id,
    targetType,
    targetId,
    voteType,
  });

  res.status(201).json(new ApiResponse(201, newVote, "Vote added"));
});

// GET /api/v1/votes/:targetType/:targetId
export const getVoteCount = asyncHandler(async (req, res) => {
  const { targetType, targetId } = req.params;

  if (!["Question", "Answer"].includes(targetType)) {
    throw new ApiError(400, "Invalid target type (must be 'Question' or 'Answer')");
  }

  const upvotes = await Vote.countDocuments({
    targetType,
    targetId,
    voteType: "upvote",
  });

  const downvotes = await Vote.countDocuments({
    targetType,
    targetId,
    voteType: "downvote",
  });

  res
    .status(200)
    .json(new ApiResponse(200, { upvotes, downvotes }, "Vote count fetched"));
});
