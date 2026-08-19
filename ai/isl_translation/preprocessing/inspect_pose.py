from pathlib import Path
import pandas as pd


# ============================================================
# iSign Dataset Inspection + Sentence-Level Preprocessing
# ============================================================

print("=" * 60)
print("iSign Dataset Inspection")
print("=" * 60)


# ============================================================
# PATHS
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parents[3]

CSV_PATH = (
    PROJECT_ROOT
    / "ai"
    / "isl_translation"
    / "dataset"
    / "iSign_v1.1.csv"
)

OUTPUT_PATH = (
    PROJECT_ROOT
    / "ai"
    / "isl_translation"
    / "dataset"
    / "iSign_sentence_level.csv"
)


print("\nCSV path:")
print(CSV_PATH)


# ============================================================
# CHECK DATASET
# ============================================================

if not CSV_PATH.exists():
    raise FileNotFoundError(
        f"\nDataset CSV was not found:\n{CSV_PATH}"
    )


# ============================================================
# LOAD DATASET
# ============================================================

df = pd.read_csv(CSV_PATH)

print("\nDataset loaded successfully!")
print(f"Rows: {len(df):,}")
print(f"Columns: {df.columns.tolist()}")


# ============================================================
# CHECK REQUIRED COLUMNS
# ============================================================

required_columns = ["uid", "text"]

missing_columns = [
    column
    for column in required_columns
    if column not in df.columns
]

if missing_columns:
    raise ValueError(
        f"\nMissing required columns: "
        f"{missing_columns}"
    )


# ============================================================
# CLEAN UID
# ============================================================

df["uid"] = (
    df["uid"]
    .astype("string")
    .str.strip()
)


# ============================================================
# CHECK MISSING UID
# ============================================================

missing_uid = df["uid"].isna().sum()

print(
    f"\nMissing UID rows: "
    f"{missing_uid}"
)

if missing_uid > 0:

    df = df.dropna(
        subset=["uid"]
    )


# ============================================================
# EXTRACT VIDEO ID + SEGMENT NUMBER
# ============================================================

"""
Expected UID format:

1782bea75c7d-1
1782bea75c7d-2
1782bea75c7d-3
...

The final "-number" is the segment number.

Example:

1782bea75c7d-27

becomes:

video_id        = 1782bea75c7d
sequence_number = 27
"""

uid_parts = (
    df["uid"]
    .astype(str)
    .str.extract(
        r"^(.*)-(\d+)$"
    )
)

df["video_id"] = uid_parts[0]

df["sequence_number"] = pd.to_numeric(
    uid_parts[1],
    errors="coerce"
)


# ============================================================
# VALIDATE UID PARSING
# ============================================================

invalid_uid_mask = (
    df["video_id"].isna()
    |
    df["sequence_number"].isna()
)

invalid_uid_count = (
    invalid_uid_mask.sum()
)

print(
    f"\nInvalid UID rows: "
    f"{invalid_uid_count}"
)


if invalid_uid_count > 0:

    print(
        "\nExample invalid UIDs:"
    )

    print(
        df.loc[
            invalid_uid_mask,
            "uid"
        ]
        .head(20)
        .to_string(index=False)
    )

    df = df.loc[
        ~invalid_uid_mask
    ].copy()


# ============================================================
# CLEAN TEXT
# ============================================================

missing_text = (
    df["text"].isna().sum()
)

print(
    f"\nMissing text rows: "
    f"{missing_text}"
)


df["text"] = (
    df["text"]
    .fillna("")
    .astype(str)
)


# ============================================================
# NORMALIZE WHITESPACE
# ============================================================

df["text"] = (
    df["text"]
    .str.replace(
        r"\s+",
        " ",
        regex=True
    )
    .str.strip()
)


# ============================================================
# REMOVE EMPTY TEXT
# ============================================================

empty_text_mask = (
    df["text"].eq("")
)

empty_text_count = (
    empty_text_mask.sum()
)

print(
    f"Empty text rows: "
    f"{empty_text_count}"
)


if empty_text_count > 0:

    df = df.loc[
        ~empty_text_mask
    ].copy()


