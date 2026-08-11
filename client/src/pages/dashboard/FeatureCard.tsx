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
}: Props) => {
  return (
    <Link
      to={link}
      className="
        group
        relative
        block
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        p-6
        shadow-lg
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        hover:border-blue-300
        dark:hover:border-blue-500
      "
    >
      {/* Hover Background */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-gradient-to-br
          from-blue-50
          via-indigo-50
          to-transparent
          dark:from-slate-800
          dark:via-slate-900
          dark:to-slate-900
        "
      />

      {/* Decorative Blob */}

      <div
        className={`
          absolute
          -top-12
          -right-12
          h-32
          w-32
          rounded-full
          bg-gradient-to-br
          ${color}
          opacity-10
          blur-2xl
          transition-all
          duration-500
          group-hover:scale-125
        `}
      />

      {/* Content */}

      <div className="relative z-10">

        {/* Top */}

        <div className="flex items-center justify-between">

          <div
            className={`
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              ${color}
              text-white
              shadow-lg
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:rotate-6
            `}
          >
            <Icon className="text-2xl" />
          </div>

          {emoji && (
            <span
              className="
                text-3xl
                opacity-0
                transition-all
                duration-300
                group-hover:opacity-100
                group-hover:scale-110
              "
            >
              {emoji}
            </span>
          )}

        </div>

        {/* Title */}

        <h3
          className="
            mt-6
            text-xl
            font-bold
            text-gray-900
            dark:text-white
            transition-colors
            duration-300
            group-hover:text-blue-600
            dark:group-hover:text-blue-400
          "
        >
          {title}
        </h3>

        {/* Description */}

        <p
          className="
            mt-3
            text-sm
            leading-7
            text-gray-600
            dark:text-slate-400
          "
        >
          {description}
        </p>

        {/* Bottom */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-blue-600
              dark:text-blue-400
              transition-all
              duration-300
              group-hover:gap-3
            "
          >
            Explore

            <FiArrowRight
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </span>

          <span
            className="
              rounded-full
              bg-gray-100
              dark:bg-slate-800
              px-3
              py-1
              text-xs
              font-medium
              text-gray-500
              dark:text-slate-400
            "
          >
            AI
          </span>

        </div>

      </div>
    </Link>
  );
};

export default FeatureCard;