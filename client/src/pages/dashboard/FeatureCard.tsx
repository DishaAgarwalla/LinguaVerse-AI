import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";

interface Props {
  title: string;
  description: string;
  icon: IconType;
  color: string;
  link: string;
  emoji?: string;
  index?: number;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  color,
  link,
  emoji,
  index = 0,
}: Props) => {
  return (
    <Link
      to={link}
      className="group relative block rounded-2xl bg-white p-6 shadow-lg shadow-gray-100/50 border border-gray-100/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-blue-100 overflow-hidden"
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Top decoration */}
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -translate-y-10 translate-x-10`}></div>

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className={`inline-flex rounded-2xl bg-gradient-to-br ${color} p-3.5 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="text-2xl text-white" />
          </div>
          {emoji && (
            <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {emoji}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
          {description}
        </p>

        <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-2">
          Explore
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;