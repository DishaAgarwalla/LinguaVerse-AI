import {
  FaLanguage,
  FaImage,
  FaMicrophone,
  FaHands,
  FaHistory,
  FaUser,
  FaFileAlt,
} from "react-icons/fa";

import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Text Translation",
    description: "Translate between 100+ languages instantly.",
    icon: FaLanguage,
    color: "bg-blue-600",
    link: "/translate",
  },
  {
    title: "OCR Translation",
    description: "Extract and translate text from images.",
    icon: FaImage,
    color: "bg-green-600",
    link: "/ocr",
  },
  {
    title: "Speech Translation",
    description: "Convert voice into translated text.",
    icon: FaMicrophone,
    color: "bg-purple-600",
    link: "/speech",
  },
  {
    title: "Document Translation",
    description: "Translate PDF and DOCX files using AI.",
    icon: FaFileAlt,
    color: "bg-red-600",
    link: "/documents",
  },
  {
    title: "History",
    description: "View all previous translations.",
    icon: FaHistory,
    color: "bg-pink-600",
    link: "/history",
  },
  {
    title: "Sign Language",
    description: "AI-powered sign language recognition.",
    icon: FaHands,
    color: "bg-orange-600",
    link: "/sign-language",
  },
  {
    title: "Profile",
    description: "Manage your account settings.",
    icon: FaUser,
    color: "bg-indigo-600",
    link: "/profile",
  },
];

const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          {...feature}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;