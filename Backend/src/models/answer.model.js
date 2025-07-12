import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Answer content is required"],
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    voters: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        vote: { type: Number }, // 1 for upvote, -1 for downvote
      },
    ],
  },
  { timestamps: true }
);

export const Answer = mongoose.model("Answer", AnswerSchema);
