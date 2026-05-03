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
exports.deleteProject = exports.updateProject = exports.getSingleProject = exports.getProjects = exports.createProject = void 0;
const index_1 = require("../db/index");
// ==========================
// CREATE PROJECT
// ==========================
const createProject = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = Request.body;
        const user = Request.user;
        const project = yield index_1.db.project.create({
            data: {
                title,
                description,
                createdBy: user.id,
            },
        });
        return Response.status(201).json({
            success: true,
            message: "Project created successfully",
            project,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to create project",
            error,
        });
    }
});
exports.createProject = createProject;
// ==========================
// GET ALL PROJECTS
// ==========================
const getProjects = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield index_1.db.project.findMany({
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                tasks: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return Response.status(200).json({
            success: true,
            count: projects.length,
            projects,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error,
        });
    }
});
exports.getProjects = getProjects;
const getSingleProject = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        const project = yield index_1.db.project.findUnique({
            where: {
                id,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                tasks: {
                    include: {
                        assignee: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        if (!project) {
            return Response.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        return Response.status(200).json({
            success: true,
            project,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to fetch project",
            error,
        });
    }
});
exports.getSingleProject = getSingleProject;
const updateProject = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        const { title, description } = Request.body;
        const project = yield index_1.db.project.findUnique({
            where: { id },
        });
        if (!project) {
            return Response.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        const updatedProject = yield index_1.db.project.update({
            where: {
                id,
            },
            data: {
                title,
                description,
            },
        });
        return Response.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: updatedProject,
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to update project",
            error,
        });
    }
});
exports.updateProject = updateProject;
const deleteProject = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        const project = yield index_1.db.project.findUnique({
            where: {
                id,
            },
        });
        if (!project) {
            return Response.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        yield index_1.db.project.delete({
            where: {
                id,
            },
        });
        return Response.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    }
    catch (error) {
        return Response.status(500).json({
            success: false,
            message: "Failed to delete project",
            error,
        });
    }
});
exports.deleteProject = deleteProject;
