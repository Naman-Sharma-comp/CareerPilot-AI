const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

// ==========================
// CREATE RESUME
// ==========================
const createResume = async ({
  userId,
  fileName,
  fileUrl,
  fileType,
}) => {
  return await prisma.resume.create({
    data: {
      userId,
      fileName,
      fileUrl,
      fileType,
    },
  });
};

// ==========================
// GET USER RESUMES
// ==========================
const getUserResumes = async (
  userId
) => {
  return await prisma.resume.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

// ==========================
// UPDATE / REPLACE RESUME
// ==========================
const updateResume = async ({
  resumeId,
  userId,
  fileName,
  fileUrl,
  fileType,
}) => {
  // Find current resume
  const existingResume =
    await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    });

  if (!existingResume) {
    throw new Error(
      "Resume not found"
    );
  }

  // ==========================
  // SAVE OLD RESUME IN HISTORY
  // ==========================
  await prisma.resumeVersion.create({
    data: {
      resumeId:
        existingResume.id,

      fileName:
        existingResume.fileName,

      fileUrl:
        existingResume.fileUrl,

      fileType:
        existingResume.fileType,
    },
  });

  // ==========================
  // UPDATE CURRENT RESUME
  // ==========================
  const updatedResume =
    await prisma.resume.update({
      where: {
        id: resumeId,
      },

      data: {
        fileName,
        fileUrl,
        fileType,
      },
    });

  // IMPORTANT:
  // We do NOT delete the old PDF anymore.
  // It is needed for resume history.

  return updatedResume;
};

// ==========================
// GET RESUME HISTORY
// ==========================
const getResumeHistory = async ({
  resumeId,
  userId,
}) => {
  // First verify this resume
  // belongs to the logged-in user
  const resume =
    await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    });

  if (!resume) {
    throw new Error(
      "Resume not found"
    );
  }

  const versions =
    await prisma.resumeVersion.findMany({
      where: {
        resumeId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return versions;
};

// ==========================
// DELETE RESUME
// ==========================
const deleteResume = async ({
  resumeId,
  userId,
}) => {
  const resume =
    await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },

      include: {
        versions: true,
      },
    });

  if (!resume) {
    throw new Error(
      "Resume not found"
    );
  }

  // ==========================
  // DELETE CURRENT FILE
  // ==========================
  const currentRelativePath =
    resume.fileUrl.replace(
      /^\/+/,
      ""
    );

  const currentFilePath =
    path.join(
      process.cwd(),
      currentRelativePath
    );

  if (
    fs.existsSync(
      currentFilePath
    )
  ) {
    fs.unlinkSync(
      currentFilePath
    );
  }

  // ==========================
  // DELETE HISTORY FILES
  // ==========================
  for (
    const version of resume.versions
  ) {
    const relativePath =
      version.fileUrl.replace(
        /^\/+/,
        ""
      );

    const filePath =
      path.join(
        process.cwd(),
        relativePath
      );

    if (
      fs.existsSync(
        filePath
      )
    ) {
      fs.unlinkSync(
        filePath
      );
    }
  }

  // ==========================
  // DELETE DATABASE RECORD
  // ==========================
  // ResumeVersion records are
  // deleted automatically because
  // of onDelete: Cascade
  await prisma.resume.delete({
    where: {
      id: resumeId,
    },
  });

  return resume;
};

module.exports = {
  createResume,
  getUserResumes,
  updateResume,
  getResumeHistory,
  deleteResume,
};