const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes =
  require("./routes/auth.routes");

const dashboardRoutes =
  require("./routes/dashboard.routes");

const resumeRoutes =
  require("./routes/resume.routes");

const app = express();

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ==========================
// HEALTH CHECK
// ==========================
app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "CareerPilot AI Backend is running 🚀",
    });
  }
);

// ==========================
// ROUTES
// ==========================
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/resumes",
  resumeRoutes
);

module.exports = app;