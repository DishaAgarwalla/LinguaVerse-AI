import { Link } from "react-router-dom";
import type { IconType } from "react-icons";

interface Props {
  title: string;
  description: string;
  icon: IconType;
  color: string;
  link: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  color,
  link,
}: Props) => {
  return (
    <Link
      to={link}
      className="block rounded-2xl bg-white p-6 shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
      >
        <Icon className="text-2xl text-white" />
      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-gray-500">
        {description}
      </p>
    </Link>
  );
};

export default FeatureCard;