import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LayoutDashboard } from "lucide-react";
import { googleLogout } from "@react-oauth/google";
import ThemeToggle from "../components/ThemeToggle";
import NotificationDropdown from "../components/NotificationDropdown";
import ProfileDropdown from "../components/ProfileDropdown";

function Topbar() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = () => {
    googleLogout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Left Dashboard Link */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition group"
        >
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 group-hover:scale-110 transition-transform">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="hidden sm:block text-xl lg:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Dashboard
          </h1>
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* Settings Link */}
          <Link
            to="/settings"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 transition"
            aria-label="Settings"
          >
            <Settings size={20} />
          </Link>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

          {/* User Email & Name Display */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 truncate max-w-[150px]">
                {user?.email || "guest@careerpilot.ai"}
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                {user?.fullName || user?.name || "Guest User"}
              </p>
            </div>
          </div>

          {/* Profile Dropdown Component */}
          <ProfileDropdown onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;