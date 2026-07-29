import { FiArrowRight } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";

interface WelcomeCardProps {
  name?: string;
}

const WelcomeCard = ({ name }: WelcomeCardProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Use the passed name or fallback to localStorage
  const displayName = name || localStorage.getItem("userName") || "User";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-10 shadow-2xl shadow-blue-500/20">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white border border-white/20 mb-4">
              <MdAutoAwesome className="w-4 h-4" />
              {getGreeting()}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Welcome Back, <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">{displayName}</span> 👋
            </h1>
            
            <p className="mt-4 max-w-2xl text-lg text-blue-100 leading-relaxed">
              Start translating text, speech, images, and sign language using AI-powered tools.
              Your next translation is just a click away!
            </p>
          </div>

          {/* Quick action button */}
          <button className="group inline-flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-sm px-6 py-3 text-white font-medium border border-white/30 transition-all duration-300 hover:bg-white/30 hover:scale-105">
            Quick Translate
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats mini */}
        <div className="mt-6 flex flex-wrap gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-blue-100">System Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="text-sm text-blue-100">AI Online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span className="text-sm text-blue-100">100+ Languages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;