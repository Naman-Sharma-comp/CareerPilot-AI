import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Mic,
  User,
  Settings
} from "lucide-react";
function Sidebar() {
  return (
    <aside className="w-64 bg-blue-700 text-white p-6">

      <Link to="/dashboard">
        <h1 className="text-3xl font-bold mb-10 hover:text-gray-200">
          CareerPilot AI
        </h1>
      </Link>


      <ul className="space-y-6">

        <li>
          <Link
            to="/dashboard"
            className="block hover:text-gray-200 transition"
          >
            Dashboard
          </Link>
        </li>


        <li>
          <Link
            to="/resume"
            className="block hover:text-gray-200 transition"
          >
            Resume Analyzer
          </Link>
        </li>


        <li>
          <Link
            to="/learning"
            className="block hover:text-gray-200 transition"
          >
            Learning Assistant
          </Link>
        </li>


        <li>
          <Link
            to="/interview"
            className="block hover:text-gray-200 transition"
          >
            Interview Prep
          </Link>
        </li>


        <li>
          <Link
            to="/profile"
            className="block hover:text-gray-200 transition"
          >
            Profile
          </Link>
        </li>


        <NavLink
  to="/settings"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-white text-blue-700 font-semibold"
        : "hover:bg-blue-600"
    }`
  }
>
  <Settings size={20} />
  <span>Settings</span>
</NavLink>


      </ul>

    </aside>
  );
}

export default Sidebar;