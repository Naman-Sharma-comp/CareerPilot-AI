import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b px-4 py-4 flex items-center">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-blue-700 hover:text-blue-800 transition"
          >
            <Menu size={30} />
          </button>

          <h2 className="ml-4 text-xl font-bold text-gray-800">
            CareerPilot AI
          </h2>

        </div>

        {/* Topbar */}
        <div className="sticky top-0 z-20">
          <Topbar />
        </div>

        {/* Main Page */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">

          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;