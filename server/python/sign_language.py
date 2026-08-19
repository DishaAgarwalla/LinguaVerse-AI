import sys
import json
import base64
import os

import cv2
import joblib
import mediapipe as mp
import numpy as np

from mediapipe.tasks import python
from mediapipe.tasks.python import vision


# ============================================================
# CONFIGURATION
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "sign_model.joblib"
)

HAND_MODEL_PATH = os.path.join(
    BASE_DIR,
    "hand_landmarker.task"
)

SEQUENCE_LENGTH = 30

LANDMARKS_PER_FRAME = 21

VALUES_PER_LANDMARK = 3

FEATURES_PER_FRAME = (
    LANDMARKS_PER_FRAME
    * VALUES_PER_LANDMARK
)

EXPECTED_FEATURES = (
    SEQUENCE_LENGTH
    * FEATURES_PER_FRAME
)


# ============================================================
# PREDICTION SETTINGS
# ============================================================

MIN_CONFIDENCE = 0.55

MIN_MARGIN = 0.08


# ============================================================
# HAND DETECTION SETTINGS
# ============================================================

MIN_HAND_DETECTION_CONFIDENCE = 0.35

MIN_HAND_PRESENCE_CONFIDENCE = 0.35

MIN_TRACKING_CONFIDENCE = 0.35


# ============================================================
# TRANSLATIONS
# ============================================================

TRANSLATIONS = {

    "HELLO": {
        "English": "Hello",
        "French": "Bonjour",
        "Spanish": "Hola",
        "Hindi": "नमस्ते",
    },

    "THANK_YOU": {
        "English": "Thank you",
        "French": "Merci",
        "Spanish": "Gracias",
        "Hindi": "धन्यवाद",
    },

    "PLEASE": {
        "English": "Please",
        "French": "S'il vous plaît",
        "Spanish": "Por favor",
        "Hindi": "कृपया",
    },
}


# ============================================================
# ERROR RESPONSE
# ============================================================

def error_response(message):

    return {
        "success": False,

        "message": message,

        "recognition": {
            "label": "Uncertain",
            "confidence": 0,
        },

        "translations": [],
    }


# ============================================================
# LOAD MODEL
# ============================================================

def load_model():

    if not os.path.exists(MODEL_PATH):

        raise FileNotFoundError(
            f"Model not found: {MODEL_PATH}"
        )

    model = joblib.load(
        MODEL_PATH
    )

    if not hasattr(
        model,
        "n_features_in_"
    ):

        raise ValueError(
            "Loaded model does not expose "
            "n_features_in_."
        )

    if (
        model.n_features_in_
        != EXPECTED_FEATURES
    ):

        raise ValueError(
            "Model feature count mismatch. "
            f"Expected {EXPECTED_FEATURES}, "
            f"got {model.n_features_in_}."
        )

    return model


# ============================================================
# CREATE MEDIAPIPE HAND DETECTOR
# ============================================================

def create_detector():

    if not os.path.exists(
        HAND_MODEL_PATH
    ):

        raise FileNotFoundError(
            f"Hand model not found: "
            f"{HAND_MODEL_PATH}"
        )

    base_options = (
        python.BaseOptions(
            model_asset_path=
            HAND_MODEL_PATH
        )
    )

    options = (
        vision.HandLandmarkerOptions(

            base_options=base_options,

            running_mode=
            vision.RunningMode.VIDEO,

            num_hands=1,

            min_hand_detection_confidence=
            MIN_HAND_DETECTION_CONFIDENCE,

            min_hand_presence_confidence=
            MIN_HAND_PRESENCE_CONFIDENCE,

            min_tracking_confidence=
            MIN_TRACKING_CONFIDENCE,
        )
    )

    detector = (
        vision.HandLandmarker
        .create_from_options(
            options
        )
    )

    return detector


# ============================================================
# DECODE BASE64 IMAGE
# ============================================================

def decode_image(image_data):

    if not isinstance(
        image_data,
        str
    ):

        raise ValueError(
            "Frame must be a base64 string."
        )

    # --------------------------------------------------------
    # Remove data URL prefix
    # --------------------------------------------------------

    if "," in image_data:

        image_data = (
            image_data
            .split(",", 1)[1]
        )

    try:

        image_bytes = base64.b64decode(
            image_data
        )

    except Exception as error:

        raise ValueError(
            f"Unable to decode base64 frame: "
            f"{error}"
        )

    np_array = np.frombuffer(
        image_bytes,
        dtype=np.uint8
    )

    frame = cv2.imdecode(
        np_array,
        cv2.IMREAD_COLOR
    )

    if frame is None:

        raise ValueError(
            "Unable to decode image frame."
        )

    return frame


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
# This must remain compatible with the trained model.
# ============================================================

