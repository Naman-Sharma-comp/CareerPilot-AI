const prisma = require("../config/prisma");

const {
  hashPassword,
  comparePassword,
} = require("../utils/hash");

const generateToken = require("../utils/jwt");

// ==========================
// REGISTER USER
// ==========================
const registerUser = async ({
  fullName,
  email,
  password,
}) => {
  if (!fullName || !email || !password) {
    throw new Error("All fields are required");
  }

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  if (password.length < 6) {
    throw new Error(
      "Password must be at least 6 characters long"
    );
  }

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

  if (existingUser) {
    throw new Error(
      "An account with this email already exists"
    );
  }

  const hashedPassword =
    await hashPassword(password);

  const user =
    await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        provider: "credentials",
      },
    });

  const token =
    generateToken(user.id);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      provider: user.provider,
    },
    token,
  };
};

// ==========================
// EMAIL/PASSWORD LOGIN
// ==========================
const loginUser = async ({
  email,
  password,
}) => {
  if (!email || !password) {
    throw new Error(
      "Email and password are required"
    );
  }

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  const user =
    await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }

  if (!user.password) {
    throw new Error(
      `Please sign in using ${
        user.provider || "your social account"
      }`
    );
  }

  const isMatch =
    await comparePassword(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid email or password"
    );
  }

  const token =
    generateToken(user.id);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      provider: user.provider,
    },
    token,
  };
};

