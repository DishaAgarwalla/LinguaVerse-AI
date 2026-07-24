import { steps } from "../../constants/steps";
import StepCard from "./StepCard";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 md:py-32 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200/50">
            📋 Process
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold">
            How <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LinguaVerse AI</span> Works
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Translate anything in four simple steps using AI-powered language technology.
          </p>
        </div>

        {/* Connection line (desktop) */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 -translate-y-1/2"></div>
        </div>

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step.id}
              title={step.title}
              description={step.description}
              icon={step.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;