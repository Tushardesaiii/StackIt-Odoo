import { Question } from "../models/Question.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// CREATE QUESTION (no auth)
export const createQuestion = asyncHandler(async (req, res) => {
  const { title, description, tags = [] } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const question = await Question.create({
    title,
    description,
    tags,
    createdBy: "guest", // optional
  });

  return res
    .status(201)
    .json(new ApiResponse(201, question, "Question created successfully"));
});

// Optionally comment out others for now if not in use:
export const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, questions));
});

export const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (!question) throw new ApiError(404, "Question not found");

  return res.status(200).json(new ApiResponse(200, question));
});

// Stub out the rest if not used now
export const voteQuestion = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, "Voting disabled for hackathon"));
});

export const acceptAnswer = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, "Accepting answers disabled"));
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, "Delete disabled"));
});
