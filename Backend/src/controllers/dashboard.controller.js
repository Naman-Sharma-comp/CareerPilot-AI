const prisma = require("../config/prisma");

const getDashboard = async (req, res) => {
  console.log("Dashboard controller called");

  try {
    const userId = req.user.id;

    // Count user's resumes
    const resumeCount = await prisma.resume.count({
      where: {
        userId: userId,
      },
    });

    // Count user's jobs
    const jobCount = await prisma.jobApplication.count({
      where: {
        userId: userId,
      },
    });

    // Count user's interviews
    const interviewCount = await prisma.interviewSession.count({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        resumeCount: resumeCount,
        jobCount: jobCount,
        interviewCount: interviewCount,
      },
    });

  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

module.exports = {
  getDashboard,
};