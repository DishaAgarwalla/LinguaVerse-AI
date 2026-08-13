import { useEffect, useState } from "react";
import { FiClock, FiTrash2, FiSearch } from "react-icons/fi";

import {
  getHistory,
  deleteHistory,
  clearHistory,
} from "../../services/historyService";

import HistoryList from "../../components/history/HistoryList";

interface Translation {
  id: string;
  sourceText: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  createdAt: string;
}

const History = () => {
  const [history, setHistory] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this translation?");
    if (!ok) return;

    await deleteHistory(id);
    loadHistory();
  };

  const handleClear = async () => {
    const ok = window.confirm("Clear entire history?");
    if (!ok) return;

    await clearHistory();
    loadHistory();
  };

  const filteredHistory = history.filter(
    (item) =>
      item.sourceText
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.translated
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400"></div>

          <p className="mt-4 text-gray-500 dark:text-slate-400">
            Loading history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slideUp">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/50 bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-1.5 text-sm font-semibold text-pink-600 dark:border-pink-500/20 dark:from-pink-500/20 dark:to-rose-500/20 dark:text-pink-300">
            <FiClock className="h-4 w-4" />
            History
          </div>

          <h1 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-slate-300 md:text-4xl">
            Translation History
          </h1>

          <p className="mt-2 text-gray-500 dark:text-slate-400">
            {history.length} translations saved
          </p>

        </div>

        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 px-5 py-2.5 font-semibold text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/25 dark:bg-red-500/20 dark:text-red-300"
          >
            <FiTrash2 className="h-4 w-4" />
            Clear All
          </button>
        )}

      </div>

      {/* Search */}

      {history.length > 0 && (
        <div className="relative">

          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
            <FiSearch className="h-4 w-4" />
          </div>

          <input
            type="text"
            placeholder="Search translations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-10 pr-4 text-gray-700 outline-none backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400"
          />

        </div>
      )}

      <HistoryList
        history={filteredHistory}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default History;