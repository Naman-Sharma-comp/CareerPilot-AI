function DashboardCard({ title, value, icon, color = "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60" }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
      {/* Label & Metric */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h2>
      </div>

      {/* Icon Capsule */}
      <div className={`p-3.5 rounded-2xl shrink-0 ${color} shadow-inner`}>
        <div className="text-2xl sm:text-3xl">{icon}</div>
      </div>
    </div>
  );
}

export default DashboardCard;