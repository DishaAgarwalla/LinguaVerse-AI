import HistoryCard from "./HistoryCard";

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

const HistoryList = ({
  history,
  onDelete,
}: Props) => {

  if (history.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">

        <h2 className="text-xl font-semibold">
          No translations yet
        </h2>

        <p className="mt-3 text-gray-500">
          Translate something to see it here.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {history.map((item) => (
        <HistoryCard
          key={item.id}
          item={item}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
};

export default HistoryList;