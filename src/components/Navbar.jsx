function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-5 bg-white shadow-md sticky top-0 z-50">

      <h2 className="text-3xl font-bold text-blue-600 cursor-pointer">
        CareerPilot AI
      </h2>

      <ul className="flex items-center gap-8 text-gray-700 font-medium">
        <li className="cursor-pointer hover:text-blue-600 transition">Home</li>
        <li className="cursor-pointer hover:text-blue-600 transition">Features</li>
        <li className="cursor-pointer hover:text-blue-600 transition">About</li>
        <li className="cursor-pointer hover:text-blue-600 transition">Contact</li>
      </ul>

      <div className="flex gap-3">
        <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
          Login
        </button>

        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>

    </nav>
  );
}

export default Navbar;