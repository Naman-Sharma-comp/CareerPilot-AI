import { useState } from "react";

import {
  User,
  Bell,
  Shield,
  Save,
  KeyRound,
  Link2,
  RefreshCw,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { useUser } from "../context/UserContext";

function Setting() {
  const [notifications, setNotifications] =
    useState(true);

  const [
    reauthenticatingGoogle,
    setReauthenticatingGoogle,
  ] = useState(false);

  const [
    reauthenticatingGithub,
    setReauthenticatingGithub,
  ] = useState(false);

  const [
    reauthenticatingLinkedin,
    setReauthenticatingLinkedin,
  ] = useState(false);

  const { user } = useUser();

  // ==========================
  // GOOGLE RE-AUTHENTICATION
  // ==========================
  const handleGoogleReauthenticate = () => {
    try {
      setReauthenticatingGoogle(true);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");

      window.location.href =
        "/login?reauth=google";
    } catch (error) {
      console.error(
        "Google Re-authentication Error:",
        error
      );

      setReauthenticatingGoogle(false);
    }
  };

  // ==========================
  // GITHUB RE-AUTHENTICATION
  // ==========================
  const handleGithubReauthenticate = () => {
    try {
      setReauthenticatingGithub(true);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");

      window.location.href =
        "/login?reauth=github";
    } catch (error) {
      console.error(
        "GitHub Re-authentication Error:",
        error
      );

      setReauthenticatingGithub(false);
    }
  };

  // ==========================
  // LINKEDIN RE-AUTHENTICATION
  // ==========================
  const handleLinkedinReauthenticate = () => {
    try {
      setReauthenticatingLinkedin(true);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");

      window.location.href =
        "/login?reauth=linkedin";
    } catch (error) {
      console.error(
        "LinkedIn Re-authentication Error:",
        error
      );

      setReauthenticatingLinkedin(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Settings
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your account credentials,
          career goals, and notification
          channels.
        </p>
      </div>

      {/* Profile Details */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">

        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
          <User
            size={16}
            className="text-blue-500"
          />
          Profile Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>

            <input
              type="text"
              value={user?.fullName || ""}
              readOnly
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

        </div>
      </div>

      {/* Career Preferences */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">

        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
          <Bell
            size={16}
            className="text-purple-500"
          />
          Career Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Role
            </label>

            <select className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              <option>Software Engineer</option>
              <option>AI/ML Engineer</option>
              <option>Data Scientist</option>
              <option>Full Stack Developer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Current Skill Level
            </label>

            <select className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

        </div>

        {/* Notifications */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">

          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Email Notifications
            </p>

            <p className="text-[11px] text-slate-400">
              Receive weekly AI progress
              updates and study reminders.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setNotifications(
                !notifications
              )
            }
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              notifications
                ? "bg-blue-600"
                : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                notifications
                  ? "translate-x-6"
                  : "translate-x-0"
              }`}
            />
          </button>

        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">

        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
          <Link2
            size={16}
            className="text-emerald-500"
          />
          Connected Accounts
        </h2>

        <div className="space-y-3 pt-2">

          {/* Google */}
          <div className="flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <FcGoogle size={22} />
              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Google
                </p>

                <p className="text-[11px] text-slate-400">
                  Re-authenticate your
                  Google sign-in account
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={
                handleGoogleReauthenticate
              }
              disabled={
                reauthenticatingGoogle
              }
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                size={15}
                className={
                  reauthenticatingGoogle
                    ? "animate-spin"
                    : ""
                }
              />

              {reauthenticatingGoogle
                ? "Redirecting..."
                : "Sign in again"}
            </button>

          </div>

          {/* GitHub */}
          <div className="flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700">

                <FaGithub
                  size={21}
                  className="text-slate-900 dark:text-white"
                />

              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  GitHub
                </p>

                <p className="text-[11px] text-slate-400">
                  Re-authenticate your
                  GitHub sign-in account
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={
                handleGithubReauthenticate
              }
              disabled={
                reauthenticatingGithub
              }
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-500/10 hover:bg-slate-500/20 border border-slate-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                size={15}
                className={
                  reauthenticatingGithub
                    ? "animate-spin"
                    : ""
                }
              />

              {reauthenticatingGithub
                ? "Redirecting..."
                : "Sign in again"}
            </button>

          </div>

          {/* LinkedIn */}
          <div className="flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700">

                <FaLinkedin
                  size={21}
                  className="text-[#0A66C2]"
                />

              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  LinkedIn
                </p>

                <p className="text-[11px] text-slate-400">
                  Re-authenticate your
                  LinkedIn sign-in account
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={
                handleLinkedinReauthenticate
              }
              disabled={
                reauthenticatingLinkedin
              }
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0A66C2] bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                size={15}
                className={
                  reauthenticatingLinkedin
                    ? "animate-spin"
                    : ""
                }
              />

              {reauthenticatingLinkedin
                ? "Redirecting..."
                : "Sign in again"}
            </button>

          </div>

        </div>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">

        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">

          <Shield
            size={16}
            className="text-rose-500"
          />

          Account Security

        </h2>

        <div className="pt-2">

          <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition">

            <KeyRound size={16} />

            Change Password

          </button>

        </div>
      </div>

      {/* Save Settings */}
      <div className="pt-2">

        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition hover:scale-105 active:scale-95 w-full sm:w-auto">

          <Save size={16} />

          Save Settings

        </button>

      </div>

    </div>
  );
}

export default Setting;