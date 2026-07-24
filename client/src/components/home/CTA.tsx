import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 animate-gradient"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold border border-white/30 mb-8 animate-slideDown">
          <FiCheckCircle className="w-4 h-4" />
          Join 10,000+ Users
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Ready to Break
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
            Language Barriers?
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl text-blue-100 leading-relaxed">
          Experience AI-powered translation for text, speech, documents,
          OCR, subtitles, and Sign Language—all in one intelligent platform.
        </p>

        {/* Features list */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-blue-100">
          <span className="flex items-center gap-1.5">
            <FiCheckCircle className="w-4 h-4 text-white" />
            100+ Languages
          </span>
          <span className="flex items-center gap-1.5">
            <FiCheckCircle className="w-4 h-4 text-white" />
            AI-Powered
          </span>
          <span className="flex items-center gap-1.5">
            <FiCheckCircle className="w-4 h-4 text-white" />
            Real-time
          </span>
          <span className="flex items-center gap-1.5">
            <FiCheckCircle className="w-4 h-4 text-white" />
            Free Plan
          </span>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/30"
          >
            Get Started Free
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/50 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;