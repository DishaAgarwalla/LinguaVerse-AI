import cv2
import mediapipe as mp
import numpy as np
import joblib
import os

from collections import deque

from mediapipe.tasks import python
from mediapipe.tasks.python import vision


# ============================================================
# CONFIGURATION
# ============================================================

HAND_MODEL_PATH = "python/hand_landmarker.task"

CLASSIFIER_PATH = "python/sign_model.joblib"

SEQUENCE_LENGTH = 30

LANDMARKS_PER_FRAME = 21

VALUES_PER_LANDMARK = 3

EXPECTED_FEATURES = (
    SEQUENCE_LENGTH
    *
    LANDMARKS_PER_FRAME
    *
    VALUES_PER_LANDMARK
)


# ============================================================
# PREDICTION SETTINGS
# ============================================================

# We intentionally keep confidence lower here.
#
# The old values were too strict because the model was being
# given incorrectly formatted features.
#
# After normalization is fixed, we can evaluate the real
# probabilities.

MIN_CONFIDENCE = 0.55

MIN_MARGIN = 0.08


# ============================================================
# STABILIZATION
# ============================================================

HISTORY_LENGTH = 5

REQUIRED_MATCHES = 3


# ============================================================
# CHECK FILES
# ============================================================

if not os.path.exists(
    HAND_MODEL_PATH
):

    print()

    print(
        "ERROR: hand_landmarker.task not found."
    )

    print()

    exit()


if not os.path.exists(
    CLASSIFIER_PATH
):

    print()

    print(
        "ERROR: sign_model.joblib not found."
    )

    print()

    exit()


# ============================================================
# HEADER
# ============================================================

print()

print(
    "========================================"
)

print(
    " LinguaVerse AI"
)

print(
    " Sign Language Prediction"
)

print(
    "========================================"
)

print()


# ============================================================
# LOAD MODEL
# ============================================================

print(
    "Loading trained model..."
)

model = joblib.load(
    CLASSIFIER_PATH
)

print(
    "Model loaded successfully."
)

print()


# ============================================================
# MODEL FEATURE CHECK
# ============================================================

print(
    f"Expected model features: "
    f"{EXPECTED_FEATURES}"
)

print(
    f"Model expects: "
    f"{model.n_features_in_}"
)

print()


if model.n_features_in_ != EXPECTED_FEATURES:

    print(
        "ERROR: Model feature size does not match "
        "the prediction configuration."
    )

    print()

    print(
        f"Expected: {EXPECTED_FEATURES}"
    )

    print(
        f"Model: {model.n_features_in_}"
    )

    print()

    exit()


# ============================================================
# MEDIAPIPE
# ============================================================

base_options = python.BaseOptions(
    model_asset_path=HAND_MODEL_PATH
)


options = vision.HandLandmarkerOptions(

    base_options=base_options,

    running_mode=vision.RunningMode.VIDEO,

    num_hands=1,

    min_hand_detection_confidence=0.5,

    min_hand_presence_confidence=0.5,

    min_tracking_confidence=0.5,
)


detector = (
    vision.HandLandmarker
    .create_from_options(
        options
    )
)


# ============================================================
# EXTRACT LANDMARKS
# ============================================================

def extract_landmarks(
    hand_landmarks
):

    features = []

    for landmark in hand_landmarks:

        features.append(
            landmark.x
        )

        features.append(
            landmark.y
        )

        features.append(
            landmark.z
        )

    return features


# ============================================================
# NORMALIZE SEQUENCE
#
# IMPORTANT:
#
# This MUST be identical to the normalization used during
# training.
# ============================================================

def normalize_sequence(
    sequence
):

    sequence = np.array(
        sequence,
        dtype=np.float32
    )


    # --------------------------------------------------------
    # Shape:
    #
    # 30 × 21 × 3
    # --------------------------------------------------------

    sequence = sequence.reshape(
        SEQUENCE_LENGTH,
        LANDMARKS_PER_FRAME,
        VALUES_PER_LANDMARK
    )


    # ========================================================
    # WRIST AS ORIGIN
    # ========================================================

    wrist = sequence[:, 0, :].copy()

    sequence = (
        sequence
        -
        wrist[:, None, :]
    )


    # ========================================================
    # SCALE NORMALIZATION
    # ========================================================

    distances = np.linalg.norm(
        sequence,
        axis=2
    )


    max_distance = np.max(
        distances
    )


    if max_distance > 0:

        sequence = (
            sequence
            /
            max_distance
        )


    # ========================================================
    # FLATTEN
    # ========================================================

    return sequence.flatten()


