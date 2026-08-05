import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 whitespace-nowrap"
          >
            CareerPilot AI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition duration-300"
            >
              Register
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-72" : "max-h-0"
        }`}
      >
        <div className="border-t bg-white shadow-lg">

          <div className="flex flex-col px-6 py-5 space-y-4">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-medium transition"
            >
              Register
            </Link>

          </div>

        </div>
      </div>

    </nav>
  );
}

export default Navbar;