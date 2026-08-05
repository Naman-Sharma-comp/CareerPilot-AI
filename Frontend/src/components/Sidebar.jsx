import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Mic,
  User,
  Settings,
  LogOut,
  BrainCircuit,
  X,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const navItem =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-300";

  return (
    <aside
      className={`
        fixed lg:sticky top-0 left-0
        z-40
        h-screen
        w-72
        flex flex-col
        bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-900
        text-white
        shadow-2xl
        transform transition-transform duration-300 ease-in-out
        overflow-hidden
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-blue-500 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-white p-2 shadow-md">
            <BrainCircuit
              size={30}
              className="text-blue-700"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              CareerPilot AI
            </h1>

            <p className="text-sm text-blue-200">
              AI Career Mentor
            </p>
          </div>

        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg p-1 hover:bg-blue-600 transition lg:hidden"
        >
          <X size={24} />
        </button>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-2">

        <NavLink
          to="/dashboard"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "bg-white text-blue-700 shadow-lg font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/resume"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "bg-white text-blue-700 shadow-lg font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FileText size={20} />
          Resume Analyzer
        </NavLink>

        <NavLink
          to="/learning"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "bg-white text-blue-700 shadow-lg font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <BookOpen size={20} />
          Learning Assistant
        </NavLink>

        <NavLink
          to="/interview"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "bg-white text-blue-700 shadow-lg font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <Mic size={20} />
          Interview Prep
        </NavLink>

        <NavLink
          to="/profile"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "bg-white text-blue-700 shadow-lg font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <User size={20} />
          Profile
        </NavLink>

        <NavLink
          to="/settings"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "bg-white text-blue-700 shadow-lg font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>

      </nav>

      {/* Logout */}

      <div className="border-t border-blue-500 p-5">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 px-4 py-3 font-semibold transition-all duration-300 hover:bg-red-600 hover:scale-[1.02]"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;