// ==========================
// GOOGLE LOGIN
// ==========================
const googleLoginUser = async ({
  credential,
}) => {
  if (!credential) {
    throw new Error(
      "Google access token is required"
    );
  }

  // ==========================
  // 1. FETCH GOOGLE PROFILE
  // ==========================
  const googleResponse =
    await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${credential}`,
        },
      }
    );

  if (!googleResponse.ok) {
    throw new Error(
      "Invalid or expired Google access token"
    );
  }

  const googleProfile =
    await googleResponse.json();

  const {
    sub,
    email,
    name,
    email_verified,
  } = googleProfile;

  if (!email) {
    throw new Error(
      "Google account does not contain an email"
    );
  }

  if (!email_verified) {
    throw new Error(
      "Google email is not verified"
    );
  }

  const normalizedEmail =
    email
      .trim()
      .toLowerCase();

  const googleId =
    sub ? String(sub) : null;

  // ==========================
  // 2. FIND BY GOOGLE ID
  // ==========================
  let user = null;

  if (googleId) {
    user =
      await prisma.user.findUnique({
        where: {
          googleId,
        },
      });
  }

  // ==========================
  // 3. FIND BY EMAIL
  // ==========================
  if (!user) {
    user =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });
  }

  // ==========================
  // 4. CREATE NEW USER
  // ==========================
  if (!user) {
    user =
      await prisma.user.create({
        data: {
          fullName:
            name?.trim() ||
            "Google User",

          email:
            normalizedEmail,

          password:
            null,

          provider:
            "google",

          googleId,
        },
      });
  }

  // ==========================
  // 5. LINK GOOGLE ACCOUNT
  // ==========================
  else if (
    googleId &&
    !user.googleId
  ) {
    user =
      await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          googleId,
        },
      });
  }

  // ==========================
  // 6. CAREERPILOT JWT
  // ==========================
  const token =
    generateToken(user.id);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      provider: user.provider,
    },

    token,
  };
};

// ==========================
// GITHUB LOGIN
// ==========================
const githubLoginUser = async ({
  code,
}) => {
  if (!code) {
    throw new Error(
      "GitHub authorization code is required"
    );
  }

  if (
    !process.env.GITHUB_CLIENT_ID ||
    !process.env.GITHUB_CLIENT_SECRET
  ) {
    throw new Error(
      "GitHub OAuth is not configured"
    );
  }

  // ==========================
  // 1. EXCHANGE CODE
  // ==========================
  const tokenResponse =
    await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",

        headers: {
          Accept:
            "application/json",

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          client_id:
            process.env
              .GITHUB_CLIENT_ID,

          client_secret:
            process.env
              .GITHUB_CLIENT_SECRET,

          code,

          redirect_uri:
            process.env
              .GITHUB_CALLBACK_URL,
        }),
      }
    );

  if (!tokenResponse.ok) {
    throw new Error(
      "Failed to contact GitHub"
    );
  }

  const tokenData =
    await tokenResponse.json();

  if (
    tokenData.error ||
    !tokenData.access_token
  ) {
    console.error(
      "GitHub Token Error:",
      tokenData.error_description ||
        tokenData.error
    );

    throw new Error(
      "GitHub authorization failed"
    );
  }

  const githubAccessToken =
    tokenData.access_token;

  // ==========================
  // 2. FETCH GITHUB PROFILE
  // ==========================
  const profileResponse =
    await fetch(
      "https://api.github.com/user",
      {
        headers: {
          Authorization:
            `Bearer ${githubAccessToken}`,

          Accept:
            "application/vnd.github+json",

          "User-Agent":
            "CareerPilot-AI",

          "X-GitHub-Api-Version":
            "2022-11-28",
        },
      }
    );

  if (!profileResponse.ok) {
    throw new Error(
      "Unable to fetch GitHub profile"
    );
  }

  const githubProfile =
    await profileResponse.json();

  // ==========================
  // 3. FETCH GITHUB EMAILS
  // ==========================
  const emailsResponse =
    await fetch(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization:
            `Bearer ${githubAccessToken}`,

          Accept:
            "application/vnd.github+json",

          "User-Agent":
            "CareerPilot-AI",

          "X-GitHub-Api-Version":
            "2022-11-28",
        },
      }
    );

  if (!emailsResponse.ok) {
    throw new Error(
      "Unable to retrieve GitHub email"
    );
  }

  const emails =
    await emailsResponse.json();

  // Prefer primary verified email
  let githubEmail =
    emails.find(
      (item) =>
        item.primary &&
        item.verified
    );

  // Otherwise use another verified email
  if (!githubEmail) {
    githubEmail =
      emails.find(
        (item) =>
          item.verified
      );
  }

  if (!githubEmail?.email) {
    throw new Error(
      "No verified email found on your GitHub account"
    );
  }

  const normalizedEmail =
    githubEmail.email
      .trim()
      .toLowerCase();

  const githubId =
    String(
      githubProfile.id
    );

  // ==========================
  // 4. FIND BY GITHUB ID
  // ==========================
  let user =
    await prisma.user.findUnique({
      where: {
        githubId,
      },
    });

  // ==========================
  // 5. FIND BY EMAIL
  // ==========================
  if (!user) {
    user =
      await prisma.user.findUnique({
        where: {
          email:
            normalizedEmail,
        },
      });
  }

  // ==========================
  // 6. CREATE NEW USER
  // ==========================
  if (!user) {
    user =
      await prisma.user.create({
        data: {
          fullName:
            githubProfile.name?.trim() ||
            githubProfile.login ||
            "GitHub User",

          email:
            normalizedEmail,

          password:
            null,

          provider:
            "github",

          githubId,
        },
      });
  }

  // ==========================
  // 7. LINK GITHUB ACCOUNT
  // ==========================
  else if (
    !user.githubId
  ) {
    user =
      await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          githubId,
        },
      });
  }

  // ==========================
  // 8. CAREERPILOT JWT
  // ==========================
  const token =
    generateToken(user.id);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      provider: user.provider,
    },

    token,
  };
};

// ==========================
// EXPORTS
// ==========================
// ==========================
// UNLINK GOOGLE ACCOUNT
// ==========================
const unlinkGoogleUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.googleId) {
    throw new Error(
      "Google account is not linked"
    );
  }

  // Prevent user from locking themselves out
  const hasAnotherLoginMethod =
    Boolean(user.password) ||
    Boolean(user.githubId) ||
    Boolean(user.linkedinId);

  if (!hasAnotherLoginMethod) {
    throw new Error(
      "You cannot remove Google because it is your only sign-in method. Add a password or connect another account first."
    );
  }

  const updatedUser =
    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        googleId: null,
      },
    });

  return {
    id: updatedUser.id,
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    provider: updatedUser.provider,
    googleLinked: Boolean(
      updatedUser.googleId
    ),
  };
};

module.exports = {
  registerUser,
  loginUser,
  googleLoginUser,
  githubLoginUser,
  unlinkGoogleUser,
};