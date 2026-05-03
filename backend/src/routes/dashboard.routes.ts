import express from "express";
import { getAdminDashboard } from "../controllers/dashboard.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { Role } from "@prisma/client";

const router = express.Router();
router.get("/dashboard", authenticateUser([Role.ADMIN]), getAdminDashboard);
export default router;
