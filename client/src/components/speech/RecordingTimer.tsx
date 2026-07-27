import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

interface Props {
  recording: boolean;
}

const RecordingTimer = ({ recording }: Props) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (recording) {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recording]);

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 border border-red-200">
      <FaClock className="w-4 h-4 text-red-500" />
      <span className="text-lg font-bold text-red-600 tabular-nums">
        {String(minutes).padStart(2, "0")}:{String(remaining).padStart(2, "0")}
      </span>
    </div>
  );
};

export default RecordingTimer;