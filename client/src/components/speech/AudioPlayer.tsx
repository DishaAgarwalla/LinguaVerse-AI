import {
  speakText,
  stopSpeaking,
} from "../../services/textToSpeechService";

interface Props {
  text: string;
  language?: string;
}

const AudioPlayer = ({
  text,
  language = "en",
}: Props) => {
  if (!text) return null;

  return (
    <div className="flex gap-4">

      <button
        onClick={() =>
          speakText(text, language)
        }
        className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
      >
        🔊 Listen
      </button>

      <button
        onClick={stopSpeaking}
        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
      >
        ⏹ Stop
      </button>

    </div>
  );
};

export default AudioPlayer;