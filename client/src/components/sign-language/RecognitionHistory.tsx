interface HistoryItem {
  gesture: string;
  translation: string;
  confidence: number;
  time: string;
}

interface RecognitionHistoryProps {
  history: HistoryItem[];
}

const RecognitionHistory = ({
  history,
}: RecognitionHistoryProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <h2 className="mb-5 text-lg font-semibold">
        🕒 Recognition History
      </h2>

      {history.length === 0 ? (
        <div className="rounded-lg bg-gray-100 p-5 text-center text-gray-500">
          No recognition history yet.
        </div>
      ) : (
        <div className="space-y-4">

          {history.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">

                <h3 className="font-semibold">
                  {item.gesture}
                </h3>

                <span className="text-sm text-gray-500">
                  {item.time}
                </span>

              </div>

              <p className="mt-2">
                {item.translation}
              </p>

              <p className="mt-2 text-sm text-green-600">
                Confidence: {item.confidence}%
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default RecognitionHistory;