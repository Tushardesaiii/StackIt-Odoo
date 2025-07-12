import express from "express";
import { createTag, getAllTags } from "../controllers/tag.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public - get all tags
router.get("/", getAllTags);

// Optional: Protect with verifyJWT if only logged in users can create
router.post("/", verifyJWT, createTag);

export default router;
