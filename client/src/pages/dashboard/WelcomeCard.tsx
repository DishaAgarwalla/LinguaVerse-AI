import { FiArrowRight } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";

interface WelcomeCardProps {
  name?: string;
}

const WelcomeCard = ({
  name,
}: WelcomeCardProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  const displayName =
    name ||
    localStorage.getItem("name") ||
    "User";

  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      bg-gradient-to-br
      from-blue-600
      via-indigo-600
      to-purple-700
      p-8
      md:p-10
      shadow-2xl
      shadow-blue-500/20
    "
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-pulse"></div>

        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-pulse delay-1000"></div>

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"></div>

        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-white/40 animate-float"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}

      </div>

      {/* Content */}

      <div className="relative z-10">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

          {/* Left */}

          <div className="max-w-3xl">

            <div
              className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-white/15
              px-4
              py-2
              text-sm
              font-medium
              text-white
              backdrop-blur-md
            "
            >
              <MdAutoAwesome className="h-4 w-4" />

              {getGreeting()}
            </div>

            <h1
              className="
              text-3xl
              font-bold
              leading-tight
              text-white
              md:text-5xl
            "
            >
              Welcome Back,

              <span
                className="
                ml-2
                bg-gradient-to-r
                from-yellow-200
                via-orange-200
                to-yellow-300
                bg-clip-text
                text-transparent
              "
              >
                {displayName}
              </span>

              👋
            </h1>

            <p
              className="
              mt-5
              max-w-2xl
              text-base
              leading-8
              text-blue-100
              md:text-lg
            "
            >
              Start translating text,
              speech,
              documents,
              images and sign language
              with AI-powered tools.

              Everything you need is
              available from your
              dashboard.
            </p>

          </div>

          {/* Button */}

          <button
            className="
            group
            inline-flex
            items-center
            gap-2
            self-start
            rounded-2xl
            border
            border-white/30
            bg-white/20
            px-6
            py-3
            font-semibold
            text-white
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-105
            hover:bg-white/30
          "
          >
            Quick Translate

            <FiArrowRight
              className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
            />
          </button>

        </div>

        {/* Bottom Stats */}

        <div
          className="
          mt-8
          flex
          flex-wrap
          gap-6
        "
        >
          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></span>

            <span className="text-sm text-blue-100">
              System Ready
            </span>

          </div>

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300"></span>

            <span className="text-sm text-blue-100">
              AI Online
            </span>

          </div>

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-purple-300"></span>

            <span className="text-sm text-blue-100">
              100+ Languages
            </span>

          </div>

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300"></span>

            <span className="text-sm text-blue-100">
              Real-time Translation
            </span>

          </div>

        </div>

      </div>
    </div>
  );
};

export default WelcomeCard;