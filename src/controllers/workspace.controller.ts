import { Request, Response } from "express";
import { Workspace } from "../models/workspace.modal";
import { getAuth } from "@clerk/express";
import { WorkspaceMember } from "../models/workspaceMember.modal";

const generateSlug = (name: string) => {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "workspace"
  );
};

const createUniqueSlug = async (name: string) => {
  const baseSlug = generateSlug(name);
  let slug = baseSlug;
  let counter = 1;
  while (await Workspace.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

export const createWorkspace = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const { name } = req.body;
    const slug = await createUniqueSlug(name);
    const workspace = await Workspace.create({
      name,
      slug,
      ownerId: userId,
    });
    await WorkspaceMember.create({
      workspaceId: workspace._id,
      userId,
      role: "owner",
    });
    return res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      data: workspace,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create workspace",
    });
  }
};

export const getWorkSpaces = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const memberships = await WorkspaceMember.find({ userId }).select(
      "workspaceId",
    );
    const workspaceIds = memberships.map(
      (membership) => membership.workspaceId,
    );
    const workspaces = await Workspace.find({
      _id: { $in: workspaceIds },
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, data: workspaces });
  } catch (error) {
    console.error("Get workspaces error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch workspaces",
    });
  }
};

export const getWorkspace = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { workspaceId } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const membership = await WorkspaceMember.findOne({ workspaceId, userId });
    if (!membership) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch workspace",
    });
  }
};

export const updateWorkspace = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { workspaceId } = req.params;
    const { name } = req.body;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      ownerId: userId,
    });
    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }
    workspace.name = name;
    await workspace.save();
    return res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update workspace",
    });
  }
};

export const deleteWorkspace = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { workspaceId } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      ownerId: userId,
    });
    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }
    await WorkspaceMember.deleteMany({ workspaceId });
    await workspace.deleteOne({
      _id: workspaceId,
    });
    return res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete workspace",
    });
  }
};
