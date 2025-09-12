// controllers/report.controller.js
import Report from "../models/report.model.js"; // adjust path

export const createReportController = async (req, res) => {
  try {
    const { opinion } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!opinion || opinion.trim() === "") {
      return res.status(400).json({ message: "Opinion is required" });
    }

    const newReport = await Report.create({ userId, opinion });

    return res.status(201).json({
      message: "Report submitted successfully",
      report: newReport,
    });
  } catch (error) {
    console.error("Report creation error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
