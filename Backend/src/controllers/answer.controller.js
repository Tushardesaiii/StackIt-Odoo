import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Answer } from "../models/answer.model.js";
import { Question } from "../models/Question.model.js";

// Create Answer
export const createAnswer = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { questionId } = req.params;

  if (!content) throw new ApiError(400, "Content is required");

  const question = await Question.findById(questionId);
  if (!question) throw new ApiError(404, "Question not found");

  const answer = await Answer.create({
    content,
    question: questionId,
    user: req.user._id,
  });

  // Push answer to question
  question.answers.push(answer._id);
  await question.save();

  res.status(201).json(new ApiResponse(201, answer, "Answer posted"));
});

// Get all answers for a question
export const getAnswersForQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  const answers = await Answer.find({ question: questionId })
    .populate("user", "username fullName")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, answers, "Answers fetched"));
});

// Vote Answer
export const voteAnswer = asyncHandler(async (req, res) => {
  const { answerId } = req.params;
  const { voteType } = req.body; // "up" or "down"

  const answer = await Answer.findById(answerId);
  if (!answer) throw new ApiError(404, "Answer not found");

  const existingVote = answer.voters.find((v) =>
    v.user.equals(req.user._id)
  );

  if (existingVote) throw new ApiError(400, "You already voted this answer");

  const voteValue = voteType === "up" ? 1 : voteType === "down" ? -1 : 0;
  if (voteValue === 0) throw new ApiError(400, "Invalid vote type");

  answer.votes += voteValue;
  answer.voters.push({ user: req.user._id, vote: voteValue });

  await answer.save();

  res.status(200).json(new ApiResponse(200, answer, "Vote registered"));
});

// Delete Answer
export const deleteAnswer = asyncHandler(async (req, res) => {
  const { answerId } = req.params;

  const answer = await Answer.findById(answerId);
  if (!answer) throw new ApiError(404, "Answer not found");

  if (!answer.user.equals(req.user._id)) {
    throw new ApiError(403, "Not authorized to delete this answer");
  }

  await Answer.findByIdAndDelete(answerId);

  await Question.findByIdAndUpdate(answer.question, {
    $pull: { answers: answer._id },
  });

  res.status(200).json(new ApiResponse(200, {}, "Answer deleted"));
});
