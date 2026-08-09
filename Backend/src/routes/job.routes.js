const express = require("express");

const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  removeJob,
} = require("../controllers/job.controller");

const authMiddleware =
  require("../middleware/auth.middleware");

const router = express.Router();

// ==========================
// CREATE JOB APPLICATION
// POST /api/jobs
// ==========================
router.post(
  "/",
  authMiddleware,
  createJob
);

// ==========================
// GET ALL USER JOBS
// GET /api/jobs
// ==========================
router.get(
  "/",
  authMiddleware,
  getJobs
);

// ==========================
// GET SINGLE JOB
// GET /api/jobs/:id
// ==========================
router.get(
  "/:id",
  authMiddleware,
  getJob
);

// ==========================
// UPDATE JOB APPLICATION
// PUT /api/jobs/:id
// ==========================
router.put(
  "/:id",
  authMiddleware,
  updateJob
);

// ==========================
// DELETE JOB APPLICATION
// DELETE /api/jobs/:id
// ==========================
router.delete(
  "/:id",
  authMiddleware,
  removeJob
);

module.exports = router;