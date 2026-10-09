import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "../schemas/workspace.schema";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  getWorkSpaces,
  updateWorkspace,
} from "../controllers/workspace.controller";
import { validate } from "../middleware/validation.middleware";

const router = Router();

router.post("/", requireAuth, validate(createWorkspaceSchema), createWorkspace);

router.get("/", requireAuth, getWorkSpaces);

router.get("/:workspaceId", requireAuth, getWorkspace);

router.patch(
  "/:workspaceId",
  requireAuth,
  validate(updateWorkspaceSchema),
  updateWorkspace,
);

router.delete("/:workspaceId", requireAuth, deleteWorkspace);

export default router;
