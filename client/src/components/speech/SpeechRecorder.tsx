import { useRef, useState } from "react";
import { FaMicrophone, FaStop, FaSpinner, FaMicrophoneAlt } from "react-icons/fa";
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
  const [error, setError] = useState<string | null>(null);

  const startRecording = () => {
    setError(null);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setRecording(true);
      setError(null);
    };

    recognition.onerror = (event: any) => {
      setRecording(false);
      if (event.error === 'not-allowed') {
        setError("Microphone access denied. Please allow microphone access and try again.");
      } else if (event.error === 'no-speech') {
        setError("No speech detected. Please try again.");
      } else {
        setError(`Speech recognition error: ${event.error}`);
      }
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
        const result = await translateSpeech(transcript, "en", targetLang);
        setTranslated(result.translated);
      } catch (err) {
        console.error(err);
        setError("Translation failed. Please try again.");
      }

      setTranslating(false);
    };

    recognition.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="space-y-6">
      <LanguageSelector
        value={targetLang}
        onChange={setTargetLang}
        label="Translate To"
      />

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          <span className="font-medium">Error:</span> {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={recording ? stopRecording : startRecording}
          disabled={translating}
          className={`inline-flex items-center gap-3 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
            recording
              ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-red-500/25 hover:shadow-red-500/40"
              : translating
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-blue-500/25"
              : "bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/25 hover:shadow-green-500/40"
          }`}
        >
          {recording ? (
            <>
              <FaStop className="w-5 h-5" />
              Stop Recording
            </>
          ) : translating ? (
            <>
              <FaSpinner className="w-5 h-5 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <FaMicrophone className="w-5 h-5" />
              Start Speaking
            </>
          )}
        </button>

        {recording && (
          <>
            <RecordingTimer recording={recording} />
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-600">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                Recording
              </span>
            </div>
          </>
        )}

        {translating && (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600">
            <FaSpinner className="w-4 h-4 animate-spin" />
            Processing...
          </span>
        )}
      </div>

      {recording && (
        <div className="space-y-4 p-4 rounded-xl bg-purple-50/50 border border-purple-100">
          <WaveAnimation />
          <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
            <FaMicrophoneAlt className="w-4 h-4 animate-pulse" />
            <span>Listening... Speak clearly into your microphone</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechRecorder;