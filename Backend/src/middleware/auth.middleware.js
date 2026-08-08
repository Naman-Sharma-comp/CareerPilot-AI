const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const authMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const user =
      await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },

        select: {
          id: true,
          fullName: true,
          email: true,
          provider: true,
          createdAt: true,
        },
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User no longer exists",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(
      "Authentication Error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;