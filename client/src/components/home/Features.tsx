import { features } from "../../constants/features";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
   <section
  id="features"
  className="bg-white py-24"
>
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Features
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Everything You Need for
            <span className="text-blue-600">
              {" "}
              Global Communication
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            LinguaVerse AI combines translation, speech,
            OCR, sign language, and AI assistance into one
            intelligent platform.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;