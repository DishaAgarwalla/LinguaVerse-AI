import {
  FaCopy,
  FaVolumeUp,
} from "react-icons/fa";

import {
  speakText,
} from "../../services/textToSpeechService";

interface Props {
  translated: string;
}

const SpeechActions = ({
  translated,
}: Props) => {

  const copy = async () => {
    await navigator.clipboard.writeText(translated);
    alert("Copied!");
  };

  const speak = () => {
    speakText(translated);
  };

  return (
    <div className="flex gap-4">

      <button
        onClick={copy}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white"
      >
        <FaCopy className="mr-2 inline"/>
        Copy
      </button>

      <button
        onClick={speak}
        className="rounded-lg bg-green-600 px-5 py-2 text-white"
      >
        <FaVolumeUp className="mr-2 inline"/>
        Listen
      </button>

    </div>
  );
};

export default SpeechActions;