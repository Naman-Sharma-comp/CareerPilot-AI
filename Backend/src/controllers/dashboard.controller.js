const getDashboard = async (req, res) => {
    console.log("Dashboard controller called");
  try {
    res.status(200).json({
      success: true,
      data: {
        resumeScore: 0,
        atsScore: 0,
        learningProgress: 0,
        skillGap: 0,
        resumeUploaded: false,
        interviewsTaken: 0,
        learningModulesCompleted: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};