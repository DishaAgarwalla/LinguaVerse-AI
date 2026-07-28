import { FaHistory, FaSearch, FaTrash } from "react-icons/fa";
import HistoryCard from "./HistoryCard";
import { useState } from "react";

interface Translation {
  id: string;
  sourceText: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  createdAt: string;
}

interface Props {
  history: Translation[];
  onDelete: (id: string) => void;
}

const HistoryList = ({ history, onDelete }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter(item =>
    item.sourceText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.translated.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sourceLang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.targetLang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (history.length === 0) {
    return (
      <div className="rounded-3xl bg-white shadow-lg shadow-gray-100/50 border border-gray-100/50 p-12 text-center transition-all duration-300 hover:shadow-xl hover:border-blue-100">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-gradient-to-r from-gray-100 to-blue-50 p-6">
            <FaHistory className="w-12 h-12 text-gray-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-700">
              No translations yet
            </h2>
            <p className="mt-2 text-gray-500 max-w-sm">
              Start translating text, speech, or documents to see your history here.
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 border border-blue-100">
              💡 Translate text
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600 border border-purple-100">
              🎤 Speak to translate
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FaSearch className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search translations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm pl-10 pr-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredHistory.length} of {history.length} translations
        </p>
        {filteredHistory.length === 0 && searchTerm && (
          <p className="text-sm text-gray-400">No results found</p>
        )}
      </div>

      {/* History Cards */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <HistoryCard
            key={item.id}
            item={item}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryList;