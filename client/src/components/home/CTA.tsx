import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700 py-24">

      <div className="mx-auto max-w-5xl px-6 text-center text-white">

        <h2 className="text-5xl font-bold">
          Ready to Break Language Barriers?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl text-blue-100">
          Experience AI-powered translation for text, speech, documents,
          OCR, subtitles, and Sign Language—all in one platform.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-6">

          <Link
            to="/register"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:scale-105"
          >
            Get Started Free
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-blue-700"
          >
            Sign In
          </Link>

        </div>

      </div>

    </section>
  );
};

export default CTA;