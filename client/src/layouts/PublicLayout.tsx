import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/layout/PublicNavbar";
import Footer from "../components/layout/Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <PublicNavbar />
      <main className="animate-fadeIn">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;