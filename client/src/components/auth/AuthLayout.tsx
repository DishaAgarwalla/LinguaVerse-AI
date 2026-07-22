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
    <div className="min-h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-12 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
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
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold border border-white/30 mb-8">
            <FiGlobe className="w-4 h-4" />
            AI-Powered Translation
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            LinguaVerse AI
          </h1>

          <p className="text-lg text-blue-100 max-w-md mx-auto leading-relaxed">
            Break language barriers with AI-powered Translation, OCR,
            Speech Recognition and Sign Language Translation.
          </p>

          {/* Feature badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs font-medium border border-white/20">
              <FiCpu className="w-3 h-3" />
              100+ Languages
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs font-medium border border-white/20">
              <FiZap className="w-3 h-3" />
              Real-time
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs font-medium border border-white/20">
              🎯 99.9% Accuracy
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-10">
          <div className="relative rounded-2xl shadow-2xl shadow-black/20 overflow-hidden group">
            <img
              src={homeImage}
              alt="LinguaVerse AI"
              className="w-[450px] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 px-4 sm:px-6 lg:px-8 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mt-8">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="mt-2 text-gray-500">
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