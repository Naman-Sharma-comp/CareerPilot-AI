import { Link } from "react-router-dom";
import { Settings, LayoutDashboard } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import NotificationDropdown from "../components/NotificationDropdown";
import ProfileDropdown from "../components/ProfileDropdown";

function Topbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Left */}
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

          {/* Interactive Notification Dropdown */}
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

          {/* User Profile Info */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                Welcome back
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Guest User
              </p>
            </div>
          </div>

          {/* Interactive Profile Dropdown (Avatar + Popup Menu) */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}

export default Topbar;