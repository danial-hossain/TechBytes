import express from "express";
import { createReportController } from "../controllers/report.controller.js";
import auth from "../middleware/auth.js"; // the auth middleware you created

const router = express.Router();

// Protect this route, only authenticated users can submit reports
router.post("/", auth, createReportController);

export default router;
