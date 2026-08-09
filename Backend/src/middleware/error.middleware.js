const { Prisma } =
  require("@prisma/client");

const multer =
  require("multer");

// ==========================
// NOT FOUND HANDLER
// ==========================
const notFoundHandler = (
  req,
  res,
  next
) => {
  const error = new Error(
    `Route not found: ${req.method} ${req.originalUrl}`
  );

  error.statusCode = 404;

  next(error);
};

// ==========================
// GLOBAL ERROR HANDLER
// ==========================
const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error(
    "Global Error:",
    error.message
  );

  let statusCode =
    error.statusCode || 500;

  let message =
    error.message ||
    "Internal server error";

  // ==========================
  // EXPECTED AUTH / VALIDATION ERRORS
  // ==========================
  const badRequestMessages = [
    "All fields are required",
    "Email and password are required",
    "Invalid email or password",
    "Password must be at least 6 characters long",
    "An account with this email already exists",
    "Google access token is required",
    "Invalid or expired Google access token",
    "Google account does not contain an email",
    "Google email is not verified",
    "GitHub authorization code is required",
    "GitHub authorization failed",
    "LinkedIn authorization code is required",
    "LinkedIn authorization failed",
    "Resume not found",
    "Only PDF resumes are allowed",
  ];

  if (
    badRequestMessages.includes(
      error.message
    )
  ) {
    statusCode = 400;
  }

  // ==========================
  // MULTER ERRORS
  // ==========================
  if (
    error instanceof
    multer.MulterError
  ) {
    statusCode = 400;

    if (
      error.code ===
      "LIMIT_FILE_SIZE"
    ) {
      message =
        "File must be smaller than 5 MB";
    }
  }

  // ==========================
  // PRISMA KNOWN ERRORS
  // ==========================
  if (
    error instanceof
    Prisma.PrismaClientKnownRequestError
  ) {
    statusCode = 400;

    if (
      error.code === "P2002"
    ) {
      message =
        "A record with this value already exists";
    }

    if (
      error.code === "P2025"
    ) {
      statusCode = 404;

      message =
        "Requested record was not found";
    }
  }

  // ==========================
  // PRISMA DATABASE CONNECTION
  // ==========================
  if (
    error instanceof
    Prisma.PrismaClientInitializationError
  ) {
    statusCode = 503;

    message =
      "Database service is temporarily unavailable";
  }

  return res.status(
    statusCode
  ).json({
    success: false,
    message,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};