import express from "express";
import { getMembers } from "../controllers/user.controller";

const router = express.Router();

router.get("/members", getMembers);

export default router;