def normalize_sequence(
    sequence
):

    sequence = np.array(
        sequence,
        dtype=np.float32
    )

    sequence = sequence.reshape(
        SEQUENCE_LENGTH,
        LANDMARKS_PER_FRAME,
        VALUES_PER_LANDMARK
    )

    # ========================================================
    # WRIST AS ORIGIN
    # ========================================================

    wrist = (
        sequence[:, 0, :]
        .copy()
    )

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

    normalized = (
        sequence.flatten()
    )

    if (
        len(normalized)
        !=
        EXPECTED_FEATURES
    ):

        raise ValueError(
            "Normalized feature count "
            "does not match expected count. "
            f"Expected {EXPECTED_FEATURES}, "
            f"got {len(normalized)}."
        )

    return normalized


# ============================================================
# EXTRACT SEQUENCE FEATURES
#
# IMPORTANT CHANGE:
#
# If MediaPipe misses the hand in a frame:
#
# 1. Reuse the previous valid frame.
#
# 2. If the first frame has no hand, search forward
#    for the first valid frame.
#
# This prevents one temporary tracking failure from
# destroying the complete 30-frame sequence.
# ============================================================

def extract_sequence_features(
    frames,
    detector
):

    if len(frames) != SEQUENCE_LENGTH:

        raise ValueError(
            f"Exactly {SEQUENCE_LENGTH} "
            f"frames are required. "
            f"Received {len(frames)}."
        )

    sequence_features = []

    timestamp = 0

    previous_features = None

    missed_frames = 0

    MAX_MISSED_FRAMES = 10

    # ========================================================
    # PROCESS EVERY FRAME
    # ========================================================

    for frame_index, frame_data in enumerate(frames):

        frame = decode_image(
            frame_data
        )

        # ----------------------------------------------------
        # Convert BGR -> RGB
        # ----------------------------------------------------

        rgb_frame = cv2.cvtColor(
            frame,
            cv2.COLOR_BGR2RGB
        )

        # ----------------------------------------------------
        # MediaPipe image
        # ----------------------------------------------------

        mp_image = mp.Image(

            image_format=
            mp.ImageFormat.SRGB,

            data=rgb_frame
        )

        # ----------------------------------------------------
        # Timestamp
        # ----------------------------------------------------

        timestamp += 33

        # ----------------------------------------------------
        # Detect hand
        # ----------------------------------------------------

        results = (
            detector.detect_for_video(
                mp_image,
                timestamp
            )
        )

        # ----------------------------------------------------
        # HAND DETECTED
        # ----------------------------------------------------

        if results.hand_landmarks:

            hand = (
                results.hand_landmarks[0]
            )

            features = extract_landmarks(
                hand
            )

            if len(features) != FEATURES_PER_FRAME:

                raise ValueError(
                    "Invalid landmark feature count. "
                    f"Expected {FEATURES_PER_FRAME}, "
                    f"got {len(features)}."
                )

            previous_features = features

            sequence_features.append(
                features
            )

            continue

        # ----------------------------------------------------
        # HAND NOT DETECTED
        # ----------------------------------------------------

        missed_frames += 1

        print(
            f"⚠️ Hand not detected in frame "
            f"{frame_index + 1}/{SEQUENCE_LENGTH}",
            file=sys.stderr
        )

        # ----------------------------------------------------
        # We have a previous valid frame
        #
        # Reuse it.
        # ----------------------------------------------------

        if previous_features is not None:

            sequence_features.append(
                previous_features.copy()
            )

        else:

            # ------------------------------------------------
            # No previous frame exists.
            #
            # Use zero landmarks temporarily.
            # We will try to recover on later frames.
            # ------------------------------------------------

            sequence_features.append(
                [0.0] * FEATURES_PER_FRAME
            )

        # ----------------------------------------------------
        # Too many consecutive misses
        # ----------------------------------------------------

        if (
            missed_frames
            >=
            MAX_MISSED_FRAMES
            and
            previous_features is None
        ):

            raise ValueError(
                "Unable to detect a hand in the "
                "camera sequence. Please place your "
                "hand clearly inside the camera frame."
            )

    # ========================================================
    # CHECK RESULT
    # ========================================================

    if len(sequence_features) != SEQUENCE_LENGTH:

        raise ValueError(
            "Unable to build complete "
            "30-frame landmark sequence."
        )

    return sequence_features


# ============================================================
# BUILD TRANSLATIONS
# ============================================================

