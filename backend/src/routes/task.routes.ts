import express from "express";
import { Role } from "@prisma/client";

import {
  authenticateUser,
} from "../middleware/auth.middleware";

import {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  getMyTasks,
  startTask,
  completeTask,
} from "../controllers/task.controller";

const router = express.Router();


// ======================================
// CREATE TASK
// ADMIN ONLY
// ======================================

router.post(
  "/",
  authenticateUser([Role.ADMIN, Role.MEMBER]),
  createTask
);


// ======================================
// GET ALL TASKS
// ADMIN ONLY
// ======================================

router.get(
  "/",
  authenticateUser([Role.ADMIN]),
  getTasks
);


// ======================================
// GET SINGLE TASK
// ADMIN + MEMBER
// ======================================

router.get(
  "/:id",
  authenticateUser([Role.ADMIN, Role.MEMBER]),
  getSingleTask
);


// ======================================
// UPDATE TASK
// ADMIN ONLY
// ======================================

router.put(
  "/:id",
  authenticateUser([Role.ADMIN]),
  updateTask
);


// ======================================
// DELETE TASK
// ADMIN ONLY
// ======================================

router.delete(
  "/:id",
  authenticateUser([Role.ADMIN]),
  deleteTask
);


// ======================================
// MEMBER TASKS
// MEMBER ONLY
// ======================================

router.get(
  "/member/my-tasks",
  authenticateUser([Role.MEMBER]),
  getMyTasks
);


// ======================================
// START TASK
// MEMBER ONLY
// ======================================

router.patch(
  "/:id/start",
  authenticateUser([Role.MEMBER]),
  startTask
);


// ======================================
// COMPLETE TASK
// MEMBER ONLY
// ======================================

router.patch(
  "/:id/complete",
  authenticateUser([Role.MEMBER]),
  completeTask
);

export default router;