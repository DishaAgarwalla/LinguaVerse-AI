import { FiImage } from "react-icons/fi";
import { FaCamera, FaLanguage } from "react-icons/fa";
import OCRCard from "../../components/ocr/OCRCard";

const OCR = () => {
  return (
    <div className="space-y-8 animate-slideUp">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-green-200/50 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-1.5 text-sm font-semibold text-green-700 dark:border-green-700/40 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300">
          <FiImage className="h-4 w-4" />
          OCR Translation
        </div>

        <h1 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-300 md:text-4xl">
          AI OCR Translator
        </h1>

        <p className="mt-2 max-w-2xl text-gray-500 dark:text-gray-400">
          Upload an image, extract text using OCR technology, and translate it
          instantly. Perfect for documents, signs, screenshots, handwritten
          notes, and scanned files.
        </p>

        {/* Feature Pills */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-2 dark:border-green-800 dark:bg-green-900/20">
            <FaCamera className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Image Recognition
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 dark:border-blue-800 dark:bg-blue-900/20">
            <FaLanguage className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              100+ Languages
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-purple-100 bg-purple-50 px-4 py-2 dark:border-purple-800 dark:bg-purple-900/20">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              ⚡ Instant OCR
            </span>
          </div>
        </div>
      </div>

      {/* OCR Card */}
      <OCRCard />
    </div>
  );
};

export default OCR;