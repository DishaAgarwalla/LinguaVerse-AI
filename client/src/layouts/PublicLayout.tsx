import { Outlet } from "react-router-dom";

import PublicNavbar from "../components/layout/PublicNavbar";
import Footer from "../components/layout/Footer";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PublicLayout;