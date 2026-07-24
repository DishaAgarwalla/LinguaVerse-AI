import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  index,
}: FeatureCardProps) => {
  const gradients = [
    "from-blue-500 to-indigo-500",
    "from-purple-500 to-pink-500",
    "from-green-400 to-blue-500",
    "from-orange-400 to-red-400",
    "from-pink-500 to-purple-500",
    "from-teal-400 to-cyan-500",
  ];

  const bgGradients = [
    "from-blue-50 to-indigo-50",
    "from-purple-50 to-pink-50",
    "from-green-50 to-blue-50",
    "from-orange-50 to-red-50",
    "from-pink-50 to-purple-50",
    "from-teal-50 to-cyan-50",
  ];

  const gradient = gradients[index % gradients.length];
  const bgGradient = bgGradients[index % bgGradients.length];

  return (
    <div className="group relative rounded-2xl bg-white p-6 sm:p-8 shadow-lg shadow-gray-100/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200/50 border border-gray-100/50 hover:border-blue-100">
      {/* Gradient overlay */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative">
        <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${gradient} p-3.5 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-7 w-7 text-white" />
        </div>

        <h3 className="mb-3 text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Learn more link */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-semibold text-blue-600 inline-flex items-center gap-1">
            Learn More
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;