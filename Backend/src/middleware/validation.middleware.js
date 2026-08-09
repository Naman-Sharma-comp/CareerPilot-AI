// ==========================
// EMAIL VALIDATOR
// ==========================
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
};

// ==========================
// REGISTER VALIDATION
// ==========================
const validateRegister = (
  req,
  res,
  next
) => {
  const {
    fullName,
    email,
    password,
  } = req.body || {};

  if (
    !fullName ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message:
        "All fields are required",
    });
  }

  const cleanName =
    fullName.trim();

  const cleanEmail =
    email.trim().toLowerCase();

  if (
    cleanName.length < 2 ||
    cleanName.length > 60
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Full name must be between 2 and 60 characters",
    });
  }

  if (
    !isValidEmail(
      cleanEmail
    )
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Please enter a valid email address",
    });
  }

  if (
    password.length < 8
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long",
    });
  }

  if (
    !/[A-Za-z]/.test(
      password
    ) ||
    !/[0-9]/.test(
      password
    )
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Password must contain at least one letter and one number",
    });
  }

  req.body.fullName =
    cleanName;

  req.body.email =
    cleanEmail;

  next();
};

// ==========================
// LOGIN VALIDATION
// ==========================
const validateLogin = (
  req,
  res,
  next
) => {
  const {
    email,
    password,
  } = req.body || {};

  if (
    !email ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Email and password are required",
    });
  }

  const cleanEmail =
    email.trim().toLowerCase();

  if (
    !isValidEmail(
      cleanEmail
    )
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Please enter a valid email address",
    });
  }

  req.body.email =
    cleanEmail;

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};