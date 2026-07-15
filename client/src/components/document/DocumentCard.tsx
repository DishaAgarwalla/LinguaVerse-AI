import { useState } from "react";

import DocumentUploader from "./DocumentUploader";
import DocumentResult from "./DocumentResult";
import DocumentActions from "./DocumentActions";

import LanguageSelector from "../translate/LanguageSelector";

import { uploadDocument } from "../../services/documentService";

const DocumentCard = () => {
  const [file, setFile] = useState<File | null>(null);

  // Use language CODE instead of language name
  const [language, setLanguage] = useState("hi");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const translate = async () => {
  if (!file) {
    alert("Please select a document first.");
    return;
  }

  try {
    setLoading(true);

    const token = localStorage.getItem("token") || "";

    const response = await uploadDocument(
      file,
      language,
      token
    );

    console.log("Frontend Response");
    console.log(response);

    setResult({
      extractedText: response.extractedText,
      translated: response.translated,
    });

  } catch (error) {
    console.error(error);
    alert("Document translation failed.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="space-y-6 rounded-xl bg-white p-8 shadow">

      <DocumentUploader
        file={file}
        setFile={setFile}
      />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Target Language
        </label>

        <LanguageSelector
          value={language}
          onChange={setLanguage}
        />
      </div>

      <button
        onClick={translate}
        disabled={loading}
        className="
          rounded-lg
          bg-blue-600
          px-6
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