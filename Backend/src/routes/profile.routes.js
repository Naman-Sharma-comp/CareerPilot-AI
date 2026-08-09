const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/auth.middleware");

const {
  getProfile,
  updateProfile,
  getCareerPreferences,
  updateCareerPreferences,
} = require(
  "../controllers/profile.controller"
);

// ==========================
// GET PROFILE
// GET /api/profile
// ==========================
router.get(
  "/",
  authMiddleware,
  getProfile
);

// ==========================
// UPDATE PROFILE
// PUT /api/profile
// ==========================
router.put(
  "/",
  authMiddleware,
  updateProfile
);

// ==========================
// GET CAREER PREFERENCES
// GET /api/profile/preferences
// ==========================
router.get(
  "/preferences",
  authMiddleware,
  getCareerPreferences
);

// ==========================
// UPDATE CAREER PREFERENCES
// PUT /api/profile/preferences
// ==========================
router.put(
  "/preferences",
  authMiddleware,
  updateCareerPreferences
);

module.exports = router;