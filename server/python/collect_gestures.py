import cv2
import mediapipe as mp
import csv
import os
import time
import math

from mediapipe.tasks import python
from mediapipe.tasks.python import vision


# ============================================================
# CONFIGURATION
# ============================================================

MODEL_PATH = "python/hand_landmarker.task"

DATASET_DIR = "python/dataset"

GESTURES = [
    "HELLO",
    "THANK_YOU",
    "PLEASE",
]

SEQUENCES_PER_GESTURE = 30

FRAMES_PER_SEQUENCE = 30

# Minimum percentage of frames that must pass posture validation
MIN_POSTURE_RATIO = 0.85

# Minimum movement required for movement gestures
MIN_MOVEMENT = 0.035

# Camera
CAMERA_INDEX = 0


# ============================================================
# CREATE DATASET DIRECTORY
# ============================================================

os.makedirs(
    DATASET_DIR,
    exist_ok=True
)


# ============================================================
# MEDIAPIPE
# ============================================================

base_options = python.BaseOptions(
    model_asset_path=MODEL_PATH
)

options = vision.HandLandmarkerOptions(
    base_options=base_options,
    running_mode=vision.RunningMode.VIDEO,
    num_hands=1,
    min_hand_detection_confidence=0.65,
    min_hand_presence_confidence=0.65,
    min_tracking_confidence=0.65,
)

detector = vision.HandLandmarker.create_from_options(
    options
)


# ============================================================
# LANDMARK EXTRACTION
# ============================================================

def extract_landmarks(hand_landmarks):

    features = []

    for landmark in hand_landmarks:

        features.append(landmark.x)
        features.append(landmark.y)
        features.append(landmark.z)

    return features


# ============================================================
# DISTANCE BETWEEN TWO LANDMARKS
# ============================================================

def distance(a, b):

    return math.sqrt(
        (a.x - b.x) ** 2
        +
        (a.y - b.y) ** 2
        +
        (a.z - b.z) ** 2
    )


# ============================================================
# CHECK FINGER EXTENSION
# ============================================================

def finger_extended(
    landmarks,
    tip,
    pip,
    mcp
):

    tip_distance = distance(
        landmarks[tip],
        landmarks[0]
    )

    pip_distance = distance(
        landmarks[pip],
        landmarks[0]
    )

    mcp_distance = distance(
        landmarks[mcp],
        landmarks[0]
    )

    return (
        tip_distance > pip_distance
        and
        pip_distance > mcp_distance
    )


# ============================================================
# POSTURE VALIDATION
# ============================================================

def validate_posture(
    hand_landmarks,
    gesture
):

    landmarks = hand_landmarks

    # --------------------------------------------------------
    # Finger states
    # --------------------------------------------------------

    index_extended = finger_extended(
        landmarks,
        8,
        6,
        5
    )

    middle_extended = finger_extended(
        landmarks,
        12,
        10,
        9
    )

    ring_extended = finger_extended(
        landmarks,
        16,
        14,
        13
    )

    little_extended = finger_extended(
        landmarks,
        20,
        18,
        17
    )

    extended_count = sum([
        index_extended,
        middle_extended,
        ring_extended,
        little_extended
    ])


    # ========================================================
    # HELLO
    # ========================================================

    if gesture == "HELLO":

        # HELLO requires an open palm.
        #
        # At least 4 fingers should appear extended.

        if extended_count >= 4:

            return True

        return False


    # ========================================================
    # THANK YOU
    # ========================================================

    elif gesture == "THANK_YOU":

        # THANK YOU generally uses an open hand.
        #
        # We require at least 3 extended fingers.
        #
        # This prevents a random fist or incomplete hand
        # from being accepted.

        if extended_count >= 3:

            return True

        return False


    # ========================================================
    # PLEASE
    # ========================================================

    elif gesture == "PLEASE":

        # PLEASE normally requires an open/relaxed hand.
        #
        # We require at least 3 extended fingers.

        if extended_count >= 3:

            return True

        return False


    return False


# ============================================================
# DRAW LANDMARKS
# ============================================================

