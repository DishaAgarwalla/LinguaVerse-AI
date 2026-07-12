import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="flex h-16 items-center justify-between border-b bg-white px-8">

      <Link
        to="/"
        className="text-2xl font-bold text-blue-600"
      >
        🌍 LinguaVerse AI
      </Link>

      <div className="flex items-center gap-6">

        <a href="#home">Home</a>

        <a href="#features">Features</a>

        <a href="#how-it-works">How It Works</a>

        <a href="#faq">FAQ</a>

        <Link
          to="/login"
          className="font-semibold text-blue-600"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Register
        </Link>

      </div>

    </nav>
  );
};

export default PublicNavbar;