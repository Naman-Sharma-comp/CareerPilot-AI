function DashboardCard({ title, value, icon, color }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-5
        sm:p-6
        border
        border-gray-100
        h-full
      "
    >
      <div className="flex items-center justify-between">

        {/* Text */}

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            {value}
          </h2>

        </div>

        {/* Icon */}

        <div
          className={`
            ${color}
            bg-gray-50
            rounded-2xl
            p-3
            flex
            items-center
            justify-center
            shadow-sm
          `}
        >
          <div className="text-3xl sm:text-4xl">
            {icon}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardCard;