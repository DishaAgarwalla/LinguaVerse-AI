import { useState } from "react";
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

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    try {
      setLoading(true);

      const res = await translate(
        sourceText,
        sourceLang,
        targetLang
      );

      console.log("Translation Response:", res);

      setTranslated(res.translated);

    } catch (error) {
      console.error(error);
      alert("Translation failed");
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

  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <div className="mb-6 flex items-center justify-between">

        <LanguageSelector
          value={sourceLang}
          onChange={setSourceLang}
        />

        <button
          onClick={swapLanguages}
          className="rounded-full bg-gray-100 p-3 hover:bg-gray-200"
        >
          ⇄
        </button>

        <LanguageSelector
          value={targetLang}
          onChange={setTargetLang}
        />

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <InputBox
          value={sourceText}
          onChange={setSourceText}
        />

        <TranslationResult
          translated={translated}
        />

      </div>

      <button
        onClick={handleTranslate}
        disabled={loading}
        className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {translated && (
        <div className="mt-6">
          <ActionButtons
            translated={translated}
            targetLang={targetLang}
          />
        </div>
      )}

    </div>
  );
};

export default TranslateCard;