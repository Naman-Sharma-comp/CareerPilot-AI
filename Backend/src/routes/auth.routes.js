const express = require("express");

const router = express.Router();

const {
  register,
  login,
  googleLogin,
  githubLogin,
  unlinkGoogle,
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
// ==========================
router.post(
  "/github",
  githubLogin
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
// CURRENT USER
// ==========================
router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

module.exports = router;