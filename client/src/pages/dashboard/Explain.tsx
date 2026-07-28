import { FaBrain } from "react-icons/fa";
import ExplainCard from "../../components/explain/ExplainCard";

const Explain = () => {
  return (
    <div className="space-y-8 animate-slideUp">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-4 py-1.5 text-sm font-semibold text-cyan-700 border border-cyan-200/50">
          <FaBrain className="w-4 h-4" />
          AI Explanation
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          AI Explain
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl">
          Understand the meaning, pronunciation, grammar, examples, and usage of any
          word or sentence using advanced AI technology.
        </p>
      </div>

      <ExplainCard />
    </div>
  );
};

export default Explain;