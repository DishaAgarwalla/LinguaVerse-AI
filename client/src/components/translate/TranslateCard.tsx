import { useState } from "react";
import {
  FaExchangeAlt,
  FaSpinner,
  FaMagic,
  FaCopy,
  FaVolumeUp,
  FaCheck,
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

      const res = await translate(
        sourceText,
        sourceLang,
        targetLang
      );

      setTranslated(res.translated);
    } catch (error) {
      console.error(error);
      alert("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    const oldSource = sourceText;
    const oldLang = sourceLang;

    setSourceLang(targetLang);
    setTargetLang(oldLang);

    setSourceText(translated);
    setTranslated(oldSource);
  };

  const handleCopy = async () => {
    if (!translated) return;

    await navigator.clipboard.writeText(translated);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSpeak = () => {
    if (!translated) return;

    const utterance = new SpeechSynthesisUtterance(
      translated
    );

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
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

      {/* Language Selectors */}

      <div className="mb-8 flex flex-col items-center gap-5 md:flex-row">

        <div className="w-full flex-1">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
            Source Language
          </label>

          <LanguageSelector
            value={sourceLang}
            onChange={setSourceLang}
          />
        </div>

        <button
          onClick={swapLanguages}
          className="mt-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          title="Swap Languages"
        >
          <FaExchangeAlt className="h-4 w-4" />
        </button>

        <div className="w-full flex-1">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
            Target Language
          </label>

          <LanguageSelector
            value={targetLang}
            onChange={setTargetLang}
          />
        </div>

      </div>

      {/* Translation Panels */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Input */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
              Source Text
            </span>

            <span className="text-xs text-gray-400 dark:text-slate-500">
              {sourceText.length} characters
            </span>

          </div>

          <InputBox
            value={sourceText}
            onChange={setSourceText}
            placeholder="Type or paste text here..."
          />

        </div>

        {/* Output */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
              Translation
            </span>

            {translated && (
              <div className="flex items-center gap-3">

                <button
                  onClick={handleCopy}
                  className="transition hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {copied ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaCopy />
                  )}
                </button>

                <button
                  onClick={handleSpeak}
                  className="transition hover:text-green-600 dark:hover:text-green-400"
                >
                  <FaVolumeUp />
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
            {/* Bottom Actions */}

      <div className="mt-8 flex flex-col gap-5 border-t border-gray-200 pt-6 dark:border-slate-700">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="flex flex-wrap gap-3">

            <button
              onClick={handleTranslate}
              disabled={loading || !sourceText.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <FaMagic />
                  Translate
                </>
              )}
            </button>

            {(sourceText || translated) && (
              <button
                onClick={handleClear}
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
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

        {/* Loading Status */}

        {loading && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">

            <div className="mb-3 flex items-center gap-3 text-blue-700 dark:text-blue-300">

              <FaSpinner className="animate-spin" />

              <span className="font-medium">
                Translating using AI...
              </span>

            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-blue-200 dark:bg-slate-700">

              <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default TranslateCard;