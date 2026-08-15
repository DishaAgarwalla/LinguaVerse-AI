import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const SEQUENCE_LENGTH = 30;

export default function useWebcam() {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const [isRunning, setIsRunning] =
    useState(false);

  const [isCollecting, setIsCollecting] =
    useState(false);

  const [collectedFrames, setCollectedFrames] =
    useState(0);

  // ============================================================
  // START CAMERA
  // ============================================================

  const startCamera = useCallback(
    async () => {
      try {
        // Avoid opening multiple camera streams
        if (streamRef.current) {
          return;
        }

        const media =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user",
            },
            audio: false,
          });

        streamRef.current = media;

        if (videoRef.current) {
          videoRef.current.srcObject =
            media;

          await videoRef.current.play();
        }

        setIsRunning(true);
      } catch (error) {
        console.error(
          "Unable to access webcam:",
          error
        );

        setIsRunning(false);
      }
    },
    []
  );

  // ============================================================
  // STOP CAMERA
  // ============================================================

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject =
        null;
    }

    setIsRunning(false);
    setIsCollecting(false);
    setCollectedFrames(0);
  }, []);

  // ============================================================
  // CAPTURE SINGLE FRAME
  // ============================================================

  const captureFrame =
    useCallback((): string | null => {
      const video =
        videoRef.current;

      if (!video) {
        return null;
      }

      if (
        video.readyState <
        HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        return null;
      }

      if (
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        return null;
      }

      const canvas =
        document.createElement(
          "canvas"
        );

      canvas.width =
        video.videoWidth;

      canvas.height =
        video.videoHeight;

      const context =
        canvas.getContext("2d");

      if (!context) {
        return null;
      }

      context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      return canvas.toDataURL(
        "image/jpeg",
        0.85
      );
    }, []);

  // ============================================================
  // COLLECT 30 FRAMES
  // ============================================================

  const collectFrames =
    useCallback(async (): Promise<
      string[]
    > => {
      if (!isRunning) {
        console.warn(
          "Camera is not running."
        );

        return [];
      }

      if (isCollecting) {
        console.warn(
          "Already collecting frames."
        );

        return [];
      }

      setIsCollecting(true);
      setCollectedFrames(0);

      const frames: string[] = [];

      /*
       * We collect 30 frames at approximately
       * 10 frames per second.
       *
       * 30 frames ≈ 3 seconds.
       */

      for (
        let i = 0;
        i < SEQUENCE_LENGTH;
        i++
      ) {
        const frame =
          captureFrame();

        if (frame) {
          frames.push(frame);

          setCollectedFrames(
            frames.length
          );
        }

        /*
         * Wait approximately 100 ms
         * before collecting the next frame.
         */
        await new Promise<void>(
          (resolve) => {
            window.setTimeout(
              resolve,
              100
            );
          }
        );
      }

      setIsCollecting(false);

      /*
       * The backend requires exactly
       * 30 frames.
       */
      if (
        frames.length !==
        SEQUENCE_LENGTH
      ) {
        console.error(
          `Expected ${SEQUENCE_LENGTH} frames, received ${frames.length}.`
        );

        return [];
      }

      return frames;
    }, [
      isRunning,
      isCollecting,
      captureFrame,
    ]);

  // ============================================================
  // CLEANUP
  // ============================================================

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });

        streamRef.current = null;
      }
    };
  }, []);

  // ============================================================
  // RETURN
  // ============================================================

  return {
    videoRef,

    isRunning,

    isCollecting,

    collectedFrames,

    startCamera,

    stopCamera,

    captureFrame,

    collectFrames,
  };
}