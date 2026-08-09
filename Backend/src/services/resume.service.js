const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

// ==========================
// HELPER: URL -> LOCAL PATH
// ==========================
const getLocalFilePath = (fileUrl) => {
  const relativePath =
    fileUrl.replace(
      /^\/+/,
      ""
    );

  return path.join(
    process.cwd(),
    relativePath
  );
};

// ==========================
// HELPER: SAFE FILE DELETE
// ==========================
const safeDeleteFile = (
  filePath
) => {
  try {
    if (
      fs.existsSync(
        filePath
      )
    ) {
      fs.unlinkSync(
        filePath
      );
    }
  } catch (error) {
    console.error(
      "File Delete Error:",
      filePath,
      error.message
    );
  }
};

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
  // TRANSACTION
  // ==========================
  const updatedResume =
    await prisma.$transaction(
      async (tx) => {
        // Save old version
        await tx.resumeVersion.create({
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

        // Update current resume
        return await tx.resume.update({
          where: {
            id: resumeId,
          },

          data: {
            fileName,
            fileUrl,
            fileType,
          },
        });
      }
    );

  return updatedResume;
};

// ==========================
// GET RESUME HISTORY
// ==========================
const getResumeHistory = async ({
  resumeId,
  userId,
}) => {
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

  return await prisma.resumeVersion.findMany({
    where: {
      resumeId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
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
  // COLLECT FILE PATHS FIRST
  // ==========================
  const filesToDelete = [];

  filesToDelete.push(
    getLocalFilePath(
      resume.fileUrl
    )
  );

  for (
    const version of resume.versions
  ) {
    filesToDelete.push(
      getLocalFilePath(
        version.fileUrl
      )
    );
  }

  // ==========================
  // DELETE DATABASE FIRST
  // ==========================
  // ResumeVersion rows are removed
  // automatically because of Cascade.
  await prisma.resume.delete({
    where: {
      id: resumeId,
    },
  });

  // ==========================
  // DELETE PHYSICAL FILES
  // ==========================
  for (
    const filePath of filesToDelete
  ) {
    safeDeleteFile(
      filePath
    );
  }

  return resume;
};

module.exports = {
  createResume,
  getUserResumes,
  updateResume,
  getResumeHistory,
  deleteResume,
};