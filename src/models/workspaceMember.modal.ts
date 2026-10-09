import { model, Schema } from "mongoose";

const workspaceMemberSchema = new Schema(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "manager", "member"],
      default: "member",
    },
  },
  { timestamps: true },
);
workspaceMemberSchema.index({ workspaceId: 1, userId: 1 }, { unique: true });

export const WorkspaceMember = model("WorkspaceMember", workspaceMemberSchema);
