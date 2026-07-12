import WebcamPreview from "./WebcamPreview";
import TranslationPanel from "./TranslationPanel";

const SignLanguage = () => {
  return (
    <section className="bg-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            🤟 AI Sign Language Translator
          </h2>

          <p className="mt-4 text-slate-600">
            Experience real-time sign language translation powered by AI.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <WebcamPreview />
          <TranslationPanel />
        </div>

      </div>
    </section>
  );
};

export default SignLanguage;