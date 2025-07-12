import { Comment } from "../models/comment.model.js";
import { Question } from "../models/Question.model.js";
import { Answer } from "../models/answer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add comment to a question
export const addCommentToQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const { content } = req.body;

  if (!content) throw new ApiError(400, "Comment cannot be empty");

  const question = await Question.findById(questionId);
  if (!question) throw new ApiError(404, "Question not found");

  const comment = await Comment.create({
    content,
    user: req.user._id,
    question: questionId,
  });

  res.status(201).json(new ApiResponse(201, comment, "Comment added to question"));
});

// Add comment to an answer
export const addCommentToAnswer = asyncHandler(async (req, res) => {
  const { answerId } = req.params;
  const { content } = req.body;

  if (!content) throw new ApiError(400, "Comment cannot be empty");

  const answer = await Answer.findById(answerId);
  if (!answer) throw new ApiError(404, "Answer not found");

  const comment = await Comment.create({
    content,
    user: req.user._id,
    answer: answerId,
  });

  res.status(201).json(new ApiResponse(201, comment, "Comment added to answer"));
});

// Get all comments for a question
export const getCommentsForQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  const comments = await Comment.find({ question: questionId })
    .populate("user", "username fullName")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, comments, "Question comments fetched"));
});

// Get all comments for an answer
export const getCommentsForAnswer = asyncHandler(async (req, res) => {
  const { answerId } = req.params;

  const comments = await Comment.find({ answer: answerId })
    .populate("user", "username fullName")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, comments, "Answer comments fetched"));
});
