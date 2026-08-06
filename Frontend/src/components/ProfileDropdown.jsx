import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, ChevronDown, Sparkles } from "lucide-react";

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
          GU
        </div>
        <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
      </button>

      {/* Popover Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 fade">
          {/* Header Info */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Guest User
              </p>
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles size={10} /> PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              guest.user@careerpilot.ai
            </p>
          </div>

          <div className="space-y-1">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <User size={16} /> My Profile
            </Link>

            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Settings size={16} /> Account Settings
            </Link>
          </div>

          <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;