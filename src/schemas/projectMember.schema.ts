import { z } from "zod";

export const addProjectMemberSchema = z.object({
  userId: z.string().trim().min(1, "User ID is required"),

  role: z.enum(["admin", "member"]).default("member"),
});

export const updateProjectMemberSchema = z.object({
  role: z.enum(["admin", "member"]),
});
