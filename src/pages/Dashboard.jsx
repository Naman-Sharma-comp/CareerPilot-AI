import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Ready to continue your career journey?
      </p>

      <div className="grid grid-cols-4 gap-6 mt-10">

        <DashboardCard
          title="Resume Score"
          value="82%"
          icon="📄"
          color="text-blue-600"
        />

        <DashboardCard
          title="ATS Score"
          value="78%"
          icon="🎯"
          color="text-green-600"
        />

        <DashboardCard
          title="Learning Progress"
          value="65%"
          icon="📚"
          color="text-purple-600"
        />

        <DashboardCard
          title="Skill Gap"
          value="12"
          icon="🧠"
          color="text-orange-500"
        />

      </div>

    </div>
  );
}

export default Dashboard;