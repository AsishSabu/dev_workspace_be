import { Router } from "express";
import { getCurrentUser } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", requireAuth, getCurrentUser);

export default router;
