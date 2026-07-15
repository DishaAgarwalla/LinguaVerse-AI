import { Outlet } from "react-router-dom";

import DashboardNavbar from "../components/layout/DashboardNavbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex flex-1 flex-col overflow-hidden">

        <DashboardNavbar />

        <main className="flex-1 overflow-hidden">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;