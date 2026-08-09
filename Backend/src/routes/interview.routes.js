const express = require("express");

const {
  createInterview,
  getInterviews,
  getInterview,
  updateInterview,
  removeInterview,
} = require("../controllers/interview.controller");

const authMiddleware =
  require("../middleware/auth.middleware");

const router = express.Router();

// ==========================
// CREATE INTERVIEW
// POST /api/interviews
// ==========================
router.post(
  "/",
  authMiddleware,
  createInterview
);

// ==========================
// GET ALL INTERVIEWS
// GET /api/interviews
// ==========================
router.get(
  "/",
  authMiddleware,
  getInterviews
);

// ==========================
// GET SINGLE INTERVIEW
// GET /api/interviews/:id
// ==========================
router.get(
  "/:id",
  authMiddleware,
  getInterview
);

// ==========================
// UPDATE INTERVIEW
// PUT /api/interviews/:id
// ==========================
router.put(
  "/:id",
  authMiddleware,
  updateInterview
);

// ==========================
// DELETE INTERVIEW
// DELETE /api/interviews/:id
// ==========================
router.delete(
  "/:id",
  authMiddleware,
  removeInterview
);

module.exports = router;