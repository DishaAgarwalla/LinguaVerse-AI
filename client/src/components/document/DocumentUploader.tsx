interface Props {
  file: File | null;
  setFile: (file: File) => void;
}

const DocumentUploader = ({ file, setFile }: Props) => {
  return (
    <div className="space-y-4">

      <label
        htmlFor="document"
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 p-10 transition hover:bg-blue-100"
      >
        <div className="text-6xl">📄</div>

        <p className="mt-3 text-xl font-semibold">
          Click to Upload
        </p>

        <p className="text-gray-500">
          PDF or DOCX (Max 10 MB)
        </p>

        {file && (
          <div className="mt-4 rounded bg-green-100 px-4 py-2 text-green-700">
            {file.name}
          </div>
        )}
      </label>

      <input
        id="document"
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) {
            setFile(e.target.files[0]);
          }
        }}
      />

    </div>
  );
};

export default DocumentUploader;