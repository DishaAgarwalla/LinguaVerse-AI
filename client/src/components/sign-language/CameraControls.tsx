interface CameraControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onCapture: () => void;
}

const CameraControls = ({
  isRunning,
  onStart,
  onStop,
  onCapture,
}: CameraControlsProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <h2 className="mb-4 text-lg font-semibold">
        🎥 Camera Controls
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={onStart}
          disabled={isRunning}
          className="rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          ▶ Start Camera
        </button>

        <button
          onClick={onStop}
          disabled={!isRunning}
          className="rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          ■ Stop Camera
        </button>

        <button
          onClick={onCapture}
          disabled={!isRunning}
          className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          📸 Capture
        </button>

        <button
          onClick={() =>
            window.location.reload()
          }
          className="rounded-lg bg-gray-700 px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          🔄 Reset
        </button>

      </div>

    </div>
  );
};

export default CameraControls;