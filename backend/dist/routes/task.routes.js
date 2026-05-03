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
router.post("/", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN, client_1.Role.MEMBER]), task_controller_1.createTask);
router.get("/", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN]), task_controller_1.getTasks);
router.get("/:id", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN, client_1.Role.MEMBER]), task_controller_1.getSingleTask);
router.put("/:id", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN]), task_controller_1.updateTask);
router.delete("/:id", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN]), task_controller_1.deleteTask);
router.get("/member/my-tasks", (0, auth_middleware_1.authenticateUser)([client_1.Role.MEMBER]), task_controller_1.getMyTasks);
router.patch("/:id/start", (0, auth_middleware_1.authenticateUser)([client_1.Role.MEMBER]), task_controller_1.startTask);
router.patch("/:id/complete", (0, auth_middleware_1.authenticateUser)([client_1.Role.MEMBER]), task_controller_1.completeTask);
exports.default = router;
