require("dotenv").config();

const validateEnv = require(
  "./config/env"
);

validateEnv();

const app = require("./app");

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running on http://localhost:${PORT}`
    );
  }
);