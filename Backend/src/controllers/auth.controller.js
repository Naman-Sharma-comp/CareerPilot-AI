const {
  registerUser,
  loginUser,
  googleLoginUser,
  githubLoginUser,
  linkedinLoginUser,
  unlinkGoogleUser,
  unlinkLinkedinUser,
} = require("../services/auth.service");

// ==========================
// REGISTER
// ==========================
const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
    } = req.body;

    const result =
      await registerUser({
        fullName,
        email,
        password,
      });

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "Register Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// LOGIN
// ==========================
const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const result =
      await loginUser({
        email,
        password,
      });

    return res.status(200).json({
      success: true,
      message:
        "Login successful",
      data: result,
    });
  } catch (error) {
    console.error(
      "Login Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GOOGLE LOGIN
// ==========================
const googleLogin = async (
  req,
  res
) => {
  try {
    const {
      credential,
    } = req.body;

    const result =
      await googleLoginUser({
        credential,
      });

    return res.status(200).json({
      success: true,
      message:
        "Google login successful",
      data: result,
    });
  } catch (error) {
    console.error(
      "Google Login Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GITHUB LOGIN
// ==========================
const githubLogin = async (
  req,
  res
) => {
  try {
    const {
      code,
    } = req.body || {};

    if (!code) {
      return res.status(400).json({
        success: false,
        message:
          "GitHub authorization code is required",
      });
    }

    const result =
      await githubLoginUser({
        code,
      });

    return res.status(200).json({
      success: true,
      message:
        "GitHub login successful",
      data: result,
    });
  } catch (error) {
    console.error(
      "GitHub Login Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// LINKEDIN LOGIN
// ==========================
const linkedinLogin = async (
  req,
  res
) => {
  try {
    const {
      code,
    } = req.body || {};

    if (!code) {
      return res.status(400).json({
        success: false,
        message:
          "LinkedIn authorization code is required",
      });
    }

    const result =
      await linkedinLoginUser({
        code,
      });

    return res.status(200).json({
      success: true,
      message:
        "LinkedIn login successful",
      data: result,
    });
  } catch (error) {
    console.error(
      "LinkedIn Login Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// CURRENT USER
// ==========================
const getCurrentUser = async (
  req,
  res
) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};

// ==========================
// UNLINK GOOGLE
// ==========================
const unlinkGoogle = async (
  req,
  res
) => {
  try {
    const result =
      await unlinkGoogleUser(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message:
        "Google account removed successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "Unlink Google Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// UNLINK LINKEDIN
// ==========================
const unlinkLinkedin = async (
  req,
  res
) => {
  try {
    const result =
      await unlinkLinkedinUser(
        req.user.id
      );

    return res.status(200).json({
      success: true,

      message:
        "LinkedIn account removed successfully",

      data: result,
    });
  } catch (error) {
    console.error(
      "Unlink LinkedIn Error:",
      error.message
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  githubLogin,
  linkedinLogin,
  getCurrentUser,
  unlinkGoogle,
  unlinkLinkedin,
};