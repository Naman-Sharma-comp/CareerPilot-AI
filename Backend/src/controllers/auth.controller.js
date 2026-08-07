const {
  registerUser,
  loginUser,
  googleLogin,
} = require("../services/auth.service");
// ==========================
// Register Controller
// ==========================
const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const result = await registerUser({
            fullName,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

// ==========================
// Login Controller
// ==========================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser({
            email,
            password,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};
// ==========================
// Google Login Controller
// ==========================
const google = async (req, res) => {
  try {
    const { credential } = req.body;

    const result = await googleLogin({
      credential,
    });

    res.status(200).json({
      success: true,
      message: "Google login successful",
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    register,
    login,
    google,
    getCurrentUser,
};