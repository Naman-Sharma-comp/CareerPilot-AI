import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-4 transition-colors duration-300">
      <div className="text-center max-w-md space-y-6 fade">
        <div className="w-20 h-20 rounded-3xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <AlertTriangle size={40} />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={16} /> Back to Safety
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;