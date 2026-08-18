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
  // ERROR
  // ============================================================

  const [errorMessage, setErrorMessage] =
    useState("");

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
  // HANDLE CAPTURE
  // ============================================================

  const handleCapture = async () => {
    // ----------------------------------------------------------
    // Clear previous error
    // ----------------------------------------------------------

    setErrorMessage("");

    // ----------------------------------------------------------
    // Make sure camera is running
    // ----------------------------------------------------------

    if (!isRunning) {
      setErrorMessage(
        "Please start the camera first."
      );

      return;
    }

    try {
      // ========================================================
      // COLLECT 30 FRAMES
      // ========================================================

      console.log(
        "Starting 30-frame collection..."
      );

      const frames =
        await collectFrames();

      // ========================================================
      // VALIDATE
      // ========================================================

      if (frames.length !== 30) {
        setErrorMessage(
          `Unable to collect 30 frames. Received ${frames.length}.`
        );

        return;
      }

      console.log(
        "30 frames collected successfully."
      );

      // ========================================================
      // SEND TO BACKEND
      // ========================================================

      console.log(
        "Sending 30 frames to backend..."
      );

      const result =
        await detectSign(frames);

      // ========================================================
      // UPDATE PREDICTION
      // ========================================================

      setLabel(
        result.recognition.label
      );

      setConfidence(
        result.recognition.confidence
      );

      // ========================================================
      // UPDATE TRANSLATIONS
      // ========================================================

      setTranslations(
        result.translations
      );

      // ========================================================
      // SPEECH TEXT
      // ========================================================

      const firstTranslation =
        result.translations[0]?.text ??
        "";

      setSpeechText(
        firstTranslation
      );

      // ========================================================
      // HISTORY
      // ========================================================

      setHistory((previous) => [
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

        ...previous,
      ]);

      console.log(
        "Sign language detection successful:",
        result
      );

    } catch (error: any) {

      // ========================================================
      // ERROR HANDLING
      // ========================================================

      console.error(
        "Sign language detection failed:",
        error
      );

      // --------------------------------------------------------
      // Extract backend error
      // --------------------------------------------------------

      const backendMessage =
        error?.response?.data?.message;

      if (backendMessage) {

        setErrorMessage(
          backendMessage
        );

      } else {

        setErrorMessage(
          "Unable to detect sign language. Please try again."
        );
      }

      // --------------------------------------------------------
      // Reset prediction
      // --------------------------------------------------------

      setLabel(
        "Detection failed"
      );

      setConfidence(0);

      setTranslations([]);

      setSpeechText("");
    }
  };

  // ============================================================
  // RENDER
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
          Show a sign to the camera and let
          LinguaVerse AI recognize it.
        </p>

      </div>


      {/* ======================================================
          ERROR
      ====================================================== */}

      {errorMessage && (

        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

          <p className="font-semibold">
            Detection Error
          </p>

          <p className="mt-1 text-sm">
            {errorMessage}
          </p>

        </div>

      )}


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

            <p className="font-semibold text-blue-700">
              🤟 Collecting gesture frames...
            </p>

            <p className="font-bold text-blue-700">
              {collectedFrames}/30
            </p>

          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-blue-100">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-100"
              style={{
                width: `${(
                  collectedFrames / 30
                ) * 100}%`,
              }}
            />

          </div>

          <p className="mt-2 text-sm text-blue-600">
            Keep your hand clearly visible and
            perform the gesture.
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