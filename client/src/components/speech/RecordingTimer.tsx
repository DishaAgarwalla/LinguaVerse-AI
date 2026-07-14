import { useEffect, useState } from "react";

interface Props {
  recording: boolean;
}

const RecordingTimer = ({
  recording,
}: Props) => {
  const [seconds, setSeconds] =
    useState(0);

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
    <div className="text-center text-lg font-semibold text-red-600">

      {String(minutes).padStart(2, "0")}:
      {String(remaining).padStart(2, "0")}

    </div>
  );
};

export default RecordingTimer;