import { FaVolumeUp, FaStop, FaPlay } from "react-icons/fa";
import { speakText, stopSpeaking } from "../../services/textToSpeechService";
import { useState } from "react";

interface Props {
  text: string;
  language?: string;
}

const AudioPlayer = ({ text, language = "en" }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    setIsPlaying(true);
    speakText(text, language);
    // Reset after speech ends (approximate)
    setTimeout(() => setIsPlaying(false), text.length * 100);
  };

  const handleStop = () => {
    stopSpeaking();
    setIsPlaying(false);
  };

  if (!text) return null;

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-gray-50 to-green-50/50 p-2 border border-gray-200/50">
      <button
        onClick={handleSpeak}
        disabled={isPlaying}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPlaying ? (
          <FaPlay className="w-4 h-4 animate-pulse" />
        ) : (
          <FaVolumeUp className="w-4 h-4" />
        )}
        {isPlaying ? "Playing..." : "Listen"}
      </button>

      <button
        onClick={handleStop}
        className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 px-5 py-2.5 font-medium text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
      >
        <FaStop className="w-4 h-4" />
        Stop
      </button>
    </div>
  );
};

export default AudioPlayer;