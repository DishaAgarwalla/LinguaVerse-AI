import { Outlet } from "react-router-dom";

import DashboardNavbar from "../components/layout/DashboardNavbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;