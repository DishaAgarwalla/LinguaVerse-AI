import WebcamPreview from "./WebcamPreview";
import TranslationPanel from "./TranslationPanel";

const SignLanguage = () => {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-50/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/30 to-transparent"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200/50">
            🤟 Accessibility
          </span>
          
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold">
            AI <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Sign Language</span> Translator
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Experience real-time sign language translation powered by cutting-edge AI technology.
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