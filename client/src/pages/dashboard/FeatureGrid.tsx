import {
  FaLanguage,
  FaImage,
  FaMicrophone,
  FaHands,
  FaHistory,
  FaUser,
  FaFileAlt,
  FaBrain,
} from "react-icons/fa";

import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Text Translation",
    description:
      "Translate between 100+ languages instantly with AI precision.",
    icon: FaLanguage,
    color: "from-blue-500 to-indigo-600",
    link: "/translate",
    emoji: "🌐",
  },
  {
    title: "OCR Translation",
    description:
      "Extract and translate text from images in seconds.",
    icon: FaImage,
    color: "from-green-500 to-emerald-600",
    link: "/ocr",
    emoji: "📸",
  },
  {
    title: "Speech Translation",
    description:
      "Convert voice into translated text in real-time.",
    icon: FaMicrophone,
    color: "from-purple-500 to-pink-600",
    link: "/speech",
    emoji: "🎤",
  },
  {
    title: "Document Translation",
    description:
      "Translate PDF and DOCX files while preserving formatting.",
    icon: FaFileAlt,
    color: "from-red-500 to-rose-600",
    link: "/documents",
    emoji: "📄",
  },
  {
    title: "AI Explain",
    description:
      "Understand words and sentences with AI-powered explanations.",
    icon: FaBrain,
    color: "from-cyan-500 to-blue-600",
    link: "/explain",
    emoji: "🧠",
  },
  {
    title: "History",
    description:
      "View and manage all your previous translations.",
    icon: FaHistory,
    color: "from-pink-500 to-rose-600",
    link: "/history",
    emoji: "📋",
  },
  {
    title: "Sign Language",
    description:
      "AI-powered real-time sign language recognition and translation.",
    icon: FaHands,
    color: "from-orange-500 to-red-600",
    link: "/sign-language",
    emoji: "🤟",
  },
  {
    title: "Profile",
    description:
      "Manage your account settings and preferences.",
    icon: FaUser,
    color: "from-indigo-500 to-purple-600",
    link: "/profile",
    emoji: "👤",
  },
];

const FeatureGrid = () => {
  return (
    <section className="space-y-6">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Available Tools
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            Explore LinguaVerse AI features and boost your productivity.
          </p>

        </div>

        <div
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-blue-200
            dark:border-slate-700
            bg-blue-50
            dark:bg-slate-800
            px-4
            py-2
            text-sm
            font-semibold
            text-blue-700
            dark:text-blue-400
          "
        >
          {features.length} Tools Available
        </div>

      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            index={index}
          />
        ))}
      </div>

    </section>
  );
};

export default FeatureGrid;