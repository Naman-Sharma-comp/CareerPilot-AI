import DashboardCard from "../components/DashboardCard";
import ProgressChart from "../components/ProgressChart";
import {
  FileText,
  Target,
  BookOpen,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";

function Dashboard() {
  const { user } = useUser();
  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

const firstName = user?.fullName?.split(" ")[0] || "";
const [stats, setStats] = useState({
  resumeScore: 0,
  atsScore: 0,
  learningProgress: 0,
  skillGap: 0,
});

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setStats(response.data.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  fetchDashboard();
}, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Welcome Banner */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 lg:p-10 text-white shadow-xl">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          {greeting}
          {firstName && `, ${firstName}`} 👋
        </h1>

        <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-blue-100 leading-7">
  Welcome back to CareerPilot AI. Continue building your skills,
  improve your resume, and get one step closer to your dream career.
</p>

        <Link
          to="/resume"
          className="inline-flex items-center gap-2 mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Analyze Resume
          <ArrowRight size={18} />
        </Link>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <DashboardCard
          title="Resume Score"
          value={`${stats.resumeScore}%`}
          icon={<FileText size={28} />}
          color="text-blue-600"
        />

        <DashboardCard
          title="ATS Score"
          value={`${stats.atsScore}%`}
          icon={<Target size={28} />}
          color="text-green-600"
        />

        <DashboardCard
          title="Learning Progress"
          value={`${stats.learningProgress}%`}
          icon={<BookOpen size={28} />}
          color="text-purple-600"
        />

        <DashboardCard
          title="Skill Gap"
          value={`${stats.skillGap} Skills`}
          icon={<Brain size={28} />}
          color="text-orange-500"
        />

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-3xl shadow-lg mt-10 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

          <Link
            to="/resume"
            className="bg-blue-50 hover:bg-blue-100 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <FileText
              className="mx-auto text-blue-600 mb-3"
              size={34}
            />

            <p className="font-semibold">
              Resume
            </p>

          </Link>

          <Link
            to="/learning"
            className="bg-green-50 hover:bg-green-100 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <BookOpen
              className="mx-auto text-green-600 mb-3"
              size={34}
            />

            <p className="font-semibold">
              Learning
            </p>

          </Link>

          <Link
            to="/interview"
            className="bg-purple-50 hover:bg-purple-100 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <Target
              className="mx-auto text-purple-600 mb-3"
              size={34}
            />

            <p className="font-semibold">
              Interview
            </p>

          </Link>

          <Link
            to="/profile"
            className="bg-orange-50 hover:bg-orange-100 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <Brain
              className="mx-auto text-orange-500 mb-3"
              size={34}
            />

            <p className="font-semibold">
              Profile
            </p>

          </Link>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-3xl shadow-lg mt-10 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Recent Activity
        </h2>

        <div className="space-y-5">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b pb-4">

            <div className="flex items-center gap-3">

              <FileText
                size={20}
                className="text-blue-600"
              />

              <span>
                Resume analyzed successfully
              </span>

            </div>

            <span className="text-gray-500 text-sm">
              Today
            </span>

          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b pb-4">

            <div className="flex items-center gap-3">

              <BookOpen
                size={20}
                className="text-green-600"
              />

              <span>
                Learning roadmap generated
              </span>

            </div>

            <span className="text-gray-500 text-sm">
              Yesterday
            </span>

          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

            <div className="flex items-center gap-3">

              <Target
                size={20}
                className="text-purple-600"
              />

              <span>
                ATS Score improved by 8%
              </span>

            </div>

            <span className="text-gray-500 text-sm">
              2 days ago
            </span>

          </div>

        </div>

      </div>

      {/* Progress Chart */}

      <div className="mt-10">
        <ProgressChart />
      </div>

    </div>
  );
}

export default Dashboard;