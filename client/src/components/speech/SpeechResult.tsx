import {
  FaCopy,
  FaVolumeUp,
} from "react-icons/fa";

import {
  speakText,
} from "../../services/textToSpeechService";

interface Props {
  original: string;
  translated: string;
  detectedLanguage: string;
}

const SpeechResult = ({
  original,
  translated,
  detectedLanguage,
}: Props) => {

  const copyText = () => {
    navigator.clipboard.writeText(translated);
    alert("Copied!");
  };

  const listen = () => {
    speakText(translated, detectedLanguage);
  };

  return (
    <div className="space-y-8">

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Detected Language
        </h3>

        <input
          readOnly
          value={detectedLanguage}
          className="w-full rounded-lg border bg-gray-100 p-3"
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Original Speech
        </h3>

        <textarea
          readOnly
          rows={5}
          value={original}
          className="w-full rounded-lg border p-4"
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Translation
        </h3>

        <textarea
          readOnly
          rows={5}
          value={translated}
          className="w-full rounded-lg border p-4"
        />
      </div>

      <div className="flex gap-4">

        <button
          onClick={copyText}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          <FaCopy className="mr-2 inline"/>
          Copy
        </button>

        <button
          onClick={listen}
          className="rounded-lg bg-green-600 px-5 py-3 text-white"
        >
          <FaVolumeUp className="mr-2 inline"/>
          Listen
        </button>

      </div>

    </div>
  );
};

export default SpeechResult;