import Report from "../models/report.model.js";

export async function createReportController(req, res) {
  try {
    console.log("🔥 Received request body:", req.body);
    const { opinion } = req.body;

    if (!opinion) {
      return res.status(400).json({ message: "Opinion is required" });
    }


    const report = new Report({ opinion });
    await report.save();

    return res.status(201).json({ message: "Opinion submitted successfully!" });
  } catch (err) {
    console.error("❌ Error saving report:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
