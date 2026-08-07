import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle Theme"
      className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 shadow-inner transition-all duration-300 hover:scale-105 active:scale-95 group overflow-hidden"
    >
      <div className="relative z-10 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400 transition-transform duration-500 rotate-0 hover:rotate-90" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 transition-transform duration-500 -rotate-12 group-hover:rotate-0" />
        )}
      </div>
      <span className="sr-only">Toggle dark mode</span>
    </button>
  );
}

export default ThemeToggle;