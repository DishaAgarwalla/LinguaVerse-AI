import { useState } from "react";
import SpeechRecorder from "./SpeechRecorder";
import SpeechResult from "./SpeechResult";

const SpeechCard = () => {
  const [original, setOriginal] = useState("");
  const [translated, setTranslated] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [targetLang, setTargetLang] = useState("hi");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-purple-100">
        <SpeechRecorder
          targetLang={targetLang}
          setTargetLang={setTargetLang}
          setOriginal={setOriginal}
          setTranslated={setTranslated}
          setDetectedLanguage={setDetectedLanguage}
        />
      </div>

      {(original || translated) && (
        <div className="rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-purple-100 animate-slideUp">
          <SpeechResult
            original={original}
            translated={translated}
            detectedLanguage={detectedLanguage}
          />
        </div>
      )}
    </div>
  );
};

export default SpeechCard;