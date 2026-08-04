import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

      {/* Left Side */}
      <Link
        to="/dashboard"
        className="text-3xl font-bold text-blue-700 hover:text-blue-600 transition"
      >
        Dashboard
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={22} />
        </button>

        {/* User Name */}
        <span className="font-medium text-gray-700">
          Guest User
        </span>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
          G
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}

export default Topbar;