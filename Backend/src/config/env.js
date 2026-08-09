const requiredEnvVars = [
  "DATABASE_URL",
  "JWT_SECRET",
];

const optionalOAuthGroups = [
  {
    name: "GitHub OAuth",
    vars: [
      "GITHUB_CLIENT_ID",
      "GITHUB_CLIENT_SECRET",
      "GITHUB_CALLBACK_URL",
    ],
  },
  {
    name: "LinkedIn OAuth",
    vars: [
      "LINKEDIN_CLIENT_ID",
      "LINKEDIN_CLIENT_SECRET",
      "LINKEDIN_CALLBACK_URL",
    ],
  },
];

const validateEnv = () => {
  const missingRequired =
    requiredEnvVars.filter(
      (key) =>
        !process.env[key] ||
        !process.env[key].trim()
    );

  if (missingRequired.length > 0) {
    console.error(
      "Missing required environment variables:"
    );

    missingRequired.forEach(
      (key) => {
        console.error(`- ${key}`);
      }
    );

    process.exit(1);
  }

  optionalOAuthGroups.forEach(
    (group) => {
      const configured =
        group.vars.filter(
          (key) =>
            process.env[key] &&
            process.env[key].trim()
        );

      if (
        configured.length > 0 &&
        configured.length <
          group.vars.length
      ) {
        console.warn(
          `${group.name} is only partially configured.`
        );

        group.vars.forEach(
          (key) => {
            if (
              !process.env[key] ||
              !process.env[key].trim()
            ) {
              console.warn(
                `Missing: ${key}`
              );
            }
          }
        );
      }
    }
  );

  console.log(
    "✅ Environment variables validated"
  );
};

module.exports = validateEnv;