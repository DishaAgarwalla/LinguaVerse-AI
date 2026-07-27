import { useState } from "react";
import { FaFileAlt, FaSpinner, FaMagic, FaTrash } from "react-icons/fa";
import DocumentUploader from "./DocumentUploader";
import DocumentResult from "./DocumentResult";
import DocumentActions from "./DocumentActions";
import LanguageSelector from "../translate/LanguageSelector";
import { uploadDocument } from "../../services/documentService";

const DocumentCard = () => {
  const [file, setFile] = useState<File | null>(null);
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
      const response = await uploadDocument(file, language, token);

      setResult({
        extractedText: response.extractedText,
        translated: response.translated,
      });
    } catch (error) {
      console.error(error);
      alert("Document translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2.5 shadow-lg shadow-blue-500/20">
            <FaFileAlt className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Document Translator</h3>
            <p className="text-sm text-gray-500">Upload and translate PDF or DOCX files</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {result && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-lg"
            >
              <FaTrash className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          <DocumentUploader file={file} setFile={setFile} />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Target Language
            </label>
            <LanguageSelector
              value={language}
              onChange={setLanguage}
            />
          </div>

          <button
            onClick={translate}
            disabled={loading || !file}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <FaMagic className="w-4 h-4" />
                Translate Document
              </>
            )}
          </button>
        </div>

        {/* Right Column - Info */}
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 p-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Document Info</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className={`font-medium ${file ? 'text-green-600' : 'text-gray-400'}`}>
                {file ? '✓ File loaded' : 'No file selected'}
              </span>
            </div>
            {file && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">File Name</span>
                  <span className="font-medium text-gray-700 truncate max-w-[150px]">
                    {file.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">File Size</span>
                  <span className="font-medium text-gray-700">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-700 uppercase">
                    {file.name.split('.').pop()}
                  </span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Supported Formats</span>
              <span className="font-medium text-gray-700">PDF, DOCX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-center gap-3 text-blue-700">
            <FaSpinner className="w-5 h-5 animate-spin" />
            <span className="font-medium">Processing your document with AI...</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-progress"></div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="mt-6 animate-slideUp">
          <DocumentResult
            extractedText={result.extractedText}
            translated={result.translated}
          />
          <DocumentActions
            translated={result.translated}
            targetLang={language}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentCard;