"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, Request, Response, next) => {
    console.error(err);
    return Response.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
exports.errorMiddleware = errorMiddleware;
