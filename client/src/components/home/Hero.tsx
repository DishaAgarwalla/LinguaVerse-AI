import { Link } from "react-router-dom";
import { FiPlay, FiArrowRight, FiGlobe, FiCpu, FiZap } from "react-icons/fi";
import heroImage from "../../assets/home.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Left Side */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-200/50 px-4 py-2 text-sm font-semibold text-blue-600 backdrop-blur-sm animate-slideDown">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            🌍 AI-Powered Universal Translation Platform
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
            <span className="text-gray-900">Break</span>
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Language Barriers
            </span>
            <br />
            <span className="text-gray-900">with AI Intelligence</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-gray-600 max-w-xl">
            Translate text, speech, documents, images, and sign language
            instantly using one intelligent platform powered by cutting-edge AI.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-6 sm:gap-8">
            <div className="flex items-center gap-2">
              <FiGlobe className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">100+ Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCpu className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <FiZap className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Real-time</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
            >
              Get Started Free
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white/80 backdrop-blur-sm px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 hover:shadow-lg hover:scale-105">
              <FiPlay className="w-4 h-4" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl"></div>
          <div className="relative animate-float">
            <img
              src={heroImage}
              alt="LinguaVerse AI"
              className="w-[550px] xl:w-[650px] drop-shadow-2xl"
            />
          </div>
          {/* Floating badges */}
          <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-gray-200/50 animate-bounce-slow">
            <span className="text-sm font-bold text-green-600">● 99.9% Accuracy</span>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-gray-200/50 animate-bounce-slow delay-1000">
            <span className="text-sm font-bold text-blue-600">⚡ Real-time</span>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40L60 50C120 60 240 80 360 80C480 80 600 60 720 50C840 40 960 40 1080 50C1200 60 1320 80 1380 90L1440 100V120H1380C1320 120 1200 120 1080 120H360C240 120 120 120 60 120H0V40Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;