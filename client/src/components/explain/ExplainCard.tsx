import { useState } from "react";

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
      alert("Please enter some text.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token") || "";

      const response = await explainText(
        text,
        language,
        token
      );

      setResult(response.result);

    } catch (error) {
      console.error(error);
      alert("Explanation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-xl bg-white p-8 shadow">

      <ExplainInput
        text={text}
        setText={setText}
      />

      <div>

        <label className="mb-2 block text-sm font-medium">
          Language
        </label>

        <LanguageSelector
          value={language}
          onChange={setLanguage}
        />

      </div>

      <button
        onClick={explain}
        disabled={loading}
        className="
          rounded-lg
          bg-blue-600
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-blue-700
          disabled:opacity-50
        "
      >
        {loading
          ? "Explaining..."
          : "Explain"}
      </button>

      {result && (
        <>
          <ExplainResult result={result} />

          <ExplainActions
            text={JSON.stringify(result, null, 2)}
          />
        </>
      )}

    </div>
  );
};

export default ExplainCard;