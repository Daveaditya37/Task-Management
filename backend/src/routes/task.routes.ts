import express from "express";
import { Role } from "@prisma/client";

import { authenticateUser } from "../middleware/auth.middleware";

import {createTask,getTasks,getSingleTask,updateTask,deleteTask,getMyTasks,startTask,completeTask} from "../controllers/task.controller";

const router = express.Router();

router.post("/", authenticateUser([Role.ADMIN, Role.MEMBER]), createTask);
router.get("/", authenticateUser([Role.ADMIN]), getTasks);
router.get("/:id", authenticateUser([Role.ADMIN, Role.MEMBER]), getSingleTask);
router.put("/:id", authenticateUser([Role.ADMIN]), updateTask);
router.delete("/:id", authenticateUser([Role.ADMIN]), deleteTask);
router.get("/member/my-tasks", authenticateUser([Role.MEMBER]), getMyTasks);
router.patch("/:id/start", authenticateUser([Role.MEMBER]), startTask);
router.patch("/:id/complete", authenticateUser([Role.MEMBER]), completeTask);

export default router;