def draw_landmarks(
    frame,
    hand_landmarks
):

    height, width, _ = frame.shape

    points = []

    for landmark in hand_landmarks:

        x = int(
            landmark.x * width
        )

        y = int(
            landmark.y * height
        )

        points.append(
            (x, y)
        )

        cv2.circle(
            frame,
            (x, y),
            4,
            (0, 255, 0),
            -1
        )


    connections = [

        # Thumb
        (0, 1),
        (1, 2),
        (2, 3),
        (3, 4),

        # Index
        (0, 5),
        (5, 6),
        (6, 7),
        (7, 8),

        # Middle
        (0, 9),
        (9, 10),
        (10, 11),
        (11, 12),

        # Ring
        (0, 13),
        (13, 14),
        (14, 15),
        (15, 16),

        # Little
        (0, 17),
        (17, 18),
        (18, 19),
        (19, 20),

        # Palm
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


# ============================================================
# GET PALM CENTER
# ============================================================

def get_palm_center(
    landmarks
):

    palm_points = [
        landmarks[0],
        landmarks[5],
        landmarks[9],
        landmarks[13],
        landmarks[17],
    ]

    x = sum(
        point.x
        for point in palm_points
    ) / len(palm_points)

    y = sum(
        point.y
        for point in palm_points
    ) / len(palm_points)

    return x, y


# ============================================================
# CALCULATE MOVEMENT
# ============================================================

def calculate_movement(
    sequence
):

    if len(sequence) < 2:

        return 0.0, 0.0


    first_x, first_y = get_palm_center(
        sequence[0]
    )

    last_x, last_y = get_palm_center(
        sequence[-1]
    )


    dx = last_x - first_x

    dy = last_y - first_y


    movement = math.sqrt(
        dx ** 2 +
        dy ** 2
    )


    return dx, dy


# ============================================================
# VALIDATE COMPLETE SEQUENCE
# ============================================================

def validate_sequence(
    sequence,
    gesture
):

    if len(sequence) != FRAMES_PER_SEQUENCE:

        return False, "Incomplete sequence"


    # --------------------------------------------------------
    # Check posture across frames
    # --------------------------------------------------------

    valid_posture_frames = 0


    for landmarks in sequence:

        if validate_posture(
            landmarks,
            gesture
        ):

            valid_posture_frames += 1


    posture_ratio = (
        valid_posture_frames
        /
        len(sequence)
    )


    if posture_ratio < MIN_POSTURE_RATIO:

        return False, (
            f"Posture invalid "
            f"({posture_ratio * 100:.0f}% valid)"
        )


    # ========================================================
    # MOVEMENT VALIDATION
    # ========================================================

    dx, dy = calculate_movement(
        sequence
    )

    movement = math.sqrt(
        dx ** 2 +
        dy ** 2
    )


    # --------------------------------------------------------
    # HELLO
    # --------------------------------------------------------

    if gesture == "HELLO":

        # We require some movement.
        #
        # A completely stationary open palm should NOT
        # automatically become HELLO.

        if movement < MIN_MOVEMENT:

            return False, (
                "Not enough movement for HELLO"
            )


    # --------------------------------------------------------
    # THANK YOU
    # --------------------------------------------------------

    elif gesture == "THANK_YOU":

        # THANK YOU:
        #
        # hand moves forward/downward.
        #
        # Camera coordinates:
        #
        # x increases -> right
        # y increases -> downward

        if movement < MIN_MOVEMENT:

            return False, (
                "Not enough movement for THANK YOU"
            )


        # Require downward movement.
        #
        # Allow a little variation.

        if dy < 0.015:

            return False, (
                "THANK YOU movement "
                "is not downward enough"
            )


    # --------------------------------------------------------
    # PLEASE
    # --------------------------------------------------------

    elif gesture == "PLEASE":

        # PLEASE needs noticeable movement.

        if movement < MIN_MOVEMENT:

            return False, (
                "Not enough movement for PLEASE"
            )


    return True, "Valid gesture"


# ============================================================
# CAMERA
# ============================================================

cap = cv2.VideoCapture(
    CAMERA_INDEX
)


if not cap.isOpened():

    print(
        "ERROR: Unable to access webcam."
    )

    detector.close()

    exit()


# ============================================================
# INFORMATION
# ============================================================

print()
print("========================================")
print(" LinguaVerse AI")
print(" Smart Gesture Dataset Collector")
print("========================================")
print()

print("Gestures:")

for index, gesture in enumerate(
    GESTURES,
    start=1
):

    print(
        f"{index}. {gesture}"
    )

print()

print(
    f"Sequences per gesture: "
    f"{SEQUENCES_PER_GESTURE}"
)

print(
    f"Frames per sequence: "
    f"{FRAMES_PER_SEQUENCE}"
)

print()

print("Controls:")
print("SPACE = Start recording")
print("R     = Retry current sequence")
print("Q     = Quit")
print()


# ============================================================
# TIMESTAMP
# ============================================================

timestamp = 0


# ============================================================
# GESTURE LOOP
# ============================================================

for gesture in GESTURES:

    print()
    print("----------------------------------------")

    print(
        f"Preparing gesture: {gesture}"
    )

    print("----------------------------------------")
    print()


    # ========================================================
    # INSTRUCTIONS
    # ========================================================

    if gesture == "HELLO":

        print(
            "HELLO:"
        )

        print(
            "Use an open palm."
        )

        print(
            "Perform a natural waving movement."
        )


    elif gesture == "THANK_YOU":

        print(
            "THANK YOU:"
        )

        print(
            "Start with your hand near your chin."
        )

        print(
            "Use the correct open-hand posture."
        )

        print(
            "Move your hand forward and slightly downward."
        )


    elif gesture == "PLEASE":

        print(
            "PLEASE:"
        )

        print(
            "Use the correct open-hand posture."
        )

        print(
            "Perform the complete PLEASE movement."
        )


    print()

    input(
        "Press ENTER to prepare this gesture..."
    )


    # ========================================================
    # DATASET FILE
    # ========================================================

    filename = os.path.join(
        DATASET_DIR,
        f"{gesture}.csv"
    )


    # WARNING
    print()

    print(
        f"Dataset will be written to:"
    )

    print(
        filename
    )

    print()


    # ========================================================
    # OPEN DATASET
    # ========================================================

    with open(
        filename,
        "w",
        newline=""
    ) as file:

        writer = csv.writer(
            file
        )


        # ====================================================
        # CSV HEADER
        # ====================================================

        header = [
            "gesture",
            "sequence",
            "frame"
        ]


        for i in range(21):

            header.append(
                f"x{i}"
            )

            header.append(
                f"y{i}"
            )

            header.append(
                f"z{i}"
            )


        writer.writerow(
            header
        )


        # ====================================================
        # SEQUENCE LOOP
        # ====================================================

        sequence_number = 0


        while (
            sequence_number
            < SEQUENCES_PER_GESTURE
        ):

            print()

            print(
                "----------------------------------------"
            )

            print(
                f"Sequence "
                f"{sequence_number + 1}/"
                f"{SEQUENCES_PER_GESTURE}"
            )

            print(
                "Press SPACE when you are actually "
                "performing the gesture."
            )

            print(
                "----------------------------------------"
            )


            # =================================================
            # WAIT FOR SPACE
            # =================================================

            recording_started = False


            while not recording_started:

                success, frame = cap.read()


                if not success:

                    continue


                frame = cv2.flip(
                    frame,
                    1
                )


                # ---------------------------------------------
                # Try detecting hand
                # ---------------------------------------------

                rgb_frame = cv2.cvtColor(
                    frame,
                    cv2.COLOR_BGR2RGB
                )


                mp_image = mp.Image(
                    image_format=
                    mp.ImageFormat.SRGB,
                    data=rgb_frame
                )


                timestamp += 33


                results = detector.detect_for_video(
                    mp_image,
                    timestamp
                )


                # ---------------------------------------------
                # Draw hand if detected
                # ---------------------------------------------

                if results.hand_landmarks:

                    hand = results.hand_landmarks[0]

                    draw_landmarks(
                        frame,
                        hand
                    )


                    posture_valid = validate_posture(
                        hand,
                        gesture
                    )

                else:

                    posture_valid = False


                # ---------------------------------------------
                # UI
                # ---------------------------------------------

                cv2.putText(
                    frame,
                    f"Gesture: {gesture}",
                    (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1,
                    (0, 255, 255),
                    2
                )


                if results.hand_landmarks:

                    if posture_valid:

                        posture_text = (
                            "POSTURE: VALID"
                        )

                        posture_color = (
                            0,
                            255,
                            0
                        )

                    else:

                        posture_text = (
                            "POSTURE: INVALID"
                        )

                        posture_color = (
                            0,
                            0,
                            255
                        )

                else:

                    posture_text = (
                        "HAND: NOT DETECTED"
                    )

                    posture_color = (
                        0,
                        0,
                        255
                    )


                cv2.putText(
                    frame,
                    posture_text,
                    (20, 85),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.8,
                    posture_color,
                    2
                )


                cv2.putText(
                    frame,
                    "SPACE = START",
                    (20, 130),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.8,
                    (255, 255, 255),
                    2
                )


                cv2.putText(
                    frame,
                    "Q = QUIT",
                    (20, 165),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (255, 255, 255),
                    2
                )


                cv2.imshow(
                    "LinguaVerse AI - Smart Collector",
                    frame
                )


                key = (
                    cv2.waitKey(1)
                    & 0xFF
                )


                # ---------------------------------------------
                # QUIT
                # ---------------------------------------------

                if key == ord("q"):

                    cap.release()

                    cv2.destroyAllWindows()

                    detector.close()

                    print(
                        "\nCollection stopped."
                    )

                    exit()


                # ---------------------------------------------
                # START
                # ---------------------------------------------

                if key == 32:

                    # Do NOT allow recording to start if
                    # posture is invalid.

                    if (
                        not results.hand_landmarks
                        or
                        not posture_valid
                    ):

                        print(
                            "Cannot start."
                        )

                        print(
                            "Make the correct hand posture first."
                        )

                        continue


                    recording_started = True


            # =================================================
            # RECORD SEQUENCE
            # =================================================

            sequence_data = []

            frame_number = 0

            valid_posture_frames = 0


            while (
                frame_number
                < FRAMES_PER_SEQUENCE
            ):

                success, frame = cap.read()


                if not success:

                    continue


                frame = cv2.flip(
                    frame,
                    1
                )


                rgb_frame = cv2.cvtColor(
                    frame,
                    cv2.COLOR_BGR2RGB
                )


                mp_image = mp.Image(
                    image_format=
                    mp.ImageFormat.SRGB,
                    data=rgb_frame
                )


                timestamp += 33


                results = detector.detect_for_video(
                    mp_image,
                    timestamp
                )


                # =================================================
                # HAND REQUIRED
                # =================================================

                if results.hand_landmarks:

                    hand = results.hand_landmarks[0]


                    posture_valid = validate_posture(
                        hand,
                        gesture
                    )


                    # ---------------------------------------------
                    # If posture invalid, immediately reject
                    # the sequence.
                    # ---------------------------------------------

                    if posture_valid:

                        valid_posture_frames += 1

                        sequence_data.append(
                            hand
                        )

                        frame_number += 1

                    else:

                        cv2.putText(
                            frame,
                            "INVALID POSTURE",
                            (20, 160),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.8,
                            (0, 0, 255),
                            2
                        )


                else:

                    cv2.putText(
                        frame,
                        "HAND LOST",
                        (20, 160),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.8,
                        (0, 0, 255),
                        2
                    )


                # =================================================
                # DRAW
                # =================================================

                if results.hand_landmarks:

                    draw_landmarks(
                        frame,
                        results.hand_landmarks[0]
                    )


                # =================================================
                # UI
                # =================================================

                cv2.putText(
                    frame,
                    f"Gesture: {gesture}",
                    (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1,
                    (0, 255, 255),
                    2
                )


                cv2.putText(
                    frame,
                    f"Sequence: "
                    f"{sequence_number + 1}/"
                    f"{SEQUENCES_PER_GESTURE}",
                    (20, 80),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (255, 255, 255),
                    2
                )


                cv2.putText(
                    frame,
                    f"Frames: "
                    f"{frame_number}/"
                    f"{FRAMES_PER_SEQUENCE}",
                    (20, 115),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (0, 255, 0),
                    2
                )


                if gesture == "THANK_YOU":

                    cv2.putText(
                        frame,
                        "CHIN -> FORWARD -> DOWN",
                        (20, 200),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.65,
                        (0, 255, 255),
                        2
                    )


                cv2.imshow(
                    "LinguaVerse AI - Smart Collector",
                    frame
                )


                # =================================================
                # KEYBOARD
                # =================================================

                key = (
                    cv2.waitKey(1)
                    & 0xFF
                )


                if key == ord("q"):

                    cap.release()

                    cv2.destroyAllWindows()

                    detector.close()

                    print(
                        "\nCollection stopped."
                    )

                    exit()


                # R = restart sequence

                if key == ord("r"):

                    print(
                        "\nSequence manually restarted."
                    )

                    sequence_data = []

                    frame_number = 0

                    break


            # =================================================
            # CHECK IF COMPLETE
            # =================================================

            if (
                len(sequence_data)
                != FRAMES_PER_SEQUENCE
            ):

                print(
                    "Sequence discarded."
                )

                continue


            # =================================================
            # FINAL VALIDATION
            # =================================================

            valid, reason = validate_sequence(
                sequence_data,
                gesture
            )


            if not valid:

                print(
                    f"Sequence rejected: {reason}"
                )

                continue


            # =================================================
            # SAVE
            # =================================================

            for frame_index, landmarks in enumerate(
                sequence_data
            ):

                features = extract_landmarks(
                    landmarks
                )


                writer.writerow(
                    [
                        gesture,
                        sequence_number,
                        frame_index
                    ]
                    +
                    features
                )


            sequence_number += 1


            print(
                f"✓ Sequence "
                f"{sequence_number}/"
                f"{SEQUENCES_PER_GESTURE}"
                f" accepted."
            )


            print(
                "  Correct posture + movement detected."
            )


    # ========================================================
    # GESTURE COMPLETED
    # ========================================================

    print()

    print(
        f"✓ {gesture} collection completed!"
    )

    print(
        f"Dataset saved to: {filename}"
    )


# ============================================================
# CLEANUP
# ============================================================

cap.release()

cv2.destroyAllWindows()

detector.close()


# ============================================================
# FINISHED
# ============================================================

print()

print("========================================")

print(
    " Dataset Collection Completed!"
)

print("========================================")

print()

print(
    f"Dataset saved inside: "
    f"{DATASET_DIR}"
)

print()

for gesture in GESTURES:

    print(
        f"✓ {gesture}.csv"
    )

print()