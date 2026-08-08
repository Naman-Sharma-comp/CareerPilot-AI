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

// ==========================
// REGISTER
// ==========================
router.post(
  "/register",
  register
);

// ==========================
// LOGIN
// ==========================
router.post(
  "/login",
  login
);

// ==========================
// GOOGLE LOGIN
// ==========================
router.post(
  "/google",
  googleLogin
);

// ==========================
// GITHUB LOGIN
// ==========================y
router.post(
  "/github",
  githubLogin
);

// ==========================
// LINKEDIN LOGIN
// ==========================
router.post(
  "/linkedin",
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