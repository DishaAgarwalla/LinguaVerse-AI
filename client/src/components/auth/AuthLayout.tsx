import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import homeImage from "../../assets/home.png";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-700 text-white p-12">
        <h1 className="text-5xl font-bold mb-6">LinguaVerse AI</h1>

        <p className="text-center text-lg max-w-md mb-10">
          Break language barriers with AI-powered Translation, OCR,
          Speech Recognition and Sign Language Translation.
        </p>

        <img
          src={homeImage}
          alt="LinguaVerse"
          className="rounded-2xl shadow-2xl w-[500px]"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md">

          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>

          <h2 className="mt-8 text-4xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-3 text-slate-600">
            {subtitle}
          </p>

          <div className="mt-8">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;