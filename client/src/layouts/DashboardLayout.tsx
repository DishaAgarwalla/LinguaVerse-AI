import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Sidebar />
      <div className="flex flex-1 flex-col ml-0 transition-all duration-300">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 animate-slideUp">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;