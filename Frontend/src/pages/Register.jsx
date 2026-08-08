import robot from "../assets/robot.svg";

import { FcGoogle } from "react-icons/fc";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useEffect,useState } from "react";

import {
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
  User,
} from "lucide-react";

import {
  useGoogleLogin,
} from "@react-oauth/google";

import ThemeToggle from "../components/ThemeToggle";

import {
  register,
  googleLogin,
} from "../api/auth";

import { useUser } from "../context/UserContext";

function Register() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const navigate =
    useNavigate();

  const { fetchUser } =
    useUser();

  // ==========================
  // NORMAL REGISTER
  // ==========================
  const handleRegister = async () => {
    setError("");

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please fill all fields."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await register({
          fullName,
          email,
          password,
        });

      const data =
        response.data || response;

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      await fetchUser();

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );
    } catch (err) {
      console.error(
        "Registration Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // GOOGLE REGISTER / LOGIN
  // ==========================
  const handleGoogleRegister =
    useGoogleLogin({
      prompt: "select_account",

      onSuccess: async (
        tokenResponse
      ) => {
        try {
          setLoading(true);
          setError("");

          if (
            !tokenResponse?.access_token
          ) {
            setError(
              "Google did not return a valid access token."
            );

            return;
          }

          const response =
            await googleLogin(
              tokenResponse.access_token
            );

          const data =
            response.data || response;

          localStorage.setItem(
            "token",
            data.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );

          localStorage.setItem(
            "isLoggedIn",
            "true"
          );

          await fetchUser();

          navigate(
            "/dashboard",
            {
              replace: true,
            }
          );
        } catch (error) {
          console.error(
            "Google Registration Error:",
            error
          );

          setError(
            error.response?.data?.message ||
              "Google registration failed. Please try again."
          );
        } finally {
          setLoading(false);
        }
      },

      onError: () => {
        setError(
          "Google sign-up failed. Please try again."
        );
      },
    });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // const handleRegister = async () => {
  //   setError("");

  //   if (!fullName || !email || !password || !confirmPassword) {
  //     setError("Please fill all fields.");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const response = await register({
  //       fullName,
  //       email,
  //       password,
  //     });

  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("user", JSON.stringify(response.data.user));
  //     localStorage.setItem("isLoggedIn", "true");

  //     navigate("/dashboard");
  //   } catch (err) {
  //     setError(
  //       err.response?.data?.message || "Registration failed. Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Left AI Banner Section */}
      <div className="bg-linear-to-br from-blue-600 via-blue-700 to-indigo-900 text-white flex flex-col justify-between items-center p-8 sm:p-12 lg:p-16 rounded-b-3xl lg:rounded-r-3xl lg:rounded-b-none shadow-xl relative overflow-hidden">

        <div className="w-full flex justify-between items-center z-10">

          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2"
          >
            <Sparkles size={20} />
            CareerPilot AI
          </Link>

          <ThemeToggle />

        </div>

        <div className="my-auto text-center space-y-4 py-8 z-10">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Start Your AI Journey!
          </h1>

          <p className="text-blue-100 text-sm sm:text-base max-w-sm mx-auto">
            Create an account to build ATS resumes,
            discover missing skills, and prepare for
            interviews.
          </p>

          <img
            src={robot}
            alt="AI Mentor Robot"
            className="w-44 sm:w-56 lg:w-72 mx-auto mt-6 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />

        </div>

        <p className="text-xs text-blue-200/80 z-10">
          © 2026 CareerPilot AI. Powered by Intelligence.
        </p>

      </div>

      {/* Right Form */}
      <div className="flex justify-center items-center p-4 sm:p-8 lg:p-12">

        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none fade">

          <div className="text-center space-y-1 mb-6">

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Create Account
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Join thousands of students building
              AI-powered careers 🚀
            </p>

          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="space-y-3.5"
          >
            {/* Full Name */}
            <div>

              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3.5 top-3.5 text-slate-400"
                />

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3.5 top-3.5 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-3.5 top-3.5 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-3.5 top-3.5 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

              </div>

            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">

              <input
                type="checkbox"
                required
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />

              <span>
                I agree to the{" "}
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Terms of Service
                </a>
              </span>

            </div>

            {/* Error */}
            {error && (
              <p className="text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-center">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 text-sm mt-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading
                ? "Creating Account..."
                : "Create Free Account"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">

              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />

              <span className="px-3 text-[10px] font-semibold text-slate-400 uppercase">
                Or signup with
              </span>

              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />

            </div>

            {/* Social Authentication */}
            <div className="grid grid-cols-3 gap-2">

              {/* Google */}
              <button
                type="button"
                onClick={() =>
                  handleGoogleRegister()
                }
                disabled={loading}
                className="bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 py-2.5 rounded-xl flex items-center justify-center transition disabled:opacity-60 disabled:cursor-not-allowed"
                title="Continue with Google"
              >
                <FcGoogle size={20} />
              </button>

              {/* GitHub */}
              <button
                type="button"
                className="bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 py-2.5 rounded-xl flex items-center justify-center transition"
                title="GitHub"
              >
                <FaGithub size={18} />
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                className="bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 py-2.5 rounded-xl flex items-center justify-center transition"
                title="LinkedIn"
              >
                <FaLinkedin
                  size={18}
                  className="text-[#0A66C2]"
                />
              </button>

            </div>

          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-xs text-slate-500 dark:text-slate-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Log in here
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;