def build_translations(
    label
):

    translation_map = (
        TRANSLATIONS.get(
            label,
            {}
        )
    )

    translations = []

    for language, text in (
        translation_map.items()
    ):

        translations.append({

            "language":
            language,

            "text":
            text,
        })

    return translations


# ============================================================
# PREDICT GESTURE
# ============================================================

def predict_gesture(
    frames
):

    # --------------------------------------------------------
    # Load model
    # --------------------------------------------------------

    model = load_model()

    # --------------------------------------------------------
    # Create MediaPipe detector
    # --------------------------------------------------------

    detector = create_detector()

    try:

        # ====================================================
        # EXTRACT LANDMARKS
        # ====================================================

        sequence = (
            extract_sequence_features(
                frames,
                detector
            )
        )

        # ====================================================
        # NORMALIZE
        # ====================================================

        normalized_features = (
            normalize_sequence(
                sequence
            )
        )

        # ====================================================
        # MODEL INPUT
        # ====================================================

        model_input = (
            normalized_features
            .reshape(
                1,
                -1
            )
        )

        # ====================================================
        # PREDICT
        # ====================================================

        probabilities = (
            model.predict_proba(
                model_input
            )[0]
        )

        # ====================================================
        # SORT PROBABILITIES
        # ====================================================

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
            if len(sorted_indices) > 1
            else sorted_indices[0]
        )

        # ====================================================
        # BEST CLASS
        # ====================================================

        label = str(
            model.classes_[
                best_index
            ]
        )

        confidence = float(
            probabilities[
                best_index
            ]
        )

        # ====================================================
        # SECOND CLASS
        # ====================================================

        second_confidence = float(
            probabilities[
                second_index
            ]
        )

        # ====================================================
        # MARGIN
        # ====================================================

        margin = (
            confidence
            -
            second_confidence
        )

        # ====================================================
        # QUALITY CHECK
        # ====================================================

        prediction_is_good = (

            confidence
            >=
            MIN_CONFIDENCE

            and

            margin
            >=
            MIN_MARGIN
        )

        # ====================================================
        # FINAL LABEL
        # ====================================================

        if prediction_is_good:

            final_label = label

            final_confidence = (
                confidence * 100
            )

            translations = (
                build_translations(
                    label
                )
            )

        else:

            final_label = "Uncertain"

            final_confidence = (
                confidence * 100
            )

            translations = []

        # ====================================================
        # RETURN RESULT
        # ====================================================

        return {

            "success": True,

            "recognition": {

                "label":
                final_label,

                "confidence":
                round(
                    final_confidence,
                    1
                ),
            },

            "translations":
            translations,

            "details": {

                "rawLabel":
                label,

                "rawConfidence":
                round(
                    confidence * 100,
                    1
                ),

                "margin":
                round(
                    margin * 100,
                    1
                ),

                "accepted":
                prediction_is_good,
            },
        }

    finally:

        detector.close()


# ============================================================
# MAIN
# ============================================================

def main():

    try:

        # ====================================================
        # READ JSON FROM NODE.JS
        # ====================================================

        input_data = sys.stdin.read()

        if not input_data:

            print(
                json.dumps(
                    error_response(
                        "No input received."
                    ),
                    ensure_ascii=False
                )
            )

            return

        # ====================================================
        # PARSE JSON
        # ====================================================

        try:

            payload = json.loads(
                input_data
            )

        except json.JSONDecodeError as error:

            print(
                json.dumps(
                    error_response(
                        f"Invalid JSON input: {error}"
                    ),
                    ensure_ascii=False
                )
            )

            return

        # ====================================================
        # GET FRAMES
        # ====================================================

        frames = payload.get(
            "frames"
        )

        if not isinstance(
            frames,
            list
        ):

            print(
                json.dumps(
                    error_response(
                        "frames must be an array."
                    ),
                    ensure_ascii=False
                )
            )

            return

        # ====================================================
        # VALIDATE FRAME COUNT
        # ====================================================

        if len(frames) != SEQUENCE_LENGTH:

            print(
                json.dumps(
                    error_response(
                        f"Exactly "
                        f"{SEQUENCE_LENGTH} "
                        f"frames are required. "
                        f"Received {len(frames)}."
                    ),
                    ensure_ascii=False
                )
            )

            return

        # ====================================================
        # PREDICT
        # ====================================================

        result = predict_gesture(
            frames
        )

        # ====================================================
        # OUTPUT JSON ONLY
        # ====================================================

        print(
            json.dumps(
                result,
                ensure_ascii=False
            )
        )

    except Exception as error:

        print(
            json.dumps(
                error_response(
                    str(error)
                ),
                ensure_ascii=False
            )
        )


# ============================================================
# ENTRY POINT
# ============================================================

if __name__ == "__main__":

    main()