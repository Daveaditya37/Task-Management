import express from "express";
import { Role } from "@prisma/client";

import {
  authenticateUser,
} from "../middleware/auth.middleware";

import {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";

const router = express.Router();


// ======================================
// CREATE PROJECT
// ADMIN ONLY
// ======================================

router.post(
  "/",
  authenticateUser([Role.ADMIN]),
  createProject
);


// ======================================
// GET ALL PROJECTS
// ADMIN + MEMBER
// ======================================

router.get(
  "/",
  authenticateUser([Role.ADMIN, Role.MEMBER]),
  getProjects
);


// ======================================
// GET SINGLE PROJECT
// ADMIN + MEMBER
// ======================================

router.get(
  "/:id",
  authenticateUser([Role.ADMIN, Role.MEMBER]),
  getSingleProject
);


// ======================================
// UPDATE PROJECT
// ADMIN ONLY
// ======================================

router.put(
  "/:id",
  authenticateUser([Role.ADMIN]),
  updateProject
);


// ======================================
// DELETE PROJECT
// ADMIN ONLY
// ======================================

router.delete(
  "/:id",
  authenticateUser([Role.ADMIN]),
  deleteProject
);

export default router;