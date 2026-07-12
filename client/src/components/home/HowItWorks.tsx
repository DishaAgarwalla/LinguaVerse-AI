import { steps } from "../../constants/steps";
import StepCard from "./StepCard";

const HowItWorks = () => {
  return (
    <section
  id="how-it-works"
  className="bg-slate-50 py-24"
>
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Process
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            How LinguaVerse AI Works
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Translate anything in four simple steps using AI-powered language technology.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StepCard
              key={step.id}
              step={step.id}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;