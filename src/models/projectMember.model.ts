import { model, Schema } from "mongoose";

const projectMemberSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
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
      enum: ["admin", "member"],
      default: "member",
    },
  },
  {
    timestamps: true,
  },
);

projectMemberSchema.index({ projectId: 1, userId: 1 }, { unique: true });

export const ProjectMember = model("ProjectMember", projectMemberSchema);
