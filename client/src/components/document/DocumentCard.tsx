import { useState } from "react";

import DocumentUploader from "./DocumentUploader";
import DocumentResult from "./DocumentResult";
import DocumentActions from "./DocumentActions";

import { uploadDocument } from "../../services/documentService";

const DocumentCard = () => {
  const [file, setFile] = useState<File | null>(null);

  const [language, setLanguage] = useState("Hindi");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const translate = async () => {
    if (!file) {
      alert("Select a document first.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token") || "";

      const data = await uploadDocument(
        file,
        language,
        token
      );

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-8 shadow space-y-6">

      <DocumentUploader
        file={file}
        setFile={setFile}
      />

      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
        className="rounded border p-3"
      >
        <option>Hindi</option>
        <option>Spanish</option>
        <option>French</option>
        <option>German</option>
        <option>Japanese</option>
      </select>

      <button
        onClick={translate}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        {loading
          ? "Translating..."
          : "Translate Document"}
      </button>

      {result && (
        <>
          <DocumentResult
            extractedText={result.extractedText}
            translated={result.translated}
          />

          <DocumentActions
            translated={result.translated}
          />
        </>
      )}

    </div>
  );
};

export default DocumentCard;