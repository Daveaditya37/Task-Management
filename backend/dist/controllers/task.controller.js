"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeTask = exports.startTask = exports.getMyTasks = exports.deleteTask = exports.updateTask = exports.getSingleTask = exports.getTasks = exports.createTask = void 0;
const db_1 = require("../db");
const createTask = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, priority, estimatedTime, dueDate, assignedTo, projectId, isPrivate, } = Request.body;
        const task = yield db_1.db.task.create({
            data: {
                title,
                description,
                priority,
                estimatedTime,
                dueDate: dueDate ? new Date(dueDate) : null,
                assignedTo,
                projectId: projectId || null,
                isPrivate: isPrivate || false,
            },
            include: {
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                project: true,
            },
        });
        return Response.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to create task",
            error,
        });
    }
});
exports.createTask = createTask;
const getTasks = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield db_1.db.task.findMany({
            where: {
                isPrivate: false,
            },
            include: {
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                project: true,
            },
            orderBy: [
                {
                    priority: "asc",
                },
                {
                    createdAt: "desc",
                },
            ],
        });
        return Response.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
            error,
        });
    }
});
exports.getTasks = getTasks;
const getSingleTask = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        const task = yield db_1.db.task.findUnique({
            where: {
                id,
            },
            include: {
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                project: true,
            },
        });
        if (!task) {
            return Response.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        return Response.status(200).json({
            success: true,
            task,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to fetch task",
            error,
        });
    }
});
exports.getSingleTask = getSingleTask;
const updateTask = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        const { title, description, priority, dueDate, assignedTo, estimatedTime } = Request.body;
        const existingTask = yield db_1.db.task.findUnique({
            where: {
                id,
            },
        });
        if (!existingTask) {
            return Response.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        const updatedTask = yield db_1.db.task.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                priority,
                assignedTo,
                estimatedTime,
                dueDate: dueDate ? new Date(dueDate) : undefined,
            },
        });
        return Response.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to update task",
            error,
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        const existingTask = yield db_1.db.task.findUnique({
            where: {
                id,
            },
        });
        if (!existingTask) {
            return Response.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        yield db_1.db.task.delete({
            where: {
                id,
            },
        });
        return Response.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to delete task",
            error,
        });
    }
});
exports.deleteTask = deleteTask;
const getMyTasks = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = Request.user;
        const tasks = yield db_1.db.task.findMany({
            where: {
                assignedTo: user.id,
            },
            include: {
                project: true,
            },
            orderBy: [
                {
                    priority: "asc",
                },
                {
                    createdAt: "desc",
                },
            ],
        });
        return Response.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to fetch member tasks",
            error,
        });
    }
});
exports.getMyTasks = getMyTasks;
const startTask = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        const existingTask = yield db_1.db.task.findUnique({
            where: {
                id,
            },
        });
        if (!existingTask) {
            return Response.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        const task = yield db_1.db.task.update({
            where: {
                id,
            },
            data: {
                status: "IN_PROGRESS",
                startedAt: new Date(),
            },
        });
        return Response.status(200).json({
            success: true,
            message: "Task started",
            task,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to start task",
            error,
        });
    }
});
exports.startTask = startTask;
const completeTask = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        const existingTask = yield db_1.db.task.findUnique({
            where: {
                id,
            },
        });
        if (!existingTask) {
            return Response.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        const task = yield db_1.db.task.update({
            where: {
                id,
            },
            data: {
                status: "COMPLETED",
                completedAt: new Date(),
            },
        });
        return Response.status(200).json({
            success: true,
            message: "Task completed successfully",
            task,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to complete task",
            error,
        });
    }
});
exports.completeTask = completeTask;