# ============================================================
# DRAW LANDMARKS
# ============================================================

def draw_landmarks(
    frame,
    hand
):

    height, width, _ = frame.shape

    points = []


    for landmark in hand:

        x = int(
            landmark.x
            *
            width
        )

        y = int(
            landmark.y
            *
            height
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
# WEBCAM
# ============================================================

cap = cv2.VideoCapture(
    0
)


if not cap.isOpened():

    print(
        "ERROR: Unable to access webcam."
    )

    detector.close()

    exit()


print(
    "Webcam started."
)

print()

print(
    "Available gestures:"
)

print(
    "  HELLO"
)

print(
    "  THANK_YOU"
)

print(
    "  PLEASE"
)

print()

print(
    "Press Q to quit."
)

print()


# ============================================================
# SEQUENCE BUFFER
# ============================================================

sequence = deque(
    maxlen=SEQUENCE_LENGTH
)


# ============================================================
# PREDICTION HISTORY
# ============================================================

prediction_history = deque(
    maxlen=HISTORY_LENGTH
)


# ============================================================
# VARIABLES
# ============================================================

timestamp = 0

stable_prediction = (
    "Waiting..."
)

stable_confidence = 0.0

raw_prediction = (
    "Waiting..."
)

raw_confidence = 0.0

top_prediction = ""

second_prediction = ""

top_probability = 0.0

second_probability = 0.0

prediction_margin = 0.0


# ============================================================
# RESET PREDICTIONS
# ============================================================

def reset_predictions():

    global stable_prediction
    global stable_confidence

    global raw_prediction
    global raw_confidence

    global top_prediction
    global second_prediction

    global top_probability
    global second_probability

    global prediction_margin


    stable_prediction = (
        "Waiting..."
    )

    stable_confidence = 0.0

    raw_prediction = (
        "Waiting..."
    )

    raw_confidence = 0.0

    top_prediction = ""

    second_prediction = ""

    top_probability = 0.0

    second_probability = 0.0

    prediction_margin = 0.0


# ============================================================
# MAIN LOOP
# ============================================================

while True:

    success, frame = cap.read()


    if not success:

        print(
            "ERROR: Unable to read webcam."
        )

        break


    # ========================================================
    # MIRROR
    # ========================================================

    frame = cv2.flip(
        frame,
        1
    )


    # ========================================================
    # RGB
    # ========================================================

    rgb_frame = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )


    # ========================================================
    # MEDIAPIPE IMAGE
    # ========================================================

    mp_image = mp.Image(

        image_format=
        mp.ImageFormat.SRGB,

        data=rgb_frame
    )


    # ========================================================
    # TIMESTAMP
    # ========================================================

    timestamp += 33


    # ========================================================
    # DETECT HAND
    # ========================================================

    results = (
        detector.detect_for_video(
            mp_image,
            timestamp
        )
    )


    # ========================================================
    # HAND DETECTED
    # ========================================================

    if results.hand_landmarks:

        hand = (
            results.hand_landmarks[0]
        )


        # ----------------------------------------------------
        # DRAW
        # ----------------------------------------------------

        draw_landmarks(
            frame,
            hand
        )


        # ----------------------------------------------------
        # EXTRACT 63 VALUES
        # ----------------------------------------------------

        features = extract_landmarks(
            hand
        )


        # ----------------------------------------------------
        # ADD FRAME
        # ----------------------------------------------------

        sequence.append(
            features
        )


        sequence_count = len(
            sequence
        )


        # ====================================================
        # FULL SEQUENCE
        # ====================================================

        if (
            sequence_count
            ==
            SEQUENCE_LENGTH
        ):

            # ------------------------------------------------
            # NORMALIZE
            #
            # THIS IS THE CRITICAL FIX
            # ------------------------------------------------

            normalized_features = (
                normalize_sequence(
                    sequence
                )
            )


            # ------------------------------------------------
            # SAFETY CHECK
            # ------------------------------------------------

            if (
                len(normalized_features)
                !=
                model.n_features_in_
            ):

                print()

                print(
                    "ERROR: Feature mismatch."
                )

                print(
                    "Generated:",
                    len(normalized_features)
                )

                print(
                    "Expected:",
                    model.n_features_in_
                )

                break


            # ------------------------------------------------
            # MODEL INPUT
            # ------------------------------------------------

            sequence_features = (
                normalized_features
                .reshape(
                    1,
                    -1
                )
            )


            # =================================================
            # PREDICT PROBABILITIES
            # =================================================

            probabilities = (
                model.predict_proba(
                    sequence_features
                )[0]
            )


            # =================================================
            # SORT PROBABILITIES
            # =================================================

            sorted_indices = (
                np.argsort(
                    probabilities
                )[::-1]
            )


            best_index = (
                sorted_indices[0]
            )

            second_index = (
                sorted_indices[1]
            )


            # =================================================
            # BEST PREDICTION
            # =================================================

            prediction = str(
                model.classes_[
                    best_index
                ]
            )


            confidence = float(
                probabilities[
                    best_index
                ]
            )


            # =================================================
            # SECOND PREDICTION
            # =================================================

            second_class = str(
                model.classes_[
                    second_index
                ]
            )


            second_confidence = float(
                probabilities[
                    second_index
                ]
            )


            # =================================================
            # MARGIN
            # =================================================

            margin = (
                confidence
                -
                second_confidence
            )


            # =================================================
            # DISPLAY VALUES
            # =================================================

            raw_prediction = (
                prediction
            )

            raw_confidence = (
                confidence * 100
            )

            top_prediction = (
                prediction
            )

            second_prediction = (
                second_class
            )

            top_probability = (
                confidence
            )

            second_probability = (
                second_confidence
            )

            prediction_margin = (
                margin
            )


            # =================================================
            # TERMINAL OUTPUT
            # =================================================

            print()

            print(
                "----------------------------------------"
            )

            print(
                "Prediction:"
            )


            for class_name, probability in zip(
                model.classes_,
                probabilities
            ):

                print(
                    f"  {class_name}: "
                    f"{probability * 100:.1f}%"
                )


            print(
                f"Best: "
                f"{prediction} "
                f"({confidence * 100:.1f}%)"
            )


            print(
                f"Margin: "
                f"{margin * 100:.1f}%"
            )


            # =================================================
            # QUALITY CHECK
            # =================================================

            prediction_is_good = (

                confidence
                >=
                MIN_CONFIDENCE

                and

                margin
                >=
                MIN_MARGIN
            )


            # =================================================
            # STABILIZATION
            # =================================================

            if prediction_is_good:

                prediction_history.append(
                    prediction
                )


                # ------------------------------------------------
                # COUNT RECENT PREDICTIONS
                # ------------------------------------------------

                counts = {}


                for item in prediction_history:

                    counts[item] = (
                        counts.get(
                            item,
                            0
                        )
                        +
                        1
                    )


                most_common = max(
                    counts,
                    key=counts.get
                )


                most_common_count = (
                    counts[
                        most_common
                    ]
                )


                # ------------------------------------------------
                # ACCEPT STABLE PREDICTION
                # ------------------------------------------------

                if (
                    most_common_count
                    >=
                    REQUIRED_MATCHES
                ):

                    stable_prediction = (
                        most_common
                    )

                    stable_confidence = (
                        confidence * 100
                    )


            else:

                # ------------------------------------------------
                # Weak prediction
                # ------------------------------------------------

                if (
                    len(
                        prediction_history
                    )
                    ==
                    0
                ):

                    stable_prediction = (
                        "Uncertain"
                    )

                    stable_confidence = (
                        confidence * 100
                    )


            # =================================================
            # SLIDE WINDOW
            # =================================================

            sequence.popleft()


        else:

            raw_prediction = (
                "Collecting..."
            )

            raw_confidence = 0.0


    # ========================================================
    # NO HAND
    # ========================================================

    else:

        sequence.clear()

        prediction_history.clear()

        reset_predictions()


    # ========================================================
    # INFORMATION PANEL
    # ========================================================

    cv2.rectangle(
        frame,

        (10, 10),

        (610, 295),

        (0, 0, 0),

        -1
    )


    # ========================================================
    # GESTURE COLOR
    # ========================================================

    if (
        stable_prediction
        ==
        "HELLO"
    ):

        gesture_color = (
            0,
            255,
            255
        )

    elif (
        stable_prediction
        ==
        "THANK_YOU"
    ):

        gesture_color = (
            255,
            200,
            0
        )

    elif (
        stable_prediction
        ==
        "PLEASE"
    ):

        gesture_color = (
            0,
            255,
            0
        )

    else:

        gesture_color = (
            255,
            255,
            255
        )


    # ========================================================
    # FINAL GESTURE
    # ========================================================

    cv2.putText(

        frame,

        f"Gesture: "
        f"{stable_prediction}",

        (25, 50),

        cv2.FONT_HERSHEY_SIMPLEX,

        0.85,

        gesture_color,

        2
    )


    # ========================================================
    # CONFIDENCE
    # ========================================================

    cv2.putText(

        frame,

        f"Confidence: "
        f"{stable_confidence:.1f}%",

        (25, 82),

        cv2.FONT_HERSHEY_SIMPLEX,

        0.65,

        (0, 255, 0),

        2
    )


    # ========================================================
    # FRAMES
    # ========================================================

    cv2.putText(

        frame,

        f"Frames: "
        f"{len(sequence)}/"
        f"{SEQUENCE_LENGTH}",

        (25, 112),

        cv2.FONT_HERSHEY_SIMPLEX,

        0.65,

        (255, 255, 255),

        2
    )


    # ========================================================
    # RAW
    # ========================================================

    cv2.putText(

        frame,

        f"Raw: "
        f"{raw_prediction}",

        (25, 142),

        cv2.FONT_HERSHEY_SIMPLEX,

        0.6,

        (200, 200, 200),

        2
    )


    # ========================================================
    # BEST / SECOND / MARGIN
    # ========================================================

    if top_prediction:

        cv2.putText(

            frame,

            f"Best: "
            f"{top_prediction} "
            f"{top_probability * 100:.1f}%",

            (25, 172),

            cv2.FONT_HERSHEY_SIMPLEX,

            0.55,

            (255, 255, 255),

            2
        )


        cv2.putText(

            frame,

            f"2nd: "
            f"{second_prediction} "
            f"{second_probability * 100:.1f}%",

            (25, 200),

            cv2.FONT_HERSHEY_SIMPLEX,

            0.55,

            (200, 200, 200),

            2
        )


        cv2.putText(

            frame,

            f"Margin: "
            f"{prediction_margin * 100:.1f}%",

            (25, 228),

            cv2.FONT_HERSHEY_SIMPLEX,

            0.55,

            (200, 200, 200),

            2
        )


    # ========================================================
    # STATUS
    # ========================================================

    if (
        len(sequence)
        <
        SEQUENCE_LENGTH
    ):

        status = (
            "Collecting movement..."
        )

    elif (
        top_probability
        <
        MIN_CONFIDENCE
    ):

        status = (
            "Low confidence"
        )

    elif (
        prediction_margin
        <
        MIN_MARGIN
    ):

        status = (
            "Prediction too close"
        )

    else:

        status = (
            "Prediction accepted"
        )


    cv2.putText(

        frame,

        status,

        (25, 260),

        cv2.FONT_HERSHEY_SIMPLEX,

        0.55,

        (0, 255, 255),

        2
    )


    # ========================================================
    # INSTRUCTION
    # ========================================================

    cv2.putText(

        frame,

        "Q = QUIT",

        (25, 285),

        cv2.FONT_HERSHEY_SIMPLEX,

        0.5,

        (255, 255, 255),

        1
    )


    # ========================================================
    # SHOW
    # ========================================================

    cv2.imshow(

        "LinguaVerse AI - Sign Language",

        frame
    )


    # ========================================================
    # KEYBOARD
    # ========================================================

    key = (
        cv2.waitKey(1)
        &
        0xFF
    )


    if key == ord("q"):

        break


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

print(
    "========================================"
)

print(
    " Prediction stopped"
)

print(
    "========================================"
)

print()