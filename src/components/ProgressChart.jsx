import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: "Resume", score: 82 },
  { name: "ATS", score: 78 },
  { name: "Learning", score: 65 },
  { name: "Interview", score: 55 },
];

function ProgressChart() {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-all duration-300">

      {/* Heading */}

      <div className="mb-6">

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Career Progress
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Track your overall AI career journey.
        </p>

      </div>

      {/* Chart */}

      <div className="w-full h-[280px] sm:h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ fill: "#EFF6FF" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              }}
            />

            <Bar
              dataKey="score"
              fill="#2563EB"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ProgressChart;