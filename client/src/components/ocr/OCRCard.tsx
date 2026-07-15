import { useState } from "react";

import ImageUploader from "./ImageUploader";
import OCRResult from "./OCRResult";
import OCRActions from "./OCRActions";

import LanguageSelector from "../translate/LanguageSelector";

import { processOCR } from "../../services/ocrService";

const OCRCard = () => {
  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  // Use language CODE
  const [targetLang, setTargetLang] =
    useState("hi");

  const [loading, setLoading] = useState(false);

  const [extractedText, setExtractedText] =
    useState("");

  const [translatedText, setTranslatedText] =
    useState("");

  const handleUpload = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    try {
      setLoading(true);

      const res = await processOCR(
        image,
        targetLang
      );

      setExtractedText(res.extractedText);

      setTranslatedText(res.translated);
    } catch (err) {
      console.error(err);
      alert("OCR translation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <div className="mb-6 flex justify-end">

        <LanguageSelector
          value={targetLang}
          onChange={setTargetLang}
        />

      </div>

      <ImageUploader
        preview={preview}
        setPreview={setPreview}
        setImage={setImage}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="
          mt-6
          rounded-xl
          bg-blue-600
          px-8
          py-3
          font-semibold
          text-white
          transition
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading
          ? "Processing..."
          : "Translate Image"}
      </button>

      {translatedText && (
        <>
          <OCRResult
            extractedText={extractedText}
            translatedText={translatedText}
          />

          <OCRActions
            translated={translatedText}
            targetLang={targetLang}
          />
        </>
      )}

    </div>
  );
};

export default OCRCard;