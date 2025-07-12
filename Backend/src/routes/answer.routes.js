import express from "express";
import {
  createAnswer,
  getAnswersForQuestion,
  voteAnswer,
  deleteAnswer,
} from "../controllers/answer.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all answers for a question
router.get("/question/:questionId", getAnswersForQuestion);

// Post an answer to a question
router.post("/question/:questionId", verifyJWT, createAnswer);

// Vote on an answer (upvote/downvote)
router.post("/:answerId/vote", verifyJWT, voteAnswer);

// Delete an answer
router.delete("/:answerId", verifyJWT, deleteAnswer);

export default router;
