import express from "express";
import {
  addCommentToQuestion,
  addCommentToAnswer,
  getCommentsForQuestion,
  getCommentsForAnswer,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get comments for question
router.get("/question/:questionId", getCommentsForQuestion);

// Get comments for answer
router.get("/answer/:answerId", getCommentsForAnswer);

// Post comment to question
router.post("/question/:questionId", verifyJWT, addCommentToQuestion);

// Post comment to answer
router.post("/answer/:answerId", verifyJWT, addCommentToAnswer);

export default router;
