import csv
import os
import joblib
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report


# ============================================================
# CONFIGURATION
# ============================================================

DATASET_DIR = "python/dataset"

MODEL_PATH = "python/sign_model.joblib"

GESTURES = [
    "HELLO",
    "THANK_YOU",
    "PLEASE",
]

FRAMES_PER_SEQUENCE = 30

LANDMARKS_PER_FRAME = 21

VALUES_PER_LANDMARK = 3

FEATURES_PER_FRAME = (
    LANDMARKS_PER_FRAME *
    VALUES_PER_LANDMARK
)

EXPECTED_FEATURES = (
    FRAMES_PER_SEQUENCE *
    FEATURES_PER_FRAME
)


# ============================================================
# HEADER
# ============================================================

print()
print("========================================")
print(" LinguaVerse AI")
print(" Sign Language Model Training")
print("========================================")
print()


# ============================================================
# LOAD ONE CSV FILE
# ============================================================

def load_gesture_file(filename):

    sequences = {}

    with open(
        filename,
        "r",
        newline=""
    ) as file:

        reader = csv.DictReader(file)

        for row in reader:

            sequence_id = int(
                row["sequence"]
            )

            frame_id = int(
                row["frame"]
            )

            features = []

            for i in range(
                LANDMARKS_PER_FRAME
            ):

                features.append(
                    float(row[f"x{i}"])
                )

                features.append(
                    float(row[f"y{i}"])
                )

                features.append(
                    float(row[f"z{i}"])
                )

            if sequence_id not in sequences:

                sequences[sequence_id] = []

            sequences[sequence_id].append(
                (
                    frame_id,
                    features
                )
            )


    # ========================================================
    # SORT AND VALIDATE SEQUENCES
    # ========================================================

    result = []

    for sequence_id, frames in sequences.items():

        frames.sort(
            key=lambda item: item[0]
        )

        frame_features = [
            item[1]
            for item in frames
        ]

        if len(frame_features) != FRAMES_PER_SEQUENCE:

            print(
                f"Skipping sequence "
                f"{sequence_id} in "
                f"{filename}"
            )

            print(
                f"Expected {FRAMES_PER_SEQUENCE} frames, "
                f"got {len(frame_features)}"
            )

            continue


        result.append(
            frame_features
        )


    return result


# ============================================================
# NORMALIZE SEQUENCE
# ============================================================

def normalize_sequence(sequence):

    sequence = np.array(
        sequence,
        dtype=np.float32
    )


    # --------------------------------------------------------
    # Expected shape:
    #
    # 30 frames
    # ×
    # 21 landmarks
    # ×
    # 3 coordinates
    # --------------------------------------------------------

    sequence = sequence.reshape(
        FRAMES_PER_SEQUENCE,
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
# LOAD COMPLETE DATASET
# ============================================================

X = []

y = []


for gesture in GESTURES:

    filename = os.path.join(
        DATASET_DIR,
        f"{gesture}.csv"
    )


    # --------------------------------------------------------
    # Check dataset
    # --------------------------------------------------------

    if not os.path.exists(filename):

        print(
            "ERROR: Dataset not found:"
        )

        print(
            filename
        )

        exit()


    # --------------------------------------------------------
    # Load sequences
    # --------------------------------------------------------

    sequences = load_gesture_file(
        filename
    )


    print(
        f"{gesture}: "
        f"{len(sequences)} sequences loaded"
    )


    # --------------------------------------------------------
    # Normalize every sequence
    # --------------------------------------------------------

    for sequence in sequences:

        normalized = normalize_sequence(
            sequence
        )


        if len(normalized) != EXPECTED_FEATURES:

            print(
                "ERROR: Invalid feature count."
            )

            print(
                f"Expected: {EXPECTED_FEATURES}"
            )

            print(
                f"Got: {len(normalized)}"
            )

            exit()


        X.append(
            normalized
        )

        y.append(
            gesture
        )


# ============================================================
# NUMPY ARRAYS
# ============================================================

X = np.array(
    X,
    dtype=np.float32
)

y = np.array(
    y
)


# ============================================================
# DATASET INFORMATION
# ============================================================

print()

print(
    "========================================"
)

print(
    " Dataset Information"
)

print(
    "========================================"
)

print()

print(
    f"Total sequences: {len(X)}"
)

print(
    f"Features per sequence: {X.shape[1]}"
)

print()

print(
    "Class distribution:"
)

for gesture in GESTURES:

    count = np.sum(
        y == gesture
    )

    print(
        f"  {gesture}: {count}"
    )

print()


# ============================================================
# SAFETY CHECK
# ============================================================

if X.shape[1] != EXPECTED_FEATURES:

    print(
        "ERROR: Dataset feature size is incorrect."
    )

    print(
        f"Expected: {EXPECTED_FEATURES}"
    )

    print(
        f"Actual: {X.shape[1]}"
    )

    exit()


# ============================================================
# TRAIN / TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.25,

    random_state=42,

    stratify=y
)


print(
    f"Training samples: {len(X_train)}"
)

print(
    f"Testing samples: {len(X_test)}"
)

print()


# ============================================================
# RANDOM FOREST
# ============================================================

print(
    "========================================"
)

print(
    " Training Random Forest..."
)

print(
    "========================================"
)

print()


model = RandomForestClassifier(

    n_estimators=300,

    max_depth=20,

    min_samples_leaf=1,

    random_state=42,

    class_weight="balanced",

    n_jobs=-1
)


# ============================================================
# TRAIN
# ============================================================

model.fit(
    X_train,
    y_train
)


# ============================================================
# TEST
# ============================================================

predictions = model.predict(
    X_test
)


accuracy = accuracy_score(
    y_test,
    predictions
)


# ============================================================
# EVALUATION
# ============================================================

print()

print(
    "========================================"
)

print(
    " Model Evaluation"
)

print(
    "========================================"
)

print()

print(
    f"Test Accuracy: "
    f"{accuracy * 100:.2f}%"
)

print()

print(
    classification_report(
        y_test,
        predictions,
        zero_division=0
    )
)


# ============================================================
# FEATURE CHECK
# ============================================================

print(
    "Model feature count:"
)

print(
    model.n_features_in_
)

print()

print(
    "Expected feature count:"
)

print(
    EXPECTED_FEATURES
)

print()


# ============================================================
# SAVE MODEL
# ============================================================

joblib.dump(
    model,
    MODEL_PATH
)


# ============================================================
# FINISHED
# ============================================================

print(
    "========================================"
)

print(
    " Training Completed!"
)

print(
    "========================================"
)

print()

print(
    f"Model saved to:"
)

print(
    MODEL_PATH
)

print()

print(
    "The model is ready for prediction."
)

print()