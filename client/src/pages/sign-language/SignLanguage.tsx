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
  // ============================================================
  // WEBCAM
  // ============================================================

  const {
    videoRef,
    isRunning,
    isCollecting,
    collectedFrames,
    startCamera,
    stopCamera,
    collectFrames,
  } = useWebcam();

  // ============================================================
  // PREDICTION
  // ============================================================

  const [label, setLabel] =
    useState("Waiting...");

  const [confidence, setConfidence] =
    useState(0);

  // ============================================================
  // TRANSLATION
  // ============================================================

  const [translations, setTranslations] =
    useState<TranslationResult[]>([]);

  // ============================================================
  // SPEECH
  // ============================================================

  const [speechText, setSpeechText] =
    useState("");

  // ============================================================
  // HISTORY
  // ============================================================

  const [history, setHistory] =
    useState<RecognitionHistoryItem[]>([]);

  // ============================================================
  // LEARNING DATA
  // ============================================================

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

  // ============================================================
  // CAPTURE / PREDICT GESTURE
  // ============================================================

  const handleCapture = async () => {
    // ----------------------------------------------------------
    // Make sure camera is running
    // ----------------------------------------------------------

    if (!isRunning) {
      console.warn(
        "Camera is not running."
      );

      return;
    }

    // ----------------------------------------------------------
    // Prevent multiple simultaneous captures
    // ----------------------------------------------------------

    if (isCollecting) {
      return;
    }

    // ----------------------------------------------------------
    // Reset current prediction
    // ----------------------------------------------------------

    setLabel("Collecting...");

    setConfidence(0);

    setTranslations([]);

    setSpeechText("");

    // ----------------------------------------------------------
    // Collect exactly 30 frames
    // ----------------------------------------------------------

    const frames =
      await collectFrames();

    // ----------------------------------------------------------
    // Check collection
    // ----------------------------------------------------------

    if (frames.length !== 30) {
      setLabel(
        "Unable to collect frames"
      );

      setConfidence(0);

      return;
    }

    // ----------------------------------------------------------
    // Send 30 frames to backend
    // ----------------------------------------------------------

    try {
      setLabel("Analyzing...");
      
      const result =
        await detectSign(frames);

      // --------------------------------------------------------
      // Update prediction
      // --------------------------------------------------------

      setLabel(
        result.recognition.label
      );

      setConfidence(
        result.recognition.confidence
      );

      // --------------------------------------------------------
      // Update translations
      // --------------------------------------------------------

      setTranslations(
        result.translations
      );

      // --------------------------------------------------------
      // Speech text
      // --------------------------------------------------------

      const firstTranslation =
        result.translations[0]?.text ??
        "";

      setSpeechText(
        firstTranslation
      );

      // --------------------------------------------------------
      // Recognition history
      // --------------------------------------------------------

      if (
        result.recognition.label !==
        "Uncertain"
      ) {
        setHistory((prev) => [
          {
            gesture:
              result.recognition.label,

            translation:
              firstTranslation,

            confidence:
              result.recognition.confidence,

            time:
              new Date().toLocaleTimeString(),
          },

          ...prev,
        ]);
      }
    } catch (error) {
      console.error(
        "Sign language detection failed:",
        error
      );

      setLabel(
        "Detection failed"
      );

      setConfidence(0);

      setTranslations([]);

      setSpeechText("");
    }
  };

  // ============================================================
  // RESET PAGE
  // ============================================================

  const handleReset = () => {
    stopCamera();

    setLabel("Waiting...");

    setConfidence(0);

    setTranslations([]);

    setSpeechText("");

    setHistory([]);
  };

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="space-y-8">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div>
        <h1 className="text-3xl font-bold">
          🤟 Sign Language Translation
        </h1>

        <p className="mt-2 text-gray-500">
          Show a sign to the camera and
          let LinguaVerse AI recognize it.
        </p>
      </div>

      {/* ======================================================
          WEBCAM + PREDICTION
      ====================================================== */}

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

      {/* ======================================================
          COLLECTION STATUS
      ====================================================== */}

      {isCollecting && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-blue-800">
                🤟 Collecting Gesture
              </h2>

              <p className="mt-1 text-sm text-blue-600">
                Keep your hand visible and
                perform the gesture naturally.
              </p>

            </div>

            <span className="text-lg font-bold text-blue-700">
              {collectedFrames}/30
            </span>

          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-blue-100">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-100"
              style={{
                width: `${(
                  collectedFrames / 30
                ) * 100}%`,
              }}
            />

          </div>

          <p className="mt-2 text-xs text-blue-600">
            Please hold the gesture until
            collection is complete.
          </p>

        </div>
      )}

      {/* ======================================================
          CAMERA CONTROLS
      ====================================================== */}

      <CameraControls
        isRunning={isRunning}
        onStart={startCamera}
        onStop={stopCamera}
        onCapture={handleCapture}
      />

      {/* ======================================================
          TRANSLATION + SPEECH
      ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        <TranslationPanel
          translations={translations}
        />

        <SpeechPanel
          text={speechText}
        />

      </div>

      {/* ======================================================
          LEARNING
      ====================================================== */}

      <LearningPanel
        lessons={learning}
      />

      {/* ======================================================
          HISTORY
      ====================================================== */}

      <RecognitionHistory
        history={history}
      />

    </div>
  );
}