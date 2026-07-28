import { FaFileAlt, FaLanguage } from "react-icons/fa";

interface Props {
  extractedText: string;
  translatedText: string;
}

const OCRResult = ({ extractedText, translatedText }: Props) => {
  return (
    <div className="mt-6 space-y-6">
      {/* Extracted Text */}
      <div className="rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200 p-5 transition-all duration-300 hover:border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="rounded-lg bg-blue-100 p-1.5">
            <FaFileAlt className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">
            Extracted Text
          </h3>
          <span className="ml-auto text-xs text-gray-400">
            {extractedText.split(/\s+/).length} words
          </span>
        </div>
        <div className="rounded-lg bg-white/70 backdrop-blur-sm p-4 max-h-40 overflow-y-auto whitespace-pre-wrap text-gray-700 text-sm leading-relaxed border border-gray-100">
          {extractedText || "No text extracted"}
        </div>
      </div>

      {/* Translated Text */}
      <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50/30 border border-green-200 p-5 transition-all duration-300 hover:border-green-300">
        <div className="flex items-center gap-2 mb-3">
          <div className="rounded-lg bg-green-100 p-1.5">
            <FaLanguage className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">
            Translation
          </h3>
          <span className="ml-auto text-xs text-green-600 font-medium">
            ✓ Translated
          </span>
        </div>
        <div className="rounded-lg bg-white/70 backdrop-blur-sm p-4 max-h-40 overflow-y-auto whitespace-pre-wrap text-gray-700 text-sm leading-relaxed border border-green-100">
          {translatedText || "Translation will appear here"}
        </div>
      </div>
    </div>
  );
};

export default OCRResult;