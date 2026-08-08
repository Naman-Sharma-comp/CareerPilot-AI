import robot from "../assets/robot.svg";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
} from "lucide-react";

import {
  useGoogleLogin,
} from "@react-oauth/google";

import ThemeToggle from "../components/ThemeToggle";

import {
  login,
  googleLogin,
  githubLogin,
} from "../api/auth";

import { useUser } from "../context/UserContext";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [googleReauth, setGoogleReauth] =
    useState(false);

  const [githubReauth, setGithubReauth] =
    useState(false);

  const navigate = useNavigate();

  const { fetchUser } = useUser();

  const githubCallbackHandled =
    useRef(false);

  // ==========================
  // LOGIN PAGE INITIALIZATION
  // + GITHUB CALLBACK
  // ==========================
  useEffect(() => {
    const handleLoginPage =
      async () => {
        const params =
          new URLSearchParams(
            window.location.search
          );

        // ==========================
        // RE-AUTH MODE
        // ==========================
        const reauth =
          params.get("reauth");

        if (reauth === "google") {
          setGoogleReauth(true);
        }

        if (reauth === "github") {
          setGithubReauth(true);
        }

        // ==========================
        // GITHUB CALLBACK DATA
        // ==========================
        const code =
          params.get("code");

        const returnedState =
          params.get("state");

        const githubError =
          params.get("error");

        // GitHub authorization cancelled
        if (githubError) {
          setError(
            "GitHub authorization was cancelled."
          );

          window.history.replaceState(
            {},
            "",
            "/login"
          );

          setGithubReauth(false);

          return;
        }

        // ==========================
        // NORMAL LOGIN PAGE
        // ==========================
        if (!code) {
          const token =
            localStorage.getItem(
              "token"
            );

          if (
            token &&
            reauth !== "google" &&
            reauth !== "github"
          ) {
            navigate(
              "/dashboard",
              {
                replace: true,
              }
            );
          }

          return;
        }

        // ==========================
        // PREVENT DOUBLE CALLBACK
        // ==========================
        if (
          githubCallbackHandled.current
        ) {
          return;
        }

        githubCallbackHandled.current =
          true;

        // ==========================
        // VERIFY GITHUB STATE
        // ==========================
        const savedState =
          sessionStorage.getItem(
            "github_oauth_state"
          );

        if (
          !savedState ||
          savedState !== returnedState
        ) {
          sessionStorage.removeItem(
            "github_oauth_state"
          );

          window.history.replaceState(
            {},
            "",
            "/login"
          );

          setGithubReauth(false);

          setError(
            "Invalid GitHub login state. Please try again."
          );

          return;
        }

        sessionStorage.removeItem(
          "github_oauth_state"
        );

        // ==========================
        // COMPLETE GITHUB LOGIN
        // ==========================
        try {
          setLoading(true);
          setError("");

          const response =
            await githubLogin(code);

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

          window.history.replaceState(
            {},
            "",
            "/login"
          );

          setGithubReauth(false);

          await fetchUser();

          navigate(
            "/dashboard",
            {
              replace: true,
            }
          );
        } catch (err) {
          console.error(
            "GitHub Login Error:",
            err
          );

          window.history.replaceState(
            {},
            "",
            "/login"
          );

          setGithubReauth(false);

          setError(
            err.response?.data?.message ||
              "GitHub login failed. Please try again."
          );
        } finally {
          setLoading(false);
        }
      };

    handleLoginPage();
  }, [navigate, fetchUser]);

  // ==========================
  // EMAIL/PASSWORD LOGIN
  // ==========================
  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError(
        "Please fill all fields."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await login({
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
        "Login Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // GOOGLE LOGIN
  // ==========================
  const handleGoogleLogin =
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

          window.history.replaceState(
            {},
            "",
            "/login"
          );

          setGoogleReauth(false);

          await fetchUser();

          navigate(
            "/dashboard",
            {
              replace: true,
            }
          );
        } catch (error) {
          console.error(
            "Google Login Error:",
            error
          );

          setError(
            error.response?.data
              ?.message ||
              "Google login failed. Please try again."
          );
        } finally {
          setLoading(false);
        }
      },

      onError: () => {
        setError(
          "Google sign-in failed. Please try again."
        );
      },
    });

  // ==========================
  // START GITHUB LOGIN
  // ==========================
  const handleGithubLogin = () => {
    setError("");

    const clientId =
      import.meta.env
        .VITE_GITHUB_CLIENT_ID;

    if (!clientId) {
      setError(
        "GitHub login is not configured."
      );

      return;
    }

    const state =
      crypto.randomUUID();

    sessionStorage.setItem(
      "github_oauth_state",
      state
    );

    const redirectUri =
      `${window.location.origin}/login`;

    const githubUrl =
      new URL(
        "https://github.com/login/oauth/authorize"
      );

    githubUrl.searchParams.set(
      "client_id",
      clientId
    );

    githubUrl.searchParams.set(
      "redirect_uri",
      redirectUri
    );

    githubUrl.searchParams.set(
      "scope",
      "user:email"
    );

    githubUrl.searchParams.set(
      "state",
      state
    );

    window.location.href =
      githubUrl.toString();
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Left AI Banner */}
      <div className="bg-linear-to-tr from-blue-600 via-blue-700 to-indigo-900 text-white flex flex-col justify-between items-center p-8 sm:p-12 lg:p-16 rounded-b-3xl lg:rounded-r-3xl lg:rounded-b-none shadow-xl relative overflow-hidden">

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
            Welcome Back !
          </h1>

          <p className="text-blue-100 text-sm sm:text-base max-w-sm mx-auto">
            Log in to access your AI
            resume evaluations, study
            guides, and interview logs.
          </p>

          <img
            src={robot}
            alt="AI Mentor Robot"
            className="w-44 sm:w-56 lg:w-72 mx-auto mt-6 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />

        </div>

        <p className="text-xs text-blue-200/80 z-10">
          © 2026 CareerPilot AI.
          Powered by Intelligence.
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
              Enter your credential
              details to continue 👋
            </p>

          </div>

          {/* Google Re-auth Message */}
          {googleReauth && (
            <div className="mb-5 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">

              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 text-center">
                Your Google session was cleared.
                Sign in with Google again to continue.
              </p>

            </div>
          )}

          {/* GitHub Re-auth Message */}
          {githubReauth && (
            <div className="mb-5 bg-slate-500/10 border border-slate-500/20 rounded-xl p-3">

              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center">
                Your GitHub session was cleared.
                Sign in with GitHub again to continue.
              </p>

            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >

            {/* Email */}
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
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

              </div>

            </div>

            {/* Password */}
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
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

            {/* Options */}
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

            {/* Error */}
            {error && (
              <p className="text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-center">
                {error}
              </p>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 text-sm mt-2 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading
                ? "Signing In..."
                : "Log In"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">

              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />

              <span className="px-3 text-xs font-semibold text-slate-400 uppercase">
                Or continue with
              </span>

              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />

            </div>

            {/* Social Login */}
            <div className="space-y-2.5">

              {/* Google */}
              <button
                type="button"
                onClick={() =>
                  handleGoogleLogin()
                }
                disabled={loading}
                className={`w-full border py-2.5 rounded-xl flex items-center justify-center gap-3 text-xs font-bold transition disabled:opacity-60 disabled:cursor-not-allowed ${
                  googleReauth
                    ? "bg-blue-500/10 border-blue-500/40 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20"
                    : "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/80"
                }`}
              >
                <FcGoogle size={20} />

                {googleReauth
                  ? "Sign in again with Google"
                  : "Continue with Google"}
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={handleGithubLogin}
                disabled={loading}
                className={`w-full border py-2.5 rounded-xl flex items-center justify-center gap-3 text-xs font-bold transition disabled:opacity-60 disabled:cursor-not-allowed ${
                  githubReauth
                    ? "bg-slate-900 dark:bg-slate-700 border-slate-900 dark:border-slate-600 text-white hover:bg-slate-800"
                    : "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/80"
                }`}
              >
                <FaGithub size={18} />

                {githubReauth
                  ? "Sign in again with GitHub"
                  : "Continue with GitHub"}
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                className="w-full bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 py-2.5 rounded-xl flex items-center justify-center gap-3 text-xs font-bold transition"
              >
                <FaLinkedin
                  size={18}
                  className="text-[#0A66C2]"
                />

                Continue with LinkedIn
              </button>

            </div>

          </form>

          {/* Footer */}
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