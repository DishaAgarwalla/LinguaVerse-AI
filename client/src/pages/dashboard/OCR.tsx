import { FiImage } from "react-icons/fi";
import OCRCard from "../../components/ocr/OCRCard";

const OCR = () => {
  return (
    <div className="space-y-8 animate-slideUp">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-1.5 text-sm font-semibold text-green-600 border border-green-200/50">
          <FiImage className="w-4 h-4" />
          OCR Translation
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          AI OCR Translator
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl">
          Upload an image, extract text using OCR technology, and translate it instantly.
          Perfect for documents, signs, and screenshots.
        </p>
      </div>

      <OCRCard />
    </div>
  );
};

export default OCR;