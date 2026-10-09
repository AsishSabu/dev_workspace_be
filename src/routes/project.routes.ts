import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema";
import { validate } from "../middleware/validation.middleware";

const router = Router();
router.post("/", requireAuth, validate(createProjectSchema), createProject);
router.get("/", requireAuth, getProjects);
router.get("/:projectId", requireAuth, getProject);
router.patch(
  "/:projectId",
  requireAuth,
  validate(updateProjectSchema),
  updateProject,
);
router.delete("/:projectId", requireAuth, deleteProject);

export default router;
