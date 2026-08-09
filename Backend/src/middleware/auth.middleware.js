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

    // ==========================
    // CHECK AUTH HEADER
    // ==========================
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

    // ==========================
    // GET TOKEN
    // ==========================
    const token =
      authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
    }

    // ==========================
    // VERIFY JWT
    // ==========================
    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (error) {
      if (
        error.name ===
        "TokenExpiredError"
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Token has expired",
        });
      }

      if (
        error.name ===
        "JsonWebTokenError"
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid token",
        });
      }

      throw error;
    }

    // ==========================
    // VALIDATE TOKEN PAYLOAD
    // ==========================
    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authentication token",
      });
    }

    // ==========================
    // GET LOGGED-IN USER
    // ==========================
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

    // ==========================
    // USER NO LONGER EXISTS
    // ==========================
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User no longer exists",
      });
    }

    // ==========================
    // ATTACH USER TO REQUEST
    // ==========================
    req.user = user;

    return next();
  } catch (error) {
    console.error(
      "Authentication Middleware Error:",
      error.message
    );

    // Send database / server errors
    // to global error middleware.
    return next(error);
  }
};

module.exports = authMiddleware;