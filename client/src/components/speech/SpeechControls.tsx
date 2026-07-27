import { useState } from "react";
import { saveAs } from "file-saver";
import { FaCopy, FaDownload, FaCheck } from "react-icons/fa";

interface Props {
  translated: string;
}

const SpeechControls = ({ translated }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    await navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([translated], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `translation_${Date.now()}.txt`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={copyText}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
      >
        {copied ? (
          <>
            <FaCheck className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <FaCopy className="w-4 h-4" />
            Copy
          </>
        )}
      </button>

      <button
        onClick={download}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
      >
        <FaDownload className="w-4 h-4" />
        Download
      </button>
    </div>
  );
};

export default SpeechControls;