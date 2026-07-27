import { FaFileAlt, FaLanguage, FaCopy, FaCheck } from "react-icons/fa";
import { useState } from "react";

interface Props {
  extractedText: string;
  translated: string;
}

const DocumentResult = ({ extractedText, translated }: Props) => {
  const [copiedExtracted, setCopiedExtracted] = useState(false);
  const [copiedTranslated, setCopiedTranslated] = useState(false);

  const copyExtracted = async () => {
    await navigator.clipboard.writeText(extractedText);
    setCopiedExtracted(true);
    setTimeout(() => setCopiedExtracted(false), 2000);
  };

  const copyTranslated = async () => {
    await navigator.clipboard.writeText(translated);
    setCopiedTranslated(true);
    setTimeout(() => setCopiedTranslated(false), 2000);
  };

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {/* Extracted Text */}
      <div className="rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-200">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-100 p-1.5">
              <FaFileAlt className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">
              Extracted Text
            </h3>
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {extractedText.split(/\s+/).length} words
            </span>
          </div>
          <button
            onClick={copyExtracted}
            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
            title="Copy extracted text"
          >
            {copiedExtracted ? (
              <FaCheck className="w-4 h-4 text-green-500" />
            ) : (
              <FaCopy className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="p-4 max-h-[400px] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
            {extractedText || "No text extracted from document."}
          </pre>
        </div>
      </div>

      {/* Translation */}
      <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50/30 border border-green-200 overflow-hidden transition-all duration-300 hover:border-green-300">
        <div className="flex items-center justify-between border-b border-green-200 bg-white/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-green-100 p-1.5">
              <FaLanguage className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">
              Translation
            </h3>
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              ✓ Done
            </span>
          </div>
          <button
            onClick={copyTranslated}
            className="text-gray-400 hover:text-green-600 transition-colors duration-200"
            title="Copy translation"
          >
            {copiedTranslated ? (
              <FaCheck className="w-4 h-4 text-green-500" />
            ) : (
              <FaCopy className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="p-4 max-h-[400px] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
            {translated || "Translation will appear here."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DocumentResult;