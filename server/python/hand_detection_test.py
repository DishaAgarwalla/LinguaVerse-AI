import cv2
import mediapipe as mp

from mediapipe.tasks import python
from mediapipe.tasks.python import vision


# ----------------------------------------
# MediaPipe Hand Landmarker
# ----------------------------------------

MODEL_PATH = "python/hand_landmarker.task"

base_options = python.BaseOptions(
    model_asset_path=MODEL_PATH
)

options = vision.HandLandmarkerOptions(
    base_options=base_options,
    running_mode=vision.RunningMode.VIDEO,
    num_hands=2,
    min_hand_detection_confidence=0.5,
    min_hand_presence_confidence=0.5,
    min_tracking_confidence=0.5,
)

detector = vision.HandLandmarker.create_from_options(
    options
)


# ----------------------------------------
# Open Webcam
# ----------------------------------------

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("ERROR: Unable to access webcam.")
    exit()

print("Webcam started.")
print("Show your hand to the camera.")
print("Press Q to quit.")


frame_timestamp = 0


while True:

    success, frame = cap.read()

    if not success:
        print("ERROR: Unable to read webcam frame.")
        break


    # Mirror camera
    frame = cv2.flip(frame, 1)


    # Convert OpenCV BGR → RGB
    rgb_frame = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )


    # Convert to MediaPipe image
    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )


    # Timestamp must increase
    frame_timestamp += 33


    # Detect hands
    results = detector.detect_for_video(
        mp_image,
        frame_timestamp
    )


    # ----------------------------------------
    # Draw landmarks
    # ----------------------------------------

    if results.hand_landmarks:

        for hand_landmarks in results.hand_landmarks:

            height, width, _ = frame.shape

            points = []

            for landmark in hand_landmarks:

                x = int(landmark.x * width)
                y = int(landmark.y * height)

                points.append((x, y))

                cv2.circle(
                    frame,
                    (x, y),
                    5,
                    (0, 255, 0),
                    -1
                )


            # Draw connections
            connections = [
                (0, 1),
                (1, 2),
                (2, 3),
                (3, 4),

                (0, 5),
                (5, 6),
                (6, 7),
                (7, 8),

                (0, 9),
                (9, 10),
                (10, 11),
                (11, 12),

                (0, 13),
                (13, 14),
                (14, 15),
                (15, 16),

                (0, 17),
                (17, 18),
                (18, 19),
                (19, 20),

                (5, 9),
                (9, 13),
                (13, 17),
            ]


            for start, end in connections:

                cv2.line(
                    frame,
                    points[start],
                    points[end],
                    (255, 0, 0),
                    2
                )


    # ----------------------------------------
    # Display
    # ----------------------------------------

    cv2.imshow(
        "LinguaVerse AI - Hand Detection",
        frame
    )


    # Press Q
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


# ----------------------------------------
# Cleanup
# ----------------------------------------

cap.release()
cv2.destroyAllWindows()
detector.close()

print("Webcam stopped.")