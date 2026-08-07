import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent whitespace-nowrap"
          >
            CareerPilot AI
          </Link>

          {/* Desktop Links & Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-xl shadow-md shadow-blue-500/20 transition duration-200 active:scale-95"
            >
              Register
            </Link>

            <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

            {/* Always visible theme toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Actions */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />

            <button
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-72 border-b border-slate-200 dark:border-slate-800" : "max-h-0"
        }`}
      >
        <div className="bg-white dark:bg-slate-900 px-6 py-5 space-y-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700 dark:text-slate-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700 dark:text-slate-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 rounded-xl font-medium transition shadow-md shadow-blue-500/20"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;