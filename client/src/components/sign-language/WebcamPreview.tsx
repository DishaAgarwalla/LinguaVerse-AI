import type { RefObject } from "react";

interface WebcamPreviewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  isRunning: boolean;
}

const WebcamPreview = ({
  videoRef,
  isRunning,
}: WebcamPreviewProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <h2 className="mb-4 text-lg font-semibold">
        📷 Webcam Preview
      </h2>

      <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-black">

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
        />

        {!isRunning && (
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">

            <div>

              <div className="mb-2 text-5xl">
                📷
              </div>

              <p>
                Camera is currently off
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default WebcamPreview;