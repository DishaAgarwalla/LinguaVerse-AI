interface Props {
  extractedText: string;
  translated: string;
}

const DocumentResult = ({
  extractedText,
  translated,
}: Props) => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      <div>
        <h2 className="mb-3 text-xl font-bold">
          Extracted Text
        </h2>

        <textarea
  readOnly
  value={extractedText}
  className="h-[500px] w-full rounded border p-4 overflow-y-auto resize-none"
/>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold">
          Translation
        </h2>

        <textarea
  readOnly
  value={translated}
  className="h-[500px] w-full rounded border p-4 overflow-y-auto resize-none"
/>
      </div>

    </div>
  );
};

export default DocumentResult;