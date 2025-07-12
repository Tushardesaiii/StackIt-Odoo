import express from "express";
import { vote, getVoteCount } from "../controllers/vote.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// All vote actions require user authentication
router.post("/", verifyJWT, vote);
router.get("/:targetType/:targetId", getVoteCount);

export default router;
