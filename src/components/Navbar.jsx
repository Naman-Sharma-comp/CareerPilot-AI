import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-14 py-5 bg-white shadow-md">

      <Link to="/" className="text-3xl font-bold text-blue-600">
        CareerPilot AI
      </Link>

      <ul className="flex gap-10 font-medium text-gray-700">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/resume">Resume</Link></li>
        <li><Link to="/learning">Learning</Link></li>
        <li><Link to="/interview">Interview</Link></li>
      </ul>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Get Started
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;