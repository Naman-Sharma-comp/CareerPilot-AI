const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  uploadResume,
  getResumes,
  removeResume,
  replaceResume,
  downloadResume,
  getResumeHistoryController,
} = require("../controllers/resume.controller");

const authMiddleware =
  require("../middleware/auth.middleware");

const router = express.Router();

// ==========================
// MULTER STORAGE
// ==========================
const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        "uploads/resumes"
      );
    },

    filename: (
      req,
      file,
      cb
    ) => {
      const uniqueName =
        `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${path.extname(
          file.originalname
        )}`;

      cb(
        null,
        uniqueName
      );
    },
  });

// ==========================
// FILE FILTER
// ==========================
const fileFilter = (
  req,
  file,
  cb
) => {
  if (
    file.mimetype ===
    "application/pdf"
  ) {
    cb(
      null,
      true
    );
  } else {
    cb(
      new Error(
        "Only PDF resumes are allowed"
      ),
      false
    );
  }
};

// ==========================
// MULTER CONFIG
// ==========================
const upload =
  multer({
    storage,
    fileFilter,

    limits: {
      fileSize:
        5 * 1024 * 1024,
    },
  });

// ==========================
// UPLOAD RESUME
// POST /api/resumes
// ==========================
router.post(
  "/",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

// ==========================
// GET USER RESUMES
// GET /api/resumes
// ==========================
router.get(
  "/",
  authMiddleware,
  getResumes
);

// ==========================
// GET RESUME HISTORY
// GET /api/resumes/:id/history
// ==========================
router.get(
  "/:id/history",
  authMiddleware,
  getResumeHistoryController
);

// ==========================
// DOWNLOAD RESUME
// GET /api/resumes/:id/download
// ==========================
router.get(
  "/:id/download",
  authMiddleware,
  downloadResume
);

// ==========================
// REPLACE RESUME
// PUT /api/resumes/:id
// ==========================
router.put(
  "/:id",
  authMiddleware,
  upload.single("resume"),
  replaceResume
);

// ==========================
// DELETE RESUME
// DELETE /api/resumes/:id
// ==========================
router.delete(
  "/:id",
  authMiddleware,
  removeResume
);

module.exports = router;