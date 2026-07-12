import { Link } from "react-router-dom";
import heroImage from "../../assets/home.png";

const Hero = () => {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center justify-between px-6 py-20">

        {/* Left Side */}

        <div className="max-w-2xl">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            🌍 AI-Powered Universal Translation Platform
          </span>

          <h1 className="mt-6 text-6xl font-extrabold leading-tight text-gray-900">
            Break
            <span className="text-blue-600"> Language Barriers </span>
            with Artificial Intelligence
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Translate text, speech, documents, images and sign language
            instantly using one intelligent platform powered by AI.
          </p>

          <div className="mt-10 flex gap-4">

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>

            <button className="rounded-xl border border-gray-300 px-8 py-4 font-semibold transition hover:bg-gray-100">
              Watch Demo
            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="hidden lg:block">

          <img
            src={heroImage}
            alt="LinguaVerse AI"
            className="w-[650px]"
          />

        </div>

      </div>
    </section>
  );
};

export default Hero;