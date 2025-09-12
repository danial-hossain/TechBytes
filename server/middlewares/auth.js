// middleware/auth.js
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    const token = req.cookies?.accessToken || (authHeader && authHeader.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized access",
        error: true,
        success: false,
      });
    }

    req.user = { id: decoded.id };
    req.userId = decoded.id; // for backward compatibility
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      error: true,
      success: false,
    });
  }
};

export default auth;
