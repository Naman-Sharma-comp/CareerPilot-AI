import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Mail,
  ArrowLeft,
  Send,
  Loader2,
  KeyRound,
} from "lucide-react";

import {
  forgotPassword,
} from "../api/auth";

function ForgotPassword() {
  const navigate =
    useNavigate();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    resetToken,
    setResetToken,
  ] = useState("");

  // ==========================
  // SUBMIT FORGOT PASSWORD
  // ==========================
  const handleSubmit =
    async (event) => {
      event.preventDefault();

      try {
        setLoading(true);
        setError("");
        setSuccess("");
        setResetToken("");

        if (!email.trim()) {
          setError(
            "Please enter your email address."
          );

          return;
        }

        const response =
          await forgotPassword(
            email.trim()
          );

        setSuccess(
          response.message ||
            "Password reset request created successfully."
        );

        const token =
          response.data
            ?.resetToken;

        if (token) {
          setResetToken(
            token
          );
        }
      } catch (err) {
        console.error(
          "Forgot Password Error:",
          err
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to process your request."
        );
      } finally {
        setLoading(false);
      }
    };

  // ==========================
  // CONTINUE TO RESET PAGE
  // ==========================
  const handleContinue =
    () => {
      if (!resetToken) {
        return;
      }

      navigate(
        `/reset-password?token=${encodeURIComponent(
          resetToken
        )}`
      );
    };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Back */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition mb-5"
        >
          <ArrowLeft
            size={16}
          />

          Back to Login
        </Link>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none p-6 sm:p-8">

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5">
            <KeyRound
              size={26}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Forgot Password?
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Enter the email associated
            with your CareerPilot AI
            account.
          </p>

          {/* Error */}
          {error && (
            <div className="mt-5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl px-4 py-3 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mt-5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl px-4 py-3 text-xs font-semibold">
              {success}
            </div>
          )}

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5 mt-6"
          >

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(
                    event
                  ) =>
                    setEmail(
                      event.target
                        .value
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 text-sm font-bold transition shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Send
                  size={17}
                />
              )}

              {loading
                ? "Processing..."
                : "Continue"}
            </button>

          </form>

          {/* TEMP LOCAL TESTING */}
          {resetToken && (
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4">

                <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  Local testing mode
                </p>

                <p className="text-[11px] text-amber-700/80 dark:text-amber-400 mt-1">
                  Email delivery is not
                  enabled yet. Continue
                  using the temporary
                  reset token generated
                  by the backend.
                </p>

                <button
                  type="button"
                  onClick={
                    handleContinue
                  }
                  className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-xl transition"
                >
                  Continue to Reset Password
                </button>

              </div>

            </div>
          )}

          <div className="mt-6 text-center">

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign in
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;