import Help from "../models/help.model.js";

export const submitHelp = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and message are required" 
      });
    }

    const newHelp = await Help.create({ email, message });

    res.status(201).json({
      success: true,
      message: "Help request submitted successfully",
      data: newHelp
    });
  } catch (error) {
    console.error("Help submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
