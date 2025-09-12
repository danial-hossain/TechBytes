import express from "express";
import { createReportController } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/", createReportController);

export default router;
