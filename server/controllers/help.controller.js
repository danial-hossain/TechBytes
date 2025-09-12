import Help from "../models/help.model.js";

// Submit a help request
export const submitHelpRequest = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: "Email and message are required",
      });
    }

    const newHelp = await Help.create({ email, message });

    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully",
      data: newHelp,
    });
  } catch (error) {
    console.error("Help submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting your message",
    });
  }
};

// Get all help requests (optional for admin)
export const getAllHelpRequests = async (req, res) => {
  try {
    const helps = await Help.find().sort({ createdAt: -1 });
    res.json({ success: true, data: helps });
  } catch (error) {
    console.error("Error fetching help requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
