import { ArrowRightLeft, Mic, Upload, Image, Volume2, Sparkles } from "lucide-react";
import TranslationCard from "./TranslationCard";
import LanguageSelector from "./LanguageSelector";

const TranslationDemo = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200/50">
            ⚡ Live Demo
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Experience <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI Translation</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            See how LinguaVerse AI translates text instantly across languages.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div>
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <LanguageSelector value="Auto Detect" />
              <LanguageSelector value="French" />
            </div>

            <TranslationCard
              title="Input Text"
              placeholder="Type your text here..."
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105">
                <Sparkles className="w-4 h-4" />
                Translate
              </button>

              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-600 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:scale-105">
                <Mic className="w-4 h-4" />
              </button>

              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-600 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:scale-105">
                <Upload className="w-4 h-4" />
              </button>

              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-600 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:scale-105">
                <Image className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div>
            <TranslationCard
              title="Output Translation"
              placeholder="Translation will appear here..."
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-white font-semibold shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105">
                <Volume2 className="w-4 h-4" />
                Listen
              </button>

              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-gray-600 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:scale-105">
                <ArrowRightLeft className="w-4 h-4" />
                Swap
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslationDemo;