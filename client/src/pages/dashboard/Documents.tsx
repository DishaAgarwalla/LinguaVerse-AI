import { FiFileText } from "react-icons/fi";
import DocumentCard from "../../components/document/DocumentCard";

const Documents = () => {
  return (
    <div className="space-y-8 animate-slideUp">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-100 to-rose-100 px-4 py-1.5 text-sm font-semibold text-red-600 border border-red-200/50">
          <FiFileText className="w-4 h-4" />
          Document Translation
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Document Translator
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl">
          Upload PDF or DOCX files and translate them instantly using AI.
          Preserve original formatting while translating content.
        </p>
      </div>

      <DocumentCard />
    </div>
  );
};

export default Documents;