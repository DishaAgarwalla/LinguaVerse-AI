import sys
import argostranslate.translate

sys.stdout.reconfigure(encoding="utf-8")

installed_languages = argostranslate.translate.get_installed_languages()
if len(sys.argv) < 4:
    print("Usage: python translate.py <text> <source_lang> <target_lang>")
    sys.exit(1)

text = sys.argv[1]

source_code = sys.argv[2].strip().lower()
target_code = sys.argv[3].strip().lower()

language_map = {
    "english": "en",
    "en": "en",
    "en-us": "en",
    "en-gb": "en",

    "hindi": "hi",
    "hi": "hi",
    "hi-in": "hi",

    "french": "fr",
    "fr": "fr",
    "fr-fr": "fr",

    "spanish": "es",
    "es": "es",
    "es-es": "es",

    "german": "de",
    "de": "de",
    "de-de": "de",
}

source_code = language_map.get(source_code, source_code)
target_code = language_map.get(target_code, target_code)

from_lang = next(
    (lang for lang in installed_languages if lang.code == source_code),
    None,
)

to_lang = next(
    (lang for lang in installed_languages if lang.code == target_code),
    None,
)

if from_lang is None:
    print(f"Source language '{source_code}' is not installed.")
    sys.exit(1)

if to_lang is None:
    print(f"Target language '{target_code}' is not installed.")
    sys.exit(1)

translation = from_lang.get_translation(to_lang)

if translation is None:
    print(f"No translation available from {source_code} to {target_code}.")
    sys.exit(1)

print(translation.translate(text))