"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_middleware_1 = require("../middleware/auth.middleware");
const project_controller_1 = require("../controllers/project.controller");
const router = express_1.default.Router();
// ======================================
// CREATE PROJECT
// ADMIN ONLY
// ======================================
router.post("/", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN]), project_controller_1.createProject);
// ======================================
// GET ALL PROJECTS
// ADMIN + MEMBER
// ======================================
router.get("/", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN, client_1.Role.MEMBER]), project_controller_1.getProjects);
// ======================================
// GET SINGLE PROJECT
// ADMIN + MEMBER
// ======================================
router.get("/:id", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN, client_1.Role.MEMBER]), project_controller_1.getSingleProject);
// ======================================
// UPDATE PROJECT
// ADMIN ONLY
// ======================================
router.put("/:id", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN]), project_controller_1.updateProject);
// ======================================
// DELETE PROJECT
// ADMIN ONLY
// ======================================
router.delete("/:id", (0, auth_middleware_1.authenticateUser)([client_1.Role.ADMIN]), project_controller_1.deleteProject);
exports.default = router;
