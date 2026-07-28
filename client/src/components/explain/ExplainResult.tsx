import { 
  FaBook, 
  FaVolumeUp, 
  FaSpellCheck, 
  FaLightbulb, 
  FaQuoteRight,
  FaCheckCircle 
} from "react-icons/fa";

interface Props {
  result: {
    word: string;
    language: string;
    meaning: string;
    pronunciation: string;
    grammar: string;
    example: string;
    tips: string;
  };
}

const ExplainResult = ({ result }: Props) => {
  const sections = [
    { 
      icon: FaBook, 
      title: "Meaning", 
      value: result.meaning,
      color: "from-blue-500 to-indigo-600",
      bg: "from-blue-50 to-indigo-50/30",
      border: "border-blue-200",
      iconBg: "bg-blue-100"
    },
    { 
      icon: FaVolumeUp, 
      title: "Pronunciation", 
      value: result.pronunciation,
      color: "from-green-500 to-emerald-600",
      bg: "from-green-50 to-emerald-50/30",
      border: "border-green-200",
      iconBg: "bg-green-100"
    },
    { 
      icon: FaSpellCheck, 
      title: "Grammar", 
      value: result.grammar,
      color: "from-purple-500 to-pink-600",
      bg: "from-purple-50 to-pink-50/30",
      border: "border-purple-200",
      iconBg: "bg-purple-100"
    },
    { 
      icon: FaQuoteRight, 
      title: "Example", 
      value: result.example,
      color: "from-orange-500 to-red-600",
      bg: "from-orange-50 to-red-50/30",
      border: "border-orange-200",
      iconBg: "bg-orange-100"
    },
    { 
      icon: FaLightbulb, 
      title: "Tips", 
      value: result.tips,
      color: "from-yellow-500 to-amber-600",
      bg: "from-yellow-50 to-amber-50/30",
      border: "border-yellow-200",
      iconBg: "bg-yellow-100"
    },
  ];

  return (
    <div className="mt-6 space-y-4">
      {/* Word Header */}
      <div className="rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-2">
            <FaCheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Analyzed Word</p>
            <h2 className="text-2xl font-bold text-gray-800">{result.word}</h2>
          </div>
        </div>
        <span className="text-xs bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-200 text-gray-600">
          {result.language}
        </span>
      </div>

      {/* Result Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`rounded-xl bg-gradient-to-br ${section.bg} border ${section.border} p-5 transition-all duration-300 hover:shadow-md hover:scale-[1.01]`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`rounded-lg ${section.iconBg} p-1.5`}>
                <section.icon className={`w-4 h-4 text-${section.color.split(' ')[1]}`} />
              </div>
              <h3 className={`text-sm font-semibold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                {section.title}
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.value || "Not available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplainResult;