import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetType: {
      type: String,
      enum: ["Question", "Answer"],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetType",
    },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  { timestamps: true }
);

VoteSchema.index({ user: 1, targetType: 1, targetId: 1 }, { unique: true });

export const Vote = mongoose.model("Vote", VoteSchema);
