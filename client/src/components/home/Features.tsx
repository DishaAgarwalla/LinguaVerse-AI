import { features } from "../../constants/features";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section id="features" className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-50/50 to-indigo-50/30 rounded-bl-full"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200/50">
            ✨ Features
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Everything You Need for
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block sm:inline">
              {" "}Global Communication
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            LinguaVerse AI combines translation, speech, OCR, sign language, 
            and AI assistance into one intelligent platform.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;