import { model, Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);
projectSchema.index({
  workspaceId: 1,
  createdAt: -1,
});

export const Project = model("Project", projectSchema);
