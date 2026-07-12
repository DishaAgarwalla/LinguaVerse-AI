import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-5 inline-flex rounded-xl bg-blue-100 p-3">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>

      <h3 className="mb-3 text-xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="text-slate-600 leading-7">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;