import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  LockKeyhole,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import {
  resetPassword,
} from "../api/auth";

function ResetPassword() {
  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const token =
    searchParams.get(
      "token"
    );

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

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

  // ==========================
  // SUBMIT RESET PASSWORD
  // ==========================
  const handleSubmit =
    async (event) => {
      event.preventDefault();

      try {
        setError("");
        setSuccess("");

        if (!token) {
          setError(
            "Reset token is missing."
          );

          return;
        }

        if (
          !newPassword ||
          !confirmPassword
        ) {
          setError(
            "Please fill in all password fields."
          );

          return;
        }

        if (
          newPassword.length < 8
        ) {
          setError(
            "Password must be at least 8 characters long."
          );

          return;
        }

        if (
          !/[A-Za-z]/.test(
            newPassword
          ) ||
          !/[0-9]/.test(
            newPassword
          )
        ) {
          setError(
            "Password must contain at least one letter and one number."
          );

          return;
        }

        if (
          newPassword !==
          confirmPassword
        ) {
          setError(
            "New password and confirm password do not match."
          );

          return;
        }

        setLoading(true);

        const response =
          await resetPassword({
            token,
            newPassword,
          });

        setSuccess(
          response.message ||
            "Password reset successfully."
        );

        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate(
            "/login"
          );
        }, 1800);
      } catch (err) {
        console.error(
          "Reset Password Error:",
          err
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to reset password."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

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

          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5">
            <LockKeyhole
              size={26}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Reset Password
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Choose a new password for
            your CareerPilot AI account.
          </p>

          {!token && (
            <div className="mt-5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl px-4 py-3 text-xs font-semibold">
              The reset link is invalid
              because no token was found.
            </div>
          )}

          {error && (
            <div className="mt-5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl px-4 py-3 text-xs font-semibold">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl px-4 py-3 text-xs font-semibold flex items-start gap-2">
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0"
              />

              <span>
                {success}
                {" "}
                Redirecting to login...
              </span>
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
                New Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    newPassword
                  }
                  onChange={(
                    event
                  ) =>
                    setNewPassword(
                      event.target
                        .value
                    )
                  }
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  disabled={
                    !token ||
                    loading ||
                    Boolean(success)
                  }
                  className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-11 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                >
                  {showNewPassword ? (
                    <EyeOff
                      size={17}
                    />
                  ) : (
                    <Eye
                      size={17}
                    />
                  )}
                </button>

              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm New Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(
                    event
                  ) =>
                    setConfirmPassword(
                      event.target
                        .value
                    )
                  }
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  disabled={
                    !token ||
                    loading ||
                    Boolean(success)
                  }
                  className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-11 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      size={17}
                    />
                  ) : (
                    <Eye
                      size={17}
                    />
                  )}
                </button>

              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 rounded-xl p-3">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Password must contain at
                least 8 characters, one
                letter, and one number.
              </p>
            </div>

            <button
              type="submit"
              disabled={
                !token ||
                loading ||
                Boolean(success)
              }
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 text-sm font-bold transition shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <LockKeyhole
                  size={17}
                />
              )}

              {loading
                ? "Resetting..."
                : "Reset Password"}
            </button>

          </form>

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

export default ResetPassword;