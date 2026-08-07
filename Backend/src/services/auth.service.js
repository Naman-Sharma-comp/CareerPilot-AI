const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/hash");
const generateToken = require("../utils/jwt");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// ==========================
// Register User
// ==========================
const registerUser = async ({ fullName, email, password }) => {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            password: hashedPassword,
        },
    });

    // Generate JWT
    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
        },
        token,
    };
};

// ==========================
// Login User
// ==========================
const loginUser = async ({ email, password }) => {
    // Find user
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
        },
        token,
    };
};
// ==========================
// Google Login
// ==========================
const googleLogin = async ({ credential }) => {

  // Verify Google Token
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const email = payload.email;
  const fullName = payload.name;

  // Check if user already exists
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Create user if not found
  if (!user) {
    user = await prisma.user.create({
      data: {
        fullName,
        email,
        provider: "google",
      },
    });
  }

  // Generate JWT
  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
    token,
  };
};

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
};