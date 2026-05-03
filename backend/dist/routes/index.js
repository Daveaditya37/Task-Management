"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const project_routes_1 = __importDefault(require("./project.routes"));
const task_routes_1 = __importDefault(require("./task.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const allRouter = (0, express_1.Router)();
allRouter.use("/auth", auth_routes_1.default);
allRouter.use("/projects", project_routes_1.default);
allRouter.use("/tasks", task_routes_1.default);
allRouter.use("/users", user_routes_1.default);
allRouter.use("/dashboard", dashboard_routes_1.default);
exports.default = allRouter;
