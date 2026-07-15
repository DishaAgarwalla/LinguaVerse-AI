interface Translation {
  id: string;
  sourceText: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  createdAt: string;
}

interface Props {
  item: Translation;
  onDelete: (id: string) => void;
}

const HistoryCard = ({
  item,
  onDelete,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow">

      <div className="mb-4 flex items-center justify-between">

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600">
          {item.sourceLang} → {item.targetLang}
        </span>

        <span className="text-sm text-gray-500">
          {new Date(item.createdAt).toLocaleString()}
        </span>

      </div>

      <div className="mb-5">

        <h3 className="mb-2 font-semibold">
          Original
        </h3>

        <p className="rounded-lg bg-gray-100 p-3">
          {item.sourceText}
        </p>

      </div>

      <div>

        <h3 className="mb-2 font-semibold text-blue-600">
          Translation
        </h3>

        <p className="rounded-lg bg-blue-50 p-3">
          {item.translated}
        </p>

      </div>

      <div className="mt-5">

        <button
          onClick={() => onDelete(item.id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
};

export default HistoryCard;