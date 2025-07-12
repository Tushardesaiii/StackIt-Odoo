import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  voteQuestion,
  acceptAnswer,
  deleteQuestion,
} from "../controllers/Question.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js"; // ✅ consistent

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

// ✅ Protected routes use verifyJWT
router.post("/", createQuestion);
router.post("/:id/vote", voteQuestion);
router.patch("/:questionId/accept/:answerId", acceptAnswer);
router.delete("/:id", deleteQuestion);

export default router;
