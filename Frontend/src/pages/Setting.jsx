import {
  useEffect,
  useState,
} from "react";

import {
  User,
  Bell,
  Shield,
  Save,
  KeyRound,
  Link2,
  RefreshCw,
  Loader2,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { useUser } from "../context/UserContext";

import {
  getProfile,
  updateProfile,
  getCareerPreferences,
  updateCareerPreferences,
  getNotificationPreference,
  updateNotificationPreference,
} from "../api/profile";

import {
  changePassword,
} from "../api/auth";

function Setting() {
  const { user } = useUser();

  const [
    notifications,
    setNotifications,
  ] = useState(true);

  const [
    savingNotifications,
    setSavingNotifications,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    showPasswordForm,
    setShowPasswordForm,
  ] = useState(false);

  const [
    changingPassword,
    setChangingPassword,
  ] = useState(false);

  const [
    passwordSuccess,
    setPasswordSuccess,
  ] = useState("");

  const [
    passwordError,
    setPasswordError,
  ] = useState("");

  // ==========================
  // PROFILE FORM
  // ==========================
  const [
    profileForm,
    setProfileForm,
  ] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    college: "",
    degree: "",
    graduationYear: "",
    skills: "",
  });

  // ==========================
  // CAREER FORM
  // ==========================
  const [
    careerForm,
    setCareerForm,
  ] = useState({
    targetRole:
      "Software Engineer",

    preferredLocation: "",

    workMode:
      "Hybrid",

    jobType:
      "Full Time",

    experienceLevel:
      "Beginner",

    industries: "",
  });

  // ==========================
  // PASSWORD FORM
  // ==========================
  const [
    passwordForm,
    setPasswordForm,
  ] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  // ==========================
  // LOAD SETTINGS
  // ==========================
  useEffect(() => {
    const loadSettings =
      async () => {
        try {
          setLoading(true);
          setError("");

          const [
            profileResponse,
            careerResponse,
            notificationResponse,
          ] =
            await Promise.all([
              getProfile(),
              getCareerPreferences(),
              getNotificationPreference(),
            ]);

          // ==========================
          // PROFILE DATA
          // ==========================
          const profileData =
            profileResponse.data;

          const savedProfile =
            profileData.profile;

          setProfileForm({
            fullName:
              profileData.fullName ||
              "",

            email:
              profileData.email ||
              "",

            phone:
              savedProfile?.phone ||
              "",

            bio:
              savedProfile?.bio ||
              "",

            location:
              savedProfile?.location ||
              "",

            college:
              savedProfile?.college ||
              "",

            degree:
              savedProfile?.degree ||
              "",

            graduationYear:
              savedProfile?.graduationYear
                ? String(
                    savedProfile.graduationYear
                  )
                : "",

            skills:
              savedProfile?.skills?.join(
                ", "
              ) || "",
          });

          // ==========================
          // CAREER DATA
          // ==========================
          const preferences =
            careerResponse.data;

          setCareerForm({
            targetRole:
              preferences.targetRole ||
              "Software Engineer",

            preferredLocation:
              preferences.preferredLocation ||
              "",

            workMode:
              preferences.workMode ||
              "Hybrid",

            jobType:
              preferences.jobType ||
              "Full Time",

            experienceLevel:
              preferences.experienceLevel ||
              "Beginner",

            industries:
              preferences.industries?.join(
                ", "
              ) || "",
          });

          // ==========================
          // NOTIFICATION DATA
          // ==========================
          setNotifications(
            notificationResponse
              ?.data
              ?.notificationsEnabled ??
              true
          );
        } catch (err) {
          console.error(
            "Settings Load Error:",
            err
          );

          setError(
            err.response?.data
              ?.message ||
              "Unable to load settings."
          );
        } finally {
          setLoading(false);
        }
      };

    loadSettings();
  }, []);

  // ==========================
  // PROFILE INPUT CHANGE
  // ==========================
  const handleProfileChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setProfileForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  // ==========================
  // CAREER INPUT CHANGE
  // ==========================
  const handleCareerChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setCareerForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  // ==========================
  // PASSWORD INPUT CHANGE
  // ==========================
  const handlePasswordChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPasswordForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  // ==========================
  // NOTIFICATION TOGGLE
  // ==========================
  const handleNotificationToggle =
    async () => {
      if (savingNotifications) {
        return;
      }

      const previousValue =
        notifications;

      const newValue =
        !notifications;

      // Update UI immediately
      setNotifications(
        newValue
      );

      try {
        setSavingNotifications(
          true
        );

        setError("");
        setSuccess("");

        const response =
          await updateNotificationPreference(
            newValue
          );

        setNotifications(
          response?.data
            ?.notificationsEnabled ??
            newValue
        );

        setSuccess(
          newValue
            ? "Notifications enabled."
            : "Notifications disabled."
        );
      } catch (err) {
        console.error(
          "Notification Update Error:",
          err
        );

        // Roll back toggle if API fails
        setNotifications(
          previousValue
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to update notification preference."
        );
      } finally {
        setSavingNotifications(
          false
        );
      }
    };

  // ==========================
  // SAVE SETTINGS
  // ==========================
  const handleSaveSettings =
    async () => {
      try {
        setSaving(true);
        setError("");
        setSuccess("");

        const skills =
          profileForm.skills
            .split(",")
            .map(
              (skill) =>
                skill.trim()
            )
            .filter(Boolean);

        const industries =
          careerForm.industries
            .split(",")
            .map(
              (industry) =>
                industry.trim()
            )
            .filter(Boolean);

        await updateProfile({
          fullName:
            profileForm.fullName,

          phone:
            profileForm.phone,

          bio:
            profileForm.bio,

          location:
            profileForm.location,

          college:
            profileForm.college,

          degree:
            profileForm.degree,

          graduationYear:
            profileForm
              .graduationYear,

          skills,
        });

        await updateCareerPreferences({
          targetRole:
            careerForm.targetRole,

          preferredLocation:
            careerForm
              .preferredLocation,

          workMode:
            careerForm.workMode,

          jobType:
            careerForm.jobType,

          experienceLevel:
            careerForm
              .experienceLevel,

          industries,
        });

        setSuccess(
          "Settings saved successfully."
        );
      } catch (err) {
        console.error(
          "Save Settings Error:",
          err
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to save settings."
        );
      } finally {
        setSaving(false);
      }
    };

  // ==========================
  // CHANGE PASSWORD
  // ==========================
  const handleChangePassword =
    async () => {
      try {
        setPasswordError("");
        setPasswordSuccess("");

        if (
          !passwordForm.currentPassword ||
          !passwordForm.newPassword ||
          !passwordForm.confirmPassword
        ) {
          setPasswordError(
            "Please fill in all password fields."
          );

          return;
        }

        if (
          passwordForm.newPassword !==
          passwordForm.confirmPassword
        ) {
          setPasswordError(
            "New password and confirm password do not match."
          );

          return;
        }

        setChangingPassword(true);

        const response =
          await changePassword({
            currentPassword:
              passwordForm.currentPassword,

            newPassword:
              passwordForm.newPassword,
          });

        setPasswordSuccess(
          response.message ||
            "Password changed successfully."
        );

        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        setShowPasswordForm(false);
      } catch (err) {
        console.error(
          "Change Password Error:",
          err
        );

        setPasswordError(
          err.response?.data
            ?.message ||
            "Unable to change password."
        );
      } finally {
        setChangingPassword(false);
      }
    };

  // ==========================
  // GOOGLE RE-AUTHENTICATION
  // ==========================
  const handleGoogleReauthenticate =
    () => {
      try {
        setReauthenticatingGoogle(
          true
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "isLoggedIn"
        );

        window.location.href =
          "/login?reauth=google";
      } catch (error) {
        console.error(
          "Google Re-authentication Error:",
          error
        );

        setReauthenticatingGoogle(
          false
        );
      }
    };

  // ==========================
  // GITHUB RE-AUTHENTICATION
  // ==========================
  const handleGithubReauthenticate =
    () => {
      try {
        setReauthenticatingGithub(
          true
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "isLoggedIn"
        );

        window.location.href =
          "/login?reauth=github";
      } catch (error) {
        console.error(
          "GitHub Re-authentication Error:",
          error
        );

        setReauthenticatingGithub(
          false
        );
      }
    };

  // ==========================
  // LINKEDIN RE-AUTHENTICATION
  // ==========================
  const handleLinkedinReauthenticate =
    () => {
      try {
        setReauthenticatingLinkedin(
          true
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "isLoggedIn"
        );

        window.location.href =
          "/login?reauth=linkedin";
      } catch (error) {
        console.error(
          "LinkedIn Re-authentication Error:",
          error
        );

        setReauthenticatingLinkedin(
          false
        );
      }
    };

  if (loading) {
    return (
      <div className="min-h-75 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">

          <Loader2
            size={18}
            className="animate-spin"
          />

          Loading settings...

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ==========================
          TITLE
      ========================== */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Settings
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your account credentials,
          career goals, and notification
          preferences.
        </p>
      </div>

      {/* ==========================
          MESSAGES
      ========================== */}
      {success && (
        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl px-4 py-3 text-xs font-semibold">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl px-4 py-3 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* ==========================
          PROFILE DETAILS
      ========================== */}
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
              name="fullName"
              value={
                profileForm.fullName
              }
              onChange={
                handleProfileChange
              }
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>

            <input
              type="email"
              value={
                profileForm.email ||
                user?.email ||
                ""
              }
              readOnly
              className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 focus:outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={
                profileForm.phone
              }
              onChange={
                handleProfileChange
              }
              placeholder="Your phone number"
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={
                profileForm.location
              }
              onChange={
                handleProfileChange
              }
              placeholder="Pune"
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              College
            </label>

            <input
              type="text"
              name="college"
              value={
                profileForm.college
              }
              onChange={
                handleProfileChange
              }
              placeholder="College name"
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Degree
            </label>

            <input
              type="text"
              name="degree"
              value={
                profileForm.degree
              }
              onChange={
                handleProfileChange
              }
              placeholder="B.Tech Computer Engineering"
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Graduation Year
            </label>

            <input
              type="number"
              name="graduationYear"
              value={
                profileForm.graduationYear
              }
              onChange={
                handleProfileChange
              }
              placeholder="2028"
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={
                profileForm.skills
              }
              onChange={
                handleProfileChange
              }
              placeholder="React, Python, SQL"
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Bio
          </label>

          <textarea
            name="bio"
            value={
              profileForm.bio
            }
            onChange={
              handleProfileChange
            }
            rows={3}
            placeholder="Tell CareerPilot a little about yourself..."
            className="w-full resize-none bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

      </div>

      {/* ==========================
          CAREER PREFERENCES
      ========================== */}
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

            <select
              name="targetRole"
              value={
                careerForm.targetRole
              }
              onChange={
                handleCareerChange
              }
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>
                Software Engineer
              </option>

              <option>
                AI/ML Engineer
              </option>

              <option>
                Data Scientist
              </option>

              <option>
                Full Stack Developer
              </option>

              <option>
                Backend Developer
              </option>

              <option>
                Frontend Developer
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Current Skill Level
            </label>

            <select
              name="experienceLevel"
              value={
                careerForm.experienceLevel
              }
              onChange={
                handleCareerChange
              }
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>
                Beginner
              </option>

              <option>
                Intermediate
              </option>

              <option>
                Advanced
              </option>

              <option>
                Fresher
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Preferred Location
            </label>

            <input
              type="text"
              name="preferredLocation"
              value={
                careerForm.preferredLocation
              }
              onChange={
                handleCareerChange
              }
              placeholder="Pune"
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Work Mode
            </label>

            <select
              name="workMode"
              value={
                careerForm.workMode
              }
              onChange={
                handleCareerChange
              }
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>
                Remote
              </option>

              <option>
                Hybrid
              </option>

              <option>
                On-site
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Job Type
            </label>

            <select
              name="jobType"
              value={
                careerForm.jobType
              }
              onChange={
                handleCareerChange
              }
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>
                Full Time
              </option>

              <option>
                Internship
              </option>

              <option>
                Part Time
              </option>

              <option>
                Contract
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Preferred Industries
            </label>

            <input
              type="text"
              name="industries"
              value={
                careerForm.industries
              }
              onChange={
                handleCareerChange
              }
              placeholder="Software, AI, Web Development"
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

        </div>

        {/* ==========================
            NOTIFICATIONS
        ========================== */}
        <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">

          <div className="flex items-start gap-3">

            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">

              <Bell size={17} />

            </div>

            <div>
              <div className="flex items-center gap-2">

                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Notification Preference
                </p>

                {savingNotifications && (
                  <Loader2
                    size={12}
                    className="animate-spin text-blue-500"
                  />
                )}

              </div>

              <p className="text-[11px] text-slate-400 mt-0.5">
                Choose whether CareerPilot
                should enable email
                notifications for your
                account.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={
              handleNotificationToggle
            }
            disabled={
              savingNotifications
            }
            aria-pressed={
              notifications
            }
            aria-label="Toggle notification preference"
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 ${
              notifications
                ? "bg-blue-600"
                : "bg-slate-300 dark:bg-slate-700"
            } ${
              savingNotifications
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer"
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

      {/* ==========================
          CONNECTED ACCOUNTS
      ========================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">

        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">

          <Link2
            size={16}
            className="text-emerald-500"
          />

          Connected Accounts

        </h2>

        <div className="space-y-3 pt-2">

          {/* GOOGLE */}
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

          {/* GITHUB */}
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

          {/* LINKEDIN */}
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

      {/* ==========================
          SECURITY
      ========================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">

        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">

          <Shield
            size={16}
            className="text-rose-500"
          />

          Account Security

        </h2>

        {passwordSuccess && (
          <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl px-4 py-3 text-xs font-semibold">
            {passwordSuccess}
          </div>
        )}

        {passwordError && (
          <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl px-4 py-3 text-xs font-semibold">
            {passwordError}
          </div>
        )}

        <div className="pt-2">

          <button
            type="button"
            onClick={() => {
              setShowPasswordForm(
                !showPasswordForm
              );

              setPasswordError("");
              setPasswordSuccess("");
            }}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition"
          >

            <KeyRound size={16} />

            {showPasswordForm
              ? "Cancel"
              : "Change Password"}

          </button>

        </div>

        {showPasswordForm && (
          <div className="grid grid-cols-1 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Current Password
              </label>

              <input
                type="password"
                name="currentPassword"
                value={
                  passwordForm.currentPassword
                }
                onChange={
                  handlePasswordChange
                }
                autoComplete="current-password"
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={
                  passwordForm.newPassword
                }
                onChange={
                  handlePasswordChange
                }
                autoComplete="new-password"
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={
                  passwordForm.confirmPassword
                }
                onChange={
                  handlePasswordChange
                }
                autoComplete="new-password"
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>

              <button
                type="button"
                onClick={
                  handleChangePassword
                }
                disabled={
                  changingPassword
                }
                className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {changingPassword ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <KeyRound
                    size={15}
                  />
                )}

                {changingPassword
                  ? "Changing..."
                  : "Update Password"}

              </button>

            </div>

          </div>
        )}

      </div>

      {/* ==========================
          SAVE SETTINGS
      ========================== */}
      <div className="pt-2">

        <button
          type="button"
          onClick={
            handleSaveSettings
          }
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition hover:scale-105 active:scale-95 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >

          {saving ? (
            <Loader2
              size={16}
              className="animate-spin"
            />
          ) : (
            <Save size={16} />
          )}

          {saving
            ? "Saving..."
            : "Save Settings"}

        </button>

      </div>

    </div>
  );
}

export default Setting;