# ============================================================
# SORT SEGMENTS
# ============================================================

df = df.sort_values(
    by=[
        "video_id",
        "sequence_number"
    ]
)


# ============================================================
# UNIQUE VIDEO COUNT
# ============================================================

unique_videos = (
    df["video_id"].nunique()
)

print(
    f"\nUnique videos: "
    f"{unique_videos:,}"
)


# ============================================================
# SEGMENTS PER VIDEO
# ============================================================

segments_per_video = (
    df.groupby("video_id")
    .size()
)


print(
    "\nSegments per video:"
)

print(
    segments_per_video.describe()
)


print(
    f"\nAverage segments/video: "
    f"{segments_per_video.mean():.2f}"
)


# ============================================================
# CREATE SENTENCE-LEVEL DATASET
# ============================================================

print(
    "\nCreating sentence-level dataset..."
)


sentence_df = (
    df.groupby(
        "video_id",
        sort=False
    )
    .agg(
        text=(
            "text",
            lambda values:
                " ".join(
                    str(value).strip()
                    for value in values
                    if str(value).strip()
                )
        ),

        segments=(
            "text",
            "count"
        ),
    )
    .reset_index()
)


# ============================================================
# CLEAN FINAL SENTENCE TEXT
# ============================================================

sentence_df["text"] = (
    sentence_df["text"]
    .fillna("")
    .astype(str)
    .str.replace(
        r"\s+",
        " ",
        regex=True
    )
    .str.strip()
)


# ============================================================
# REMOVE EMPTY SENTENCES
# ============================================================

sentence_df = sentence_df.loc[
    sentence_df["text"].ne("")
].copy()


# ============================================================
# FINAL DATASET STATISTICS
# ============================================================

print(
    f"\nSentence/video records: "
    f"{len(sentence_df):,}"
)


print(
    "\nSentence length statistics:"
)

sentence_lengths = (
    sentence_df["text"]
    .str.split()
    .str.len()
)

print(
    sentence_lengths.describe()
)


# ============================================================
# SHOW FIRST 5 RECORDS
# ============================================================

print("\n" + "=" * 60)
print("FIRST 5 VIDEO RECORDS")
print("=" * 60)


for _, row in (
    sentence_df
    .head(5)
    .iterrows()
):

    print(
        "\nVIDEO ID:"
    )

    print(
        row["video_id"]
    )

    print(
        "\nSEGMENTS:"
    )

    print(
        row["segments"]
    )

    print(
        "\nTEXT:"
    )

    print(
        row["text"][:1000]
    )

    print(
        "\n" + "-" * 60
    )


# ============================================================
# SAVE SENTENCE-LEVEL DATASET
# ============================================================

sentence_df.to_csv(
    OUTPUT_PATH,
    index=False,
    encoding="utf-8"
)


# ============================================================
# VERIFY SAVED FILE
# ============================================================

if not OUTPUT_PATH.exists():

    raise RuntimeError(
        "\nFailed to create "
        "sentence-level dataset."
    )


# Load it again to make sure it is valid
verification_df = pd.read_csv(
    OUTPUT_PATH
)


# ============================================================
# FINAL SUMMARY
# ============================================================

print("\n" + "=" * 60)
print("SUCCESS")
print("=" * 60)

print(
    "\nOriginal CSV rows:"
)

print(
    f"{len(pd.read_csv(CSV_PATH)):,}"
)

print(
    "\nUsable segment rows:"
)

print(
    f"{len(df):,}"
)

print(
    "\nUnique videos:"
)

print(
    f"{df['video_id'].nunique():,}"
)

print(
    "\nSentence/video records:"
)

print(
    f"{len(sentence_df):,}"
)

print(
    "\nSaved dataset:"
)

print(
    OUTPUT_PATH
)

print(
    "\nVerified columns:"
)

print(
    verification_df.columns.tolist()
)

print(
    "\nThe sentence-level dataset "
    "was created successfully."
)

print(
    "\nNext stage:"
)

print(
    "Connect each video_id to the "
    "corresponding ISL video/pose data."
)

print("=" * 60)