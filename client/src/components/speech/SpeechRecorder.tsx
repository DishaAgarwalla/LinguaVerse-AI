import { useRef, useState } from "react";
import { translateSpeech } from "../../services/speechService";
import LanguageSelector from "./LanguageSelector";
import RecordingTimer from "./RecordingTimer";
import WaveAnimation from "./WaveAnimation";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Props {
  targetLang: string;
  setTargetLang: (lang: string) => void;

  setOriginal: (text: string) => void;
  setTranslated: (text: string) => void;
  setDetectedLanguage: (lang: string) => void;
}

const SpeechRecorder = ({
  targetLang,
  setTargetLang,
  setOriginal,
  setTranslated,
  setDetectedLanguage,
}: Props) => {
  const recognitionRef = useRef<any>(null);

  const [recording, setRecording] = useState(false);
  const [translating, setTranslating] = useState(false);

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setRecording(true);
    };

    recognition.onerror = () => {
      setRecording(false);
      alert("Speech recognition failed.");
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;

      setOriginal(transcript);
      setDetectedLanguage("en");

      setTranslating(true);

      try {
        const result = await translateSpeech(
          transcript,
          "en",
          targetLang
        );

        setTranslated(result.translated);
      } catch (err) {
        console.error(err);
        alert("Translation failed.");
      }

      setTranslating(false);
    };

    recognition.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
  };

  return (
    <div className="space-y-6">

      <LanguageSelector
        value={targetLang}
        onChange={setTargetLang}
      />

      <button
        onClick={recording ? stopRecording : startRecording}
        disabled={translating}
        className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
          recording
            ? "bg-red-600 hover:bg-red-700"
            : translating
            ? "cursor-not-allowed bg-blue-600"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {recording
          ? "⏹ Stop Listening"
          : translating
          ? "🌍 Translating..."
          : "🎤 Start Speaking"}
      </button>

      {recording && (
        <>
          <WaveAnimation />
          <RecordingTimer recording={recording} />

          <p className="animate-pulse text-center font-semibold text-red-600">
            🎙 Listening...
          </p>
        </>
      )}

      {translating && (
        <p className="animate-pulse text-center font-semibold text-blue-600">
          Translating...
        </p>
      )}
    </div>
  );
};

export default SpeechRecorder;