import { useState } from "react";
import { Mic, Code2, Users, Play, Sparkles } from "lucide-react";

function Interview() {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");

  return (
    <div className="space-y-8 fade">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Interview Preparation
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
          Practice interactive AI mock interview rounds for your targeted tech stack.
        </p>
      </div>

      {/* Setup Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles size={18} className="text-blue-500" /> Mock Setup Configuration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Target Role */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Target Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose Target Role...</option>
              <option>Frontend Engineer</option>
              <option>Backend Developer</option>
              <option>Full Stack Software Engineer</option>
              <option>AI/ML Engineer</option>
              <option>Data Scientist</option>
            </select>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose Level...</option>
              <option>Entry-Level (Junior)</option>
              <option>Mid-Level</option>
              <option>Senior Engineer</option>
            </select>
          </div>
        </div>

        <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition hover:scale-105 active:scale-95">
          <Play size={16} /> Start Mock Session
        </button>
      </div>

      {/* Round Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 hover:border-blue-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Mic size={24} />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Technical Round
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 hover:border-indigo-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Code2 size={24} />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Coding Assessment
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 hover:border-purple-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
            <Users size={24} />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Behavioral / HR
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Interview;