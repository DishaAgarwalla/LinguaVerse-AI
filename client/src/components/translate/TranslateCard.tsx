import { useState } from "react";
import { 
  FaArrowRight, 
  FaExchangeAlt, 
  FaSpinner, 
  FaMagic,
  FaCopy,
  FaVolumeUp,
  FaCheck
} from "react-icons/fa";
import InputBox from "./InputBox";
import TranslationResult from "./TranslationResult";
import LanguageSelector from "./LanguageSelector";
import ActionButtons from "./ActionButtons";
import { translate } from "../../services/translateService";

const TranslateCard = () => {
  const [sourceText, setSourceText] = useState("");
  const [translated, setTranslated] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    try {
      setLoading(true);
      const res = await translate(sourceText, sourceLang, targetLang);
      setTranslated(res.translated);
    } catch (error) {
      console.error(error);
      alert("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    const oldSourceLang = sourceLang;
    const oldSourceText = sourceText;

    setSourceLang(targetLang);
    setTargetLang(oldSourceLang);

    setSourceText(translated);
    setTranslated(oldSourceText);
  };

  const handleCopy = async () => {
    if (!translated) return;
    await navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!translated) return;
    const utterance = new SpeechSynthesisUtterance(translated);
    utterance.lang = targetLang;
    utterance.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const handleClear = () => {
    setSourceText("");
    setTranslated("");
  };

  return (
    <div className="rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
      {/* Language Selectors */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase tracking-wider">
            Source Language
          </label>
          <LanguageSelector
            value={sourceLang}
            onChange={setSourceLang}
          />
        </div>

        <button
          onClick={swapLanguages}
          className="flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-3 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-110 mt-2 sm:mt-0"
          title="Swap languages"
        >
          <FaExchangeAlt className="w-4 h-4" />
        </button>

        <div className="flex-1 w-full">
          <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase tracking-wider">
            Target Language
          </label>
          <LanguageSelector
            value={targetLang}
            onChange={setTargetLang}
          />
        </div>
      </div>

      {/* Translation Boxes */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Source Text</span>
            <span className="text-xs text-gray-400">{sourceText.length} characters</span>
          </div>
          <InputBox
            value={sourceText}
            onChange={setSourceText}
            placeholder="Enter text to translate..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Translation</span>
            {translated && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  title="Copy translation"
                >
                  {copied ? (
                    <FaCheck className="w-4 h-4 text-green-500" />
                  ) : (
                    <FaCopy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleSpeak}
                  className="text-gray-400 hover:text-green-600 transition-colors duration-200"
                  title="Listen to translation"
                >
                  <FaVolumeUp className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <TranslationResult
            translated={translated}
            loading={loading}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleTranslate}
            disabled={loading || !sourceText.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <FaMagic className="w-4 h-4" />
                Translate
              </>
            )}
          </button>

          {sourceText && !loading && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-3 font-medium text-gray-600 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-lg hover:scale-105"
            >
              Clear
            </button>
          )}
        </div>

        {translated && !loading && (
          <ActionButtons
            translated={translated}
            targetLang={targetLang}
          />
        )}
      </div>

      {/* Status */}
      {loading && (
        <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-3">
          <div className="flex items-center gap-3 text-blue-700">
            <FaSpinner className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Translating with AI...</span>
          </div>
          <div className="mt-2 h-1 w-full bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-progress"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslateCard;