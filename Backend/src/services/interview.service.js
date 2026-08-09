const prisma = require("../config/prisma");

// ==========================
// VALID INTERVIEW STATUSES
// ==========================
const allowedStatuses = [
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

// ==========================
// DATE HELPER
// ==========================
const parseOptionalDate = (value) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const parsedDate =
    new Date(value);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    throw new Error(
      "Invalid scheduled date"
    );
  }

  return parsedDate;
};

// ==========================
// CREATE INTERVIEW SESSION
// ==========================
const createInterviewSession = async ({
  userId,
  title,
  type,
  company,
  role,
  status = "PLANNED",
  scheduledAt,
  notes,
}) => {
  if (!title?.trim()) {
    throw new Error(
      "Interview title is required"
    );
  }

  const normalizedStatus =
    status
      ?.trim()
      .toUpperCase() ||
    "PLANNED";

  if (
    !allowedStatuses.includes(
      normalizedStatus
    )
  ) {
    throw new Error(
      "Invalid interview status"
    );
  }

  const parsedScheduledAt =
    parseOptionalDate(
      scheduledAt
    );

  return await prisma.interviewSession.create({
    data: {
      userId,

      title:
        title.trim(),

      type:
        type?.trim() ||
        null,

      company:
        company?.trim() ||
        null,

      role:
        role?.trim() ||
        null,

      status:
        normalizedStatus,

      scheduledAt:
        parsedScheduledAt,

      notes:
        notes?.trim() ||
        null,
    },
  });
};

// ==========================
// GET ALL USER INTERVIEWS
// ==========================
const getUserInterviewSessions =
  async (userId) => {
    return await prisma.interviewSession.findMany({
      where: {
        userId,
      },

      orderBy: [
        {
          scheduledAt:
            "desc",
        },
        {
          createdAt:
            "desc",
        },
      ],
    });
  };

// ==========================
// GET SINGLE INTERVIEW
// ==========================
const getInterviewSessionById =
  async ({
    interviewId,
    userId,
  }) => {
    const interview =
      await prisma.interviewSession.findFirst({
        where: {
          id:
            interviewId,

          userId,
        },
      });

    if (!interview) {
      throw new Error(
        "Interview session not found"
      );
    }

    return interview;
  };

// ==========================
// UPDATE INTERVIEW SESSION
// ==========================
const updateInterviewSession =
  async ({
    interviewId,
    userId,
    title,
    type,
    company,
    role,
    status,
    scheduledAt,
    notes,
  }) => {
    const existingInterview =
      await prisma.interviewSession.findFirst({
        where: {
          id:
            interviewId,

          userId,
        },
      });

    if (!existingInterview) {
      throw new Error(
        "Interview session not found"
      );
    }

    let normalizedStatus =
      existingInterview.status;

    if (
      status !== undefined
    ) {
      normalizedStatus =
        status
          ?.trim()
          .toUpperCase();

      if (
        !allowedStatuses.includes(
          normalizedStatus
        )
      ) {
        throw new Error(
          "Invalid interview status"
        );
      }
    }

    if (
      title !== undefined &&
      !title.trim()
    ) {
      throw new Error(
        "Interview title is required"
      );
    }

    let parsedScheduledAt =
      existingInterview.scheduledAt;

    if (
      scheduledAt !== undefined
    ) {
      parsedScheduledAt =
        parseOptionalDate(
          scheduledAt
        );
    }

    return await prisma.interviewSession.update({
      where: {
        id:
          interviewId,
      },

      data: {
        title:
          title !== undefined
            ? title.trim()
            : existingInterview.title,

        type:
          type !== undefined
            ? type?.trim() ||
              null
            : existingInterview.type,

        company:
          company !== undefined
            ? company?.trim() ||
              null
            : existingInterview.company,

        role:
          role !== undefined
            ? role?.trim() ||
              null
            : existingInterview.role,

        status:
          normalizedStatus,

        scheduledAt:
          parsedScheduledAt,

        notes:
          notes !== undefined
            ? notes?.trim() ||
              null
            : existingInterview.notes,
      },
    });
  };

// ==========================
// DELETE INTERVIEW SESSION
// ==========================
const deleteInterviewSession =
  async ({
    interviewId,
    userId,
  }) => {
    const existingInterview =
      await prisma.interviewSession.findFirst({
        where: {
          id:
            interviewId,

          userId,
        },
      });

    if (!existingInterview) {
      throw new Error(
        "Interview session not found"
      );
    }

    await prisma.interviewSession.delete({
      where: {
        id:
          interviewId,
      },
    });

    return existingInterview;
  };

module.exports = {
  createInterviewSession,
  getUserInterviewSessions,
  getInterviewSessionById,
  updateInterviewSession,
  deleteInterviewSession,
};