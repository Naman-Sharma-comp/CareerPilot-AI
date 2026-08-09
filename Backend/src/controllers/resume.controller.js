// Backend/src/controllers/resume.controller.js

const {
  createResume,
  getUserResumes,
  deleteResume,
  updateResume,
  getResumeHistory,
} = require("../services/resume.service");

const uploadResume = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload a resume file",
      });
    }

    const resume =
      await createResume({
        userId: req.user.id,
        fileName:
          req.file.originalname,
        fileUrl:
          `/uploads/resumes/${req.file.filename}`,
        fileType:
          req.file.mimetype,
      });

    return res.status(201).json({
      success: true,
      message:
        "Resume uploaded successfully",
      data: resume,
    });
  } catch (error) {
    console.error(
      "Resume Upload Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getResumes = async (
  req,
  res
) => {
  try {
    const resumes =
      await getUserResumes(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: resumes,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// REPLACE RESUME
// ==========================
const replaceResume = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload a new resume file",
      });
    }

    const resume =
      await updateResume({
        resumeId: req.params.id,
        userId: req.user.id,
        fileName:
          req.file.originalname,
        fileUrl:
          `/uploads/resumes/${req.file.filename}`,
        fileType:
          req.file.mimetype,
      });

    return res.status(200).json({
      success: true,
      message:
        "Resume replaced successfully",
      data: resume,
    });
  } catch (error) {
    console.error(
      "Resume Replace Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const path = require("path");

const downloadResume = async (
  req,
  res
) => {
  try {
    const prisma =
      require("../config/prisma");

    const resume =
      await prisma.resume.findFirst({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const relativePath =
      resume.fileUrl.replace(
        /^\/+/,
        ""
      );

    const filePath =
      path.join(
        process.cwd(),
        relativePath
      );

    return res.download(
      filePath,
      resume.fileName
    );
  } catch (error) {
    console.error(
      "Resume Download Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message:
        "Unable to download resume",
    });
  }
};
// ==========================
// GET RESUME HISTORY
// ==========================
const getResumeHistoryController = async (
  req,
  res
) => {
  try {
    const history =
      await getResumeHistory({
        resumeId: req.params.id,
        userId: req.user.id,
      });

    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error(
      "Resume History Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const removeResume = async (
  req,
  res
) => {
  try {
    const resume =
      await deleteResume({
        resumeId: req.params.id,
        userId: req.user.id,
      });

    return res.status(200).json({
      success: true,
      message:
        "Resume deleted successfully",
      data: resume,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getResumes,
  getResumeHistoryController,
  removeResume,
  replaceResume,
  downloadResume,
  
};