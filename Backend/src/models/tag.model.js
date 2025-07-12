import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    description: {
      type: String,
      default: "",
      maxlength: 300,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export const Tag = mongoose.model("Tag", TagSchema);
