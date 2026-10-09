import { Router } from "express";

import {
  addProjectMember,
  getProjectMembers,
  removeProjectMember,
  updateProjectMember,
} from "../controllers/projectMember.controller";

import { requireAuth } from "../middleware/auth.middleware";

import { requireProjectMember } from "../middleware/project.middleware";

import { requireProjectRole } from "../middleware/projectRole.middleware";

import { validate } from "../middleware/validation.middleware";

import {
  addProjectMemberSchema,
  updateProjectMemberSchema,
} from "../schemas/projectMember.schema";

const router = Router();

router.get(
  "/projects/:projectId/members",
  requireAuth,
  requireProjectMember,
  getProjectMembers,
);

router.post(
  "/projects/:projectId/members",
  requireAuth,
  requireProjectMember,
  requireProjectRole("owner", "admin"),
  validate(addProjectMemberSchema),
  addProjectMember,
);

router.patch(
  "/projects/:projectId/members/:userId",
  requireAuth,
  requireProjectMember,
  requireProjectRole("owner", "admin"),
  validate(updateProjectMemberSchema),
  updateProjectMember,
);

router.delete(
  "/projects/:projectId/members/:userId",
  requireAuth,
  requireProjectMember,
  requireProjectRole("owner", "admin"),
  removeProjectMember,
);

export default router;
