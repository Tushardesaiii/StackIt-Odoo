import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      default: null,
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      default: null,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", CommentSchema);
