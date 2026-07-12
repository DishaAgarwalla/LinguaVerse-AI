import OCRCard from "../../components/ocr/OCRCard";

const OCR = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          AI OCR Translator
        </h1>

        <p className="mt-2 text-gray-500">
          Upload an image, extract text using OCR and translate it instantly.
        </p>
      </div>

      <OCRCard />
    </div>
  );
};

export default OCR;