const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    // Print the real error in terminal
    console.error("JWT Error:", error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authMiddleware;