import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const SEQUENCE_LENGTH = 30;

const FRAME_INTERVAL = 100;

export default function useWebcam() {
  // ============================================================
  // VIDEO
  // ============================================================

  const videoRef =
    useRef<HTMLVideoElement>(null);

  // ============================================================
  // STREAM
  // ============================================================

  const [stream, setStream] =
    useState<MediaStream | null>(null);

  const [isRunning, setIsRunning] =
    useState(false);

  // ============================================================
  // FRAME COLLECTION
  // ============================================================

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
        // --------------------------------------------------------
        // Prevent starting twice
        // --------------------------------------------------------

        if (stream) {
          return;
        }

        // --------------------------------------------------------
        // Request webcam
        // --------------------------------------------------------

        const media =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user",
            },
            audio: false,
          });

        // --------------------------------------------------------
        // Attach stream
        // --------------------------------------------------------

        if (videoRef.current) {
          videoRef.current.srcObject =
            media;

          await videoRef.current.play();
        }

        setStream(media);

        setIsRunning(true);

      } catch (error) {
        console.error(
          "Unable to access webcam:",
          error
        );
      }
    },
    [stream]
  );

  // ============================================================
  // STOP CAMERA
  // ============================================================

  const stopCamera = useCallback(() => {
    // --------------------------------------------------------
    // Stop all tracks
    // --------------------------------------------------------

    if (stream) {
      stream
        .getTracks()
        .forEach((track) => {
          track.stop();
        });
    }

    // --------------------------------------------------------
    // Clear video
    // --------------------------------------------------------

    if (videoRef.current) {
      videoRef.current.srcObject =
        null;
    }

    // --------------------------------------------------------
    // Reset state
    // --------------------------------------------------------

    setStream(null);

    setIsRunning(false);

    setIsCollecting(false);

    setCollectedFrames(0);

  }, [stream]);

  // ============================================================
  // CAPTURE SINGLE FRAME
  // ============================================================

  const captureFrame =
    useCallback((): string | null => {

      const video =
        videoRef.current;

      // --------------------------------------------------------
      // Make sure video exists
      // --------------------------------------------------------

      if (!video) {
        return null;
      }

      // --------------------------------------------------------
      // Make sure video has dimensions
      // --------------------------------------------------------

      if (
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        return null;
      }

      // --------------------------------------------------------
      // Create canvas
      // --------------------------------------------------------

      const canvas =
        document.createElement(
          "canvas"
        );

      canvas.width =
        video.videoWidth;

      canvas.height =
        video.videoHeight;

      // --------------------------------------------------------
      // Canvas context
      // --------------------------------------------------------

      const context =
        canvas.getContext("2d");

      if (!context) {
        return null;
      }

      // --------------------------------------------------------
      // Draw current video frame
      // --------------------------------------------------------

      context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // --------------------------------------------------------
      // Convert to JPEG
      //
      // JPEG keeps the request size much
      // smaller than PNG.
      // --------------------------------------------------------

      return canvas.toDataURL(
        "image/jpeg",
        0.75
      );

    }, []);

  // ============================================================
  // COLLECT 30 FRAMES
  // ============================================================

  const collectFrames =
    useCallback(async (): Promise<string[]> => {

      // --------------------------------------------------------
      // Camera check
      // --------------------------------------------------------

      if (!isRunning) {

        console.warn(
          "Camera is not running."
        );

        return [];
      }

      // --------------------------------------------------------
      // Prevent duplicate collection
      // --------------------------------------------------------

      if (isCollecting) {

        console.warn(
          "Frame collection already running."
        );

        return [];
      }

      // --------------------------------------------------------
      // Start collection
      // --------------------------------------------------------

      setIsCollecting(true);

      setCollectedFrames(0);

      const frames: string[] = [];

      try {

        // ======================================================
        // COLLECT EXACTLY 30 FRAMES
        // ======================================================

        for (
          let i = 0;
          i < SEQUENCE_LENGTH;
          i++
        ) {

          // ----------------------------------------------------
          // Capture frame
          // ----------------------------------------------------

          const frame =
            captureFrame();

          // ----------------------------------------------------
          // Validate frame
          // ----------------------------------------------------

          if (!frame) {

            console.warn(
              `Unable to capture frame ${i + 1}.`
            );

            continue;
          }

          // ----------------------------------------------------
          // Store frame
          // ----------------------------------------------------

          frames.push(frame);

          // ----------------------------------------------------
          // Update UI
          // ----------------------------------------------------

          setCollectedFrames(
            frames.length
          );

          // ----------------------------------------------------
          // Wait before next frame
          // ----------------------------------------------------

          if (
            i <
            SEQUENCE_LENGTH - 1
          ) {

            await new Promise(
              (resolve) =>
                setTimeout(
                  resolve,
                  FRAME_INTERVAL
                )
            );
          }
        }

        // ======================================================
        // VALIDATION
        // ======================================================

        if (
          frames.length !==
          SEQUENCE_LENGTH
        ) {

          console.error(
            `Frame collection failed. Expected ${SEQUENCE_LENGTH}, received ${frames.length}.`
          );

          return [];
        }

        // --------------------------------------------------------
        // Success
        // --------------------------------------------------------

        console.log(
          `Successfully collected ${frames.length} frames.`
        );

        return frames;

      } finally {

        // --------------------------------------------------------
        // Reset collection state
        // --------------------------------------------------------

        setIsCollecting(false);

      }

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

      if (videoRef.current) {

        const currentStream =
          videoRef.current
            .srcObject as
            | MediaStream
            | null;

        currentStream
          ?.getTracks()
          .forEach(
            (track) =>
              track.stop()
          );

        videoRef.current.srcObject =
          null;
      }

    };

  }, []);

  // ============================================================
  // RETURN
  // ============================================================

  return {
    videoRef,

    stream,

    isRunning,

    isCollecting,

    collectedFrames,

    startCamera,

    stopCamera,

    captureFrame,

    collectFrames,
  };
}