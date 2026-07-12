import { ArrowRightLeft, Mic, Upload, Image, Volume2 } from "lucide-react";
import TranslationCard from "./TranslationCard";
import LanguageSelector from "./LanguageSelector";

const TranslationDemo = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-16">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Live Demo
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Experience AI Translation
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            See how LinguaVerse AI translates text instantly across languages.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          <div>

            <div className="mb-4 flex justify-between">
              <LanguageSelector value="Auto Detect" />
              <LanguageSelector value="French" />
            </div>

            <TranslationCard
              title="Input"
              placeholder="Type your text here..."
            />

            <div className="mt-5 flex flex-wrap gap-3">

              <button className="rounded-xl bg-blue-600 px-5 py-3 text-white">
                Translate
              </button>

              <button className="rounded-xl border px-4 py-3">
                <Mic size={18}/>
              </button>

              <button className="rounded-xl border px-4 py-3">
                <Upload size={18}/>
              </button>

              <button className="rounded-xl border px-4 py-3">
                <Image size={18}/>
              </button>

            </div>

          </div>

          <div>

            <TranslationCard
              title="Output"
              placeholder="Translation will appear here..."
            />

            <div className="mt-5 flex gap-3">

              <button className="rounded-xl bg-green-600 px-5 py-3 text-white flex items-center gap-2">
                <Volume2 size={18}/>
                Listen
              </button>

              <button className="rounded-xl border px-5 py-3 flex items-center gap-2">
                <ArrowRightLeft size={18}/>
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