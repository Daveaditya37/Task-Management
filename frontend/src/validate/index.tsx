import { z } from "zod";

export const loginSchema = z.object({
  email:    z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name:     z.string().min(2,  "Name must be at least 2 characters"),
  email:    z.string().email("Invalid email address"),
  password: z.string().min(6,  "Password must be at least 6 characters"),
  role:     z.enum(["ADMIN", "MEMBER"]).default("MEMBER"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;