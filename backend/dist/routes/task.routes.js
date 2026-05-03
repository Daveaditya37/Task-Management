"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_middleware_1 = require("../middleware/auth.middleware");
const task_controller_1 = require("../controllers/task.controller");
const router = express_1.default.Router();
// ======================================
// CREATE TASK
// ADMIN ONLY
// ======================================
router.post("/", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN, client_1.Role.MEMBER]), task_controller_1.createTask);
// ======================================
// GET ALL TASKS
// ADMIN ONLY
// ======================================
router.get("/", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN]), task_controller_1.getTasks);
// ======================================
// GET SINGLE TASK
// ADMIN + MEMBER
// ======================================
router.get("/:id", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN, client_1.Role.MEMBER]), task_controller_1.getSingleTask);
// ======================================
// UPDATE TASK
// ADMIN ONLY
// ======================================
router.put("/:id", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN]), task_controller_1.updateTask);
// ======================================
// DELETE TASK
// ADMIN ONLY
// ======================================
router.delete("/:id", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN]), task_controller_1.deleteTask);
// ======================================
// MEMBER TASKS
// MEMBER ONLY
// ======================================
router.get("/member/my-tasks", (0, auth_middleware_1.authenticateUser)([client_1.Role.MEMBER]), task_controller_1.getMyTasks);
// ======================================
// START TASK
// MEMBER ONLY
// ======================================
router.patch("/:id/start", (0, auth_middleware_1.authenticateUser)([client_1.Role.MEMBER]), task_controller_1.startTask);
// ======================================
// COMPLETE TASK
// MEMBER ONLY
// ======================================
router.patch("/:id/complete", (0, auth_middleware_1.authenticateUser)([client_1.Role.MEMBER]), task_controller_1.completeTask);
exports.default = router;
