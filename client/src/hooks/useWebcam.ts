import { useEffect, useRef, useState } from "react";

export default function useWebcam() {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [stream, setStream] =
    useState<MediaStream | null>(null);

  const [isRunning, setIsRunning] =
    useState(false);

  const startCamera = async () => {
    try {
      const media =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      if (videoRef.current) {
        videoRef.current.srcObject = media;
      }

      setStream(media);
      setIsRunning(true);
    } catch (error) {
      console.error(
        "Unable to access webcam",
        error
      );
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) =>
      track.stop()
    );

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStream(null);
    setIsRunning(false);
  };

  const captureFrame = (): string | null => {
    if (!videoRef.current) return null;

    const canvas =
      document.createElement("canvas");

    canvas.width =
      videoRef.current.videoWidth;

    canvas.height =
      videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return canvas.toDataURL("image/png");
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    isRunning,
    startCamera,
    stopCamera,
    captureFrame,
  };
}