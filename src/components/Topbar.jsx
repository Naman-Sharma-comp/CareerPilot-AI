import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  LogOut,
  Settings,
  UserCircle,
  LayoutDashboard,
} from "lucide-react";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">

      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

        {/* Left */}

        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-blue-700 hover:text-blue-600 transition"
        >
          <LayoutDashboard size={28} />

          <h1 className="hidden sm:block text-2xl lg:text-3xl font-bold">
            Dashboard
          </h1>

        </Link>

        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-4">

          {/* Notification */}

          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">

            <Bell size={22} />

            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

          </button>

          {/* Settings */}

          <Link
            to="/settings"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Settings size={22} />
          </Link>

          {/* User */}

          <div className="hidden md:flex items-center gap-3">

            <div className="text-right">

              <p className="text-xs text-gray-500">
                Welcome
              </p>

              <p className="font-semibold text-gray-800">
                Guest User
              </p>

            </div>

          </div>

          {/* Avatar */}

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">

            <UserCircle size={26} />

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-md"
          >
            <LogOut size={18} />

            <span className="hidden sm:inline">
              Logout
            </span>

          </button>

        </div>

      </div>

    </header>
  );
}

export default Topbar;