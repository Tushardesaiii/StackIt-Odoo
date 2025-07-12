import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, "Description is required"], // supports rich text
    },
    tags: {
      type: [String],
      required: [true, "At least one tag is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    acceptedAnswer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      default: null,
    },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
