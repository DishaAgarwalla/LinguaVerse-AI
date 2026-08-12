import { FiFileText } from "react-icons/fi";
import {
  FaFilePdf,
  FaRobot,
  FaLanguage,
} from "react-icons/fa";
import DocumentCard from "../../components/document/DocumentCard";

const Documents = () => {
  return (
    <div className="space-y-8 animate-slideUp">

      {/* Header */}

      <div>

        <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-gradient-to-r from-red-100 to-rose-100 px-4 py-1.5 text-sm font-semibold text-red-600 dark:border-red-900 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300">

          <FiFileText className="h-4 w-4" />

          Document Translation

        </div>

        <h1 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-300 md:text-4xl">

          📄 AI Document Translator

        </h1>

        <p className="mt-2 max-w-2xl text-gray-500 dark:text-gray-400">

          Upload PDF or DOCX files, extract their contents, and translate
          them instantly with AI while preserving formatting whenever
          possible.

        </p>

        {/* Quick Stats */}

        <div className="mt-4 flex flex-wrap gap-4">

          <div className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2 dark:border-red-900 dark:bg-red-900/20">

            <FaFilePdf className="h-4 w-4 text-red-500" />

            <span className="text-sm font-medium text-red-700 dark:text-red-300">
              PDF & DOCX
            </span>

          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 dark:border-blue-900 dark:bg-blue-900/20">

            <FaRobot className="h-4 w-4 text-blue-500" />

            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI Translation
            </span>

          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-2 dark:border-green-900 dark:bg-green-900/20">

            <FaLanguage className="h-4 w-4 text-green-500" />

            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              100+ Languages
            </span>

          </div>

        </div>

      </div>

      {/* Document Card */}

      <DocumentCard />

    </div>
  );
};

export default Documents;