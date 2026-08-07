import robot from "../assets/robot.svg";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Sparkles, Lock, Mail } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { fetchUser } = useUser();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      // Handles both axios direct data return and wrapped response data
      const { data } = response;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      // Fetch latest user from backend
      await fetchUser();

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    setLoading(true);
    setError("");

    const response = await googleLogin(
      credentialResponse.credential
    );

    const data = response.data || response;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isLoggedIn", "true");

    await fetchUser();

    navigate("/dashboard");
  } catch (error) {
    console.error("Google Login Error:", error);

    setError(
      error.response?.data?.message ||
      "Google login failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Left AI Banner Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white flex flex-col justify-between items-center p-8 sm:p-12 lg:p-16 rounded-b-3xl lg:rounded-r-3xl lg:rounded-b-none shadow-xl relative overflow-hidden">
        <div className="w-full flex justify-between items-center z-10">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2"
          >
            <Sparkles size={20} /> CareerPilot AI
          </Link>
          <ThemeToggle />
        </div>

        <div className="my-auto text-center space-y-4 py-8 z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-sm mx-auto">
            Log in to access your AI resume evaluations, study guides, and interview logs.
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

      {/* Right Login Form */}
      <div className="flex justify-center items-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none fade">
          <div className="text-center space-y-1 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Sign In
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Enter your credential details to continue 👋
            </p>
          </div>

          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-3.5 text-slate-400"
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-3.5 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>

              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Action Trigger */}
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("isLoggedIn", "true");
                navigate("/dashboard");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 text-sm mt-2"
            >
              Log In
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
              <span className="px-3 text-xs font-semibold text-slate-400 uppercase">
                Or continue with
              </span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            {/* Social Authentication */}
            <div className="space-y-2.5">
              <button
                type="button"
                className="w-full bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 py-2.5 rounded-xl flex items-center justify-center gap-3 text-xs font-bold transition"
              >
                <FcGoogle size={20} /> Continue with Google
              </button>

              <button
                type="button"
                className="w-full bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 py-2.5 rounded-xl flex items-center justify-center gap-3 text-xs font-bold transition"
              >
                <FaGithub size={18} /> Continue with GitHub
              </button>

              <button
                type="button"
                className="w-full bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 py-2.5 rounded-xl flex items-center justify-center gap-3 text-xs font-bold transition"
              >
                <FaLinkedin size={18} className="text-[#0A66C2]" /> Continue
                with LinkedIn
              </button>
            </div>
          </form>

          {/* Footer Direct */}
          <p className="text-center mt-8 text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;