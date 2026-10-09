import { model, Schema } from "mongoose";

const workspaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    ownerId: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const Workspace = model("Workspace", workspaceSchema);
