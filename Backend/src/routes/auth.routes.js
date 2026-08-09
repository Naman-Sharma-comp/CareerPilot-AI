const express = require("express");

const router = express.Router();

const {
  register,
  login,
  googleLogin,
  githubLogin,
  linkedinLogin,
  unlinkGoogle,
  unlinkLinkedin,
  getCurrentUser,
} = require(
  "../controllers/auth.controller"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const {
  authLimiter,
  loginLimiter,
} = require(
  "../middleware/rateLimit.middleware"
);

// ==========================
// REGISTER
// ==========================
router.post(
  "/register",
  authLimiter,
  register
);

// ==========================
// LOGIN
// ==========================
router.post(
  "/login",
  loginLimiter,
  login
);

// ==========================
// GOOGLE LOGIN
// ==========================
router.post(
  "/google",
  authLimiter,
  googleLogin
);

// ==========================
// GITHUB LOGIN
// ==========================
router.post(
  "/github",
  authLimiter,
  githubLogin
);

// ==========================
// LINKEDIN LOGIN
// ==========================
router.post(
  "/linkedin",
  authLimiter,
  linkedinLogin
);

// ==========================
// UNLINK GOOGLE
// ==========================
router.delete(
  "/google",
  authMiddleware,
  unlinkGoogle
);

// ==========================
// UNLINK LINKEDIN
// ==========================
router.delete(
  "/linkedin",
  authMiddleware,
  unlinkLinkedin
);

// ==========================
// CURRENT USER
// ==========================
router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

module.exports = router;