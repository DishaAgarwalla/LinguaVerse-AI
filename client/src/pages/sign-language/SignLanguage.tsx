import { useState } from "react";

import WebcamPreview from "../../components/sign-language/WebcamPreview";
import PredictionCard from "../../components/sign-language/PredictionCard";
import TranslationPanel from "../../components/sign-language/TranslationPanel";
import SpeechPanel from "../../components/sign-language/SpeechPanel";
import LearningPanel from "../../components/sign-language/LearningPanel";
import CameraControls from "../../components/sign-language/CameraControls";
import RecognitionHistory from "../../components/sign-language/RecognitionHistory";

import useWebcam from "../../hooks/useWebcam";
import { detectSign } from "../../services/signLanguageService";

import type {
  TranslationResult,
  LearningGesture,
  RecognitionHistoryItem,
} from "../../types/signLanguage";

export default function SignLanguage() {
  const {
    videoRef,
    isRunning,
    startCamera,
    stopCamera,
    captureFrame,
  } = useWebcam();

  const [label, setLabel] = useState("Waiting...");
  const [confidence, setConfidence] = useState(0);

  const [translations, setTranslations] =
    useState<TranslationResult[]>([]);

  const [speechText, setSpeechText] =
    useState("");

  const [history, setHistory] =
    useState<RecognitionHistoryItem[]>([]);

  const learning: LearningGesture[] = [
    {
      gesture: "HELLO",
      meaning: "Greeting",
      difficulty: "Easy",
      progress: 80,
    },
    {
      gesture: "THANK YOU",
      meaning: "Appreciation",
      difficulty: "Easy",
      progress: 65,
    },
    {
      gesture: "PLEASE",
      meaning: "Politeness",
      difficulty: "Medium",
      progress: 40,
    },
  ];

  const handleCapture = async () => {
    const image = captureFrame();

    if (!image) return;

    const result = await detectSign(image);

    setLabel(result.recognition.label);
    setConfidence(result.recognition.confidence);

    setTranslations(result.translations);

    const firstTranslation =
      result.translations[0]?.text ?? "";

    setSpeechText(firstTranslation);

    setHistory((prev) => [
      {
        gesture: result.recognition.label,
        translation: firstTranslation,
        confidence: result.recognition.confidence,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        🤟 Sign Language Translation
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">

        <WebcamPreview
          videoRef={videoRef}
          isRunning={isRunning}
        />

        <PredictionCard
          label={label}
          confidence={confidence}
        />

      </div>

      <CameraControls
        isRunning={isRunning}
        onStart={startCamera}
        onStop={stopCamera}
        onCapture={handleCapture}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <TranslationPanel
          translations={translations}
        />

        <SpeechPanel
          text={speechText}
        />

      </div>

      <LearningPanel
        lessons={learning}
      />

      <RecognitionHistory
        history={history}
      />

    </div>
  );
}