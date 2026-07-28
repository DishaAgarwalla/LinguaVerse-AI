import { useState } from "react";
import { FaSpinner, FaMagic, FaImage } from "react-icons/fa";
import ImageUploader from "./ImageUploader";
import OCRResult from "./OCRResult";
import OCRActions from "./OCRActions";
import LanguageSelector from "../translate/LanguageSelector";
import { processOCR } from "../../services/ocrService";

const OCRCard = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleUpload = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    try {
      setLoading(true);
      const res = await processOCR(image, targetLang);
      setExtractedText(res.extractedText);
      setTranslatedText(res.translated);
    } catch (err) {
      console.error(err);
      alert("OCR translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview("");
    setExtractedText("");
    setTranslatedText("");
  };

  return (
    <div className="rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2.5 shadow-lg shadow-blue-500/20">
            <FaImage className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Image OCR Translator</h3>
            <p className="text-sm text-gray-500">Extract text from images and translate</p>
          </div>
        </div>
        
        <LanguageSelector
          value={targetLang}
          onChange={setTargetLang}
        />
      </div>

      {/* Upload Area */}
      <ImageUploader
        preview={preview}
        setPreview={setPreview}
        setImage={setImage}
      />

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={handleUpload}
          disabled={loading || !image}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <>
              <FaSpinner className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FaMagic className="w-4 h-4" />
              Translate Image
            </>
          )}
        </button>

        {(extractedText || translatedText) && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-3 font-medium text-gray-600 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-lg hover:scale-105"
          >
            Reset
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-center gap-3 text-blue-700">
            <FaSpinner className="w-5 h-5 animate-spin" />
            <span className="font-medium">Processing your image with AI...</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-progress"></div>
          </div>
        </div>
      )}

      {/* Results */}
      {(extractedText || translatedText) && !loading && (
        <div className="mt-6 animate-slideUp">
          <OCRResult
            extractedText={extractedText}
            translatedText={translatedText}
          />
          <OCRActions
            translated={translatedText}
            targetLang={targetLang}
          />
        </div>
      )}

      {/* Empty State */}
      {!preview && !loading && !extractedText && (
        <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            Upload an image to start extracting and translating text
          </p>
        </div>
      )}
    </div>
  );
};

export default OCRCard;