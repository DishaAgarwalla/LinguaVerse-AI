import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiGlobe, FiCpu, FiZap } from "react-icons/fi";
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
    <div className="min-h-screen grid overflow-hidden lg:grid-cols-2">

      {/* Left Side */}

      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 text-white lg:flex">

        {/* Background */}

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute left-10 top-10 h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute bottom-10 right-10 h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl delay-1000"></div>

          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"></div>

          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 animate-float rounded-full bg-white/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}

        </div>

        <div className="relative z-10 text-center">

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <FiGlobe className="h-4 w-4" />
            AI-Powered Translation
          </div>

          <h1 className="mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-5xl font-bold text-transparent">
            LinguaVerse AI
          </h1>

          <p className="mx-auto max-w-md text-lg leading-relaxed text-blue-100">
            Break language barriers with AI-powered Translation, OCR,
            Speech Recognition and Sign Language Translation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <FiCpu className="h-3 w-3" />
              100+ Languages
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <FiZap className="h-3 w-3" />
              Real-time
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              🎯 99.9% Accuracy
            </span>

          </div>

        </div>

        <div className="relative z-10 mt-10">

          <div className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-black/20">

            <img
              src={homeImage}
              alt="LinguaVerse AI"
              className="w-[450px] transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-blue-50/30 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 lg:px-8">

        <div className="w-full max-w-md">

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="mt-8">

            <h2 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-slate-300 sm:text-4xl">
              {title}
            </h2>

            <p className="mt-2 text-gray-500 dark:text-slate-400">
              {subtitle}
            </p>

          </div>

          <div className="mt-8">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;