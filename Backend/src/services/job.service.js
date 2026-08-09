const prisma = require("../config/prisma");

// ==========================
// CREATE JOB APPLICATION
// ==========================
const createJobApplication = async ({
  userId,
  jobTitle,
  company,
  location,
  jobType,
  description,
  status = "SAVED",
  appliedDate,
}) => {
  const allowedStatuses = [
    "SAVED",
    "APPLIED",
    "INTERVIEW",
    "OFFER",
    "REJECTED",
  ];

  if (!jobTitle?.trim()) {
    throw new Error(
      "Job title is required"
    );
  }

  if (!company?.trim()) {
    throw new Error(
      "Company is required"
    );
  }

  const normalizedStatus =
    status
      ?.trim()
      .toUpperCase() ||
    "SAVED";

  if (
    !allowedStatuses.includes(
      normalizedStatus
    )
  ) {
    throw new Error(
      "Invalid application status"
    );
  }

  return await prisma.jobApplication.create({
    data: {
      userId,

      jobTitle:
        jobTitle.trim(),

      company:
        company.trim(),

      location:
        location?.trim() ||
        null,

      jobType:
        jobType?.trim() ||
        null,

      description:
        description?.trim() ||
        null,

      status:
        normalizedStatus,

      appliedDate:
        appliedDate
          ? new Date(
              appliedDate
            )
          : null,
    },
  });
};

// ==========================
// GET USER JOB APPLICATIONS
// ==========================
const getUserJobApplications =
  async (userId) => {
    return await prisma.jobApplication.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

// ==========================
// GET SINGLE JOB APPLICATION
// ==========================
const getJobApplicationById =
  async ({
    jobId,
    userId,
  }) => {
    const job =
      await prisma.jobApplication.findFirst({
        where: {
          id: jobId,
          userId,
        },
      });

    if (!job) {
      throw new Error(
        "Job application not found"
      );
    }

    return job;
  };

// ==========================
// UPDATE JOB APPLICATION
// ==========================
const updateJobApplication =
  async ({
    jobId,
    userId,
    jobTitle,
    company,
    location,
    jobType,
    description,
    status,
    appliedDate,
  }) => {
    const existingJob =
      await prisma.jobApplication.findFirst({
        where: {
          id: jobId,
          userId,
        },
      });

    if (!existingJob) {
      throw new Error(
        "Job application not found"
      );
    }

    const allowedStatuses = [
      "SAVED",
      "APPLIED",
      "INTERVIEW",
      "OFFER",
      "REJECTED",
    ];

    let normalizedStatus =
      existingJob.status;

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
          "Invalid application status"
        );
      }
    }

    return await prisma.jobApplication.update({
      where: {
        id: jobId,
      },

      data: {
        jobTitle:
          jobTitle !== undefined
            ? jobTitle.trim()
            : existingJob.jobTitle,

        company:
          company !== undefined
            ? company.trim()
            : existingJob.company,

        location:
          location !== undefined
            ? location?.trim() ||
              null
            : existingJob.location,

        jobType:
          jobType !== undefined
            ? jobType?.trim() ||
              null
            : existingJob.jobType,

        description:
          description !== undefined
            ? description?.trim() ||
              null
            : existingJob.description,

        status:
          normalizedStatus,

        appliedDate:
          appliedDate !== undefined
            ? appliedDate
              ? new Date(
                  appliedDate
                )
              : null
            : existingJob.appliedDate,
      },
    });
  };

// ==========================
// DELETE JOB APPLICATION
// ==========================
const deleteJobApplication =
  async ({
    jobId,
    userId,
  }) => {
    const existingJob =
      await prisma.jobApplication.findFirst({
        where: {
          id: jobId,
          userId,
        },
      });

    if (!existingJob) {
      throw new Error(
        "Job application not found"
      );
    }

    await prisma.jobApplication.delete({
      where: {
        id: jobId,
      },
    });

    return existingJob;
  };

module.exports = {
  createJobApplication,
  getUserJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
};