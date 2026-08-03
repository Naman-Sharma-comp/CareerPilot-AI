import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-5 bg-white shadow-md">

      {/* Logo */}
      <Link to="/">
        <h1 className="text-3xl font-bold text-blue-700">
          CareerPilot AI
        </h1>
      </Link>


      {/* Navigation Buttons */}
      <div className="flex gap-4">

        <Link to="/login">
          <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-gray-100 transition">
            Login
          </button>
        </Link>


        <Link to="/register">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;