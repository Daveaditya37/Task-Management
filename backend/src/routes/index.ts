import { Router } from "express";
import authRoutes from "./auth.routes";
import projectRoutes from "./project.routes";
import taskRoutes from "./task.routes";
import userRoutes from "./user.routes";
import dashboardRoutes from "./dashboard.routes";   

const allRouter = Router();

allRouter.use("/auth", authRoutes);
allRouter.use("/projects", projectRoutes);
allRouter.use("/tasks", taskRoutes);
allRouter.use("/users", userRoutes);
allRouter.use("/dashboard",dashboardRoutes); 

export default allRouter;





