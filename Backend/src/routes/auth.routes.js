const express = require("express");
const router = express.Router();

const {
    register,
    login,
    google,
    getCurrentUser,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Google Login
router.post("/google", google);

// Get Logged-in User
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;