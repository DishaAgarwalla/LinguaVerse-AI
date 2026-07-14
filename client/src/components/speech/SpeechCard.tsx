import { useState } from "react";

import SpeechRecorder from "./SpeechRecorder";
import SpeechResult from "./SpeechResult";

const SpeechCard = () => {
  const [original, setOriginal] = useState("");

  const [translated, setTranslated] = useState("");

  const [detectedLanguage, setDetectedLanguage] =
    useState("");

  const [targetLang, setTargetLang] =
    useState("Hindi");

  return (
    <div className="space-y-8 rounded-xl bg-white p-6 shadow">

      <SpeechRecorder
        targetLang={targetLang}
        setTargetLang={setTargetLang}
        setOriginal={setOriginal}
        setTranslated={setTranslated}
        setDetectedLanguage={
          setDetectedLanguage
        }
      />

      <SpeechResult
        original={original}
        translated={translated}
        detectedLanguage={detectedLanguage}
      />

    </div>
  );
};

export default SpeechCard;