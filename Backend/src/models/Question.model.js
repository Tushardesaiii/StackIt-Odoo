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
      required: [true, "Description is required"],
    },
    tags: {
      type: [String],
      required: [true, "At least one tag is required"],
    },

    // Make author optional and default to "guest"
    author: {
      type: String,
      default: "guest",
    },

    // Disable upvotes/downvotes/answers for now
    upvotes: { type: [String], default: [] },
    downvotes: { type: [String], default: [] },
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
