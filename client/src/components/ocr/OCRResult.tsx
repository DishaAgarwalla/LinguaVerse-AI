interface Props {
  extractedText: string;
  translatedText: string;
}

const OCRResult = ({
  extractedText,
  translatedText,
}: Props) => {
  return (
    <div className="mt-8 space-y-6">

      <div>
        <h2 className="mb-2 text-xl font-bold">
          Extracted Text
        </h2>

        <div className="rounded-xl bg-gray-100 p-5 whitespace-pre-wrap">
          {extractedText}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold text-blue-600">
          Translation
        </h2>

        <div className="rounded-xl bg-blue-50 p-5 whitespace-pre-wrap">
          {translatedText}
        </div>
      </div>

    </div>
  );
};

export default OCRResult;