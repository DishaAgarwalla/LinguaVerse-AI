import type { LucideIcon } from "lucide-react";

interface StepCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  step: number;
  index: number;
}

const StepCard = ({
  title,
  description,
  icon: Icon,
  step,
  index,
}: StepCardProps) => {
  const colors = [
    { bg: "from-blue-500 to-indigo-600", text: "text-blue-600", light: "from-blue-50 to-indigo-50" },
    { bg: "from-purple-500 to-pink-600", text: "text-purple-600", light: "from-purple-50 to-pink-50" },
    { bg: "from-green-500 to-emerald-600", text: "text-green-600", light: "from-green-50 to-emerald-50" },
    { bg: "from-orange-500 to-red-600", text: "text-orange-600", light: "from-orange-50 to-red-50" },
  ];

  const color = colors[index % colors.length];

  return (
    <div className="group relative animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative rounded-2xl bg-white p-6 sm:p-8 text-center shadow-lg shadow-gray-100/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200/50 border border-gray-100/50 hover:border-blue-100">
        {/* Step Number - Large Background */}
        <div className="absolute -top-3 -right-3 text-6xl font-bold text-gray-100/30 select-none group-hover:text-gray-200/40 transition-colors duration-300">
          {String(step).padStart(2, '0')}
        </div>

        {/* Step Number Badge */}
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r ${color.bg} px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/25`}>
          Step {step}
        </div>

        <div className="mt-6 flex justify-center">
          <div className={`rounded-2xl bg-gradient-to-br ${color.light} p-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`h-8 w-8 ${color.text}`} />
          </div>
        </div>

        <h3 className="mt-6 text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>

        <p className="mt-4 text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Progress indicator */}
        <div className="mt-6 h-1 w-12 mx-auto rounded-full bg-gray-200 group-hover:bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 group-hover:w-16"></div>
      </div>
    </div>
  );
};

export default StepCard;