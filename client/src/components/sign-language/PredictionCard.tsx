interface PredictionCardProps {
  label: string;
  confidence: number;
}

const PredictionCard = ({
  label,
  confidence,
}: PredictionCardProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <h2 className="mb-4 text-lg font-semibold">
        🤟 Live Prediction
      </h2>

      <div className="space-y-4">

        <div>

          <p className="text-sm text-gray-500">
            Detected Gesture
          </p>

          <h1 className="mt-2 text-3xl font-bold text-blue-600">
            {label}
          </h1>

        </div>

        <div>

          <p className="mb-2 text-sm text-gray-500">
            Confidence
          </p>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-green-500"
              style={{
                width: `${confidence}%`,
              }}
            />

          </div>

          <p className="mt-2 font-medium">
            {confidence}%
          </p>

        </div>

      </div>

    </div>
  );
};

export default PredictionCard;