import { Question } from "../models/Question.model.js";
import { Answer } from "../models/answer.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// CREATE QUESTION
export const createQuestion = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;

  if (!title || !description || !tags?.length) {
    throw new ApiError(400, "Title, description and tags are required");
  }

  const question = await Question.create({
    title,
    description,
    tags,
    author: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, question, "Question created"));
});

// GET ALL QUESTIONS (Feed)
export const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find()
    .populate("author", "username fullName")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, questions));
});

// GET SINGLE QUESTION (Detail page)
export const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id)
    .populate("author", "username fullName")
    .populate({
      path: "answers",
      populate: { path: "author", select: "username fullName" },
    });

  if (!question) throw new ApiError(404, "Question not found");

  res.status(200).json(new ApiResponse(200, question));
});

// VOTE (UPVOTE / DOWNVOTE)
export const voteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // type = "up" | "down"
  const userId = req.user._id;

  const question = await Question.findById(id);
  if (!question) throw new ApiError(404, "Question not found");

  const hasUpvoted = question.upvotes.includes(userId);
  const hasDownvoted = question.downvotes.includes(userId);

  if (type === "up") {
    if (hasUpvoted) {
      question.upvotes.pull(userId);
    } else {
      question.upvotes.push(userId);
      if (hasDownvoted) question.downvotes.pull(userId);
    }
  } else if (type === "down") {
    if (hasDownvoted) {
      question.downvotes.pull(userId);
    } else {
      question.downvotes.push(userId);
      if (hasUpvoted) question.upvotes.pull(userId);
    }
  } else {
    throw new ApiError(400, "Invalid vote type");
  }

  await question.save();
  res.status(200).json(new ApiResponse(200, question, "Vote updated"));
});

// ACCEPT ANSWER
export const acceptAnswer = asyncHandler(async (req, res) => {
  const { questionId, answerId } = req.params;

  const question = await Question.findById(questionId);
  if (!question) throw new ApiError(404, "Question not found");

  if (question.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only the question author can accept an answer");
  }

  question.acceptedAnswer = answerId;
  await question.save();

  res.status(200).json(new ApiResponse(200, question, "Answer accepted"));
});

// DELETE QUESTION
export const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id);
  if (!question) throw new ApiError(404, "Question not found");

  if (question.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only delete your own question");
  }

  // Optionally delete all related answers too
  await Answer.deleteMany({ _id: { $in: question.answers } });

  await question.deleteOne();

  res.status(200).json(new ApiResponse(200, {}, "Question deleted"));
});
