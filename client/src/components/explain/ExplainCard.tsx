import { useState } from "react";
import { FaBrain, FaSpinner, FaMagic, FaLightbulb } from "react-icons/fa";
import ExplainInput from "./ExplainInput";
import ExplainResult from "./ExplainResult";
import ExplainActions from "./ExplainActions";
import LanguageSelector from "../translate/LanguageSelector";
import { explainText } from "../../services/explainService";

const ExplainCard = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const explain = async () => {
    if (!text.trim()) {
      alert("Please enter a word or sentence.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const response = await explainText(text, language, token);
      setResult(response.result);
    } catch (error) {
      console.error(error);
      alert("Explanation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setResult(null);
  };

  return (
    <div className="rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-cyan-100">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-2.5 shadow-lg shadow-cyan-500/20">
            <FaBrain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">AI Explanation</h3>
            <p className="text-sm text-gray-500">Understand any word or sentence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {result && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-lg"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column - Input & Settings */}
        <div className="space-y-6">
          <ExplainInput text={text} setText={setText} />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Explanation Language
            </label>
            <LanguageSelector
              value={language}
              onChange={setLanguage}
            />
          </div>

          <button
            onClick={explain}
            disabled={loading || !text.trim()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FaMagic className="w-4 h-4" />
                Explain
              </>
            )}
          </button>
        </div>

        {/* Right Column - Info */}
        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50/50 border border-cyan-100 p-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FaLightbulb className="w-4 h-4 text-cyan-500" />
            What AI Explains
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">•</span>
              <span className="text-gray-600"><strong>Meaning:</strong> Clear definition and context</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">•</span>
              <span className="text-gray-600"><strong>Pronunciation:</strong> How to say it correctly</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">•</span>
              <span className="text-gray-600"><strong>Grammar:</strong> Part of speech and usage rules</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">•</span>
              <span className="text-gray-600"><strong>Examples:</strong> Real-world usage examples</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">•</span>
              <span className="text-gray-600"><strong>Tips:</strong> Helpful learning tips</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-6 rounded-xl bg-cyan-50 border border-cyan-200 p-4">
          <div className="flex items-center gap-3 text-cyan-700">
            <FaSpinner className="w-5 h-5 animate-spin" />
            <span className="font-medium">AI is analyzing your text...</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-cyan-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-progress"></div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="mt-6 animate-slideUp">
          <ExplainResult result={result} />
          <ExplainActions text={JSON.stringify(result, null, 2)} />
        </div>
      )}

      {/* Empty State */}
      {!text && !loading && !result && (
        <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-8 text-center">
          <FaBrain className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            Enter a word or sentence to get an AI-powered explanation
          </p>
        </div>
      )}
    </div>
  );
};

export default ExplainCard;