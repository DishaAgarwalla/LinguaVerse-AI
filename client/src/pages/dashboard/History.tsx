import { useEffect, useState } from "react";

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
    const ok = window.confirm(
      "Delete this translation?"
    );

    if (!ok) return;

    await deleteHistory(id);

    loadHistory();
  };

  const handleClear = async () => {
    const ok = window.confirm(
      "Clear entire history?"
    );

    if (!ok) return;

    await clearHistory();

    loadHistory();
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-8">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Translation History
        </h1>

        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            🗑 Clear All
          </button>
        )}

      </div>

      <HistoryList
        history={history}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default History;