function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase animate-pulse">
          Loading CareerPilot AI...
        </p>
      </div>
    </div>
  );
}

export default Loading;