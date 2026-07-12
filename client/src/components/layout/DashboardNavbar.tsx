import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow">

      <h1 className="text-2xl font-bold text-blue-600">
        LinguaVerse AI
      </h1>

      <button
        onClick={logout}
        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>

    </header>
  );
};

export default DashboardNavbar;