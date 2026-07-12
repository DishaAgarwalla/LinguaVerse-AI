import type { LucideIcon } from "lucide-react";

interface StepCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  step: number;
}

const StepCard = ({
  title,
  description,
  icon: Icon,
  step,
}: StepCardProps) => {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-2 text-white font-bold">
        {step}
      </div>

      <div className="mt-6 flex justify-center">
        <div className="rounded-full bg-blue-100 p-4">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-4 text-slate-600">
        {description}
      </p>

    </div>
  );
};

export default StepCard;