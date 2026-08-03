import { Link } from "react-router-dom";

function Topbar() {
  return (
    <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

      <Link
        to="/dashboard"
        className="text-2xl font-bold hover:text-blue-600 transition"
      >
        Dashboard
      </Link>

      <div className="flex items-center gap-4">

        <span className="font-medium">
          Krushna
        </span>

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          K
        </div>

      </div>

    </header>
  );
}

export default Topbar;