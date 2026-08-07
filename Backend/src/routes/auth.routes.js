const express = require("express");
const router = express.Router();

const {
    register,
    login,
    googleLogin,
    getCurrentUser,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Google Login
router.post("/google", googleLogin);

// Get Logged-in User
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;