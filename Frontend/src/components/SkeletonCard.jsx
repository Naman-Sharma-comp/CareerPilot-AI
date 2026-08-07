function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2 mb-5"></div>
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
    </div>
  );
}

export default SkeletonCard;