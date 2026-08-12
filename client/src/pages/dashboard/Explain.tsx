import { FaBrain } from "react-icons/fa";
import ExplainCard from "../../components/explain/ExplainCard";

const Explain = () => {
  return (
    <div className="space-y-8 animate-slideUp">

      {/* Header */}

      <div>

        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/50 bg-gradient-to-r from-cyan-100 to-blue-100 px-4 py-1.5 text-sm font-semibold text-cyan-700 dark:border-cyan-500/20 dark:from-cyan-500/20 dark:to-blue-500/20 dark:text-cyan-300">
          <FaBrain className="h-4 w-4" />
          AI Explanation
        </div>

        <h1 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-slate-300 md:text-4xl">
          AI Explain
        </h1>

        <p className="mt-2 max-w-2xl text-gray-500 dark:text-slate-400">
          Understand the meaning, pronunciation, grammar, examples, and usage
          of any word or sentence using advanced AI technology.
        </p>

        {/* Features */}

        <div className="mt-5 flex flex-wrap gap-4">

          <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2 dark:border-cyan-500/20 dark:bg-cyan-500/10">
            <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
              🧠 AI Powered
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-500/20 dark:bg-blue-500/10">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              📖 Grammar & Meaning
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 dark:border-purple-500/20 dark:bg-purple-500/10">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              🔊 Pronunciation
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 dark:border-green-500/20 dark:bg-green-500/10">
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              ✨ Examples
            </span>
          </div>

        </div>

      </div>

      <ExplainCard />

    </div>
  );
};

export default Explain;