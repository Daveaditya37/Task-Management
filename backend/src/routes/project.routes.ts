import express from "express";
import { Role } from "@prisma/client";
import { authenticateUser } from "../middleware/auth.middleware";
import {createProject,getProjects,getSingleProject,updateProject,deleteProject,} from "../controllers/project.controller";

const router = express.Router();

router.post("/", authenticateUser([Role.ADMIN]), createProject);
router.get("/", authenticateUser([Role.ADMIN, Role.MEMBER]), getProjects);
router.get( "/:id",authenticateUser([Role.ADMIN, Role.MEMBER]),getSingleProject);
router.put("/:id", authenticateUser([Role.ADMIN]), updateProject);
router.delete("/:id", authenticateUser([Role.ADMIN]), deleteProject);

export default router;
