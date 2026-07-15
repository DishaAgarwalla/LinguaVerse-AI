import sys
import argostranslate.translate

sys.stdout.reconfigure(encoding="utf-8")

if len(sys.argv) < 4:
    print("Usage: python translate.py <text> <source> <target>")
    sys.exit(1)

text = sys.argv[1]

source_code = sys.argv[2].strip().lower()
target_code = sys.argv[3].strip().lower()

# Auto fallback
if source_code == "auto":
    source_code = "en"

installed_languages = argostranslate.translate.get_installed_languages()

language_map = {
    lang.code: lang
    for lang in installed_languages
}

if source_code not in language_map:
    print(f"Source language '{source_code}' is not installed.")
    sys.exit(1)

if target_code not in language_map:
    print(f"Target language '{target_code}' is not installed.")
    sys.exit(1)

from_lang = language_map[source_code]
to_lang = language_map[target_code]

# Same language
if source_code == target_code:
    print(text)
    sys.exit(0)

# -------------------------
# Direct Translation
# -------------------------

translation = from_lang.get_translation(to_lang)

if translation:
    print(translation.translate(text))
    sys.exit(0)

# -------------------------
# English Bridge
# Example:
# Hindi -> English -> French
# -------------------------

english = language_map.get("en")

if english is None:
    print("English package is not installed.")
    sys.exit(1)

# source -> english
step1 = from_lang.get_translation(english)

# english -> target
step2 = english.get_translation(to_lang)

if step1 and step2:
    english_text = step1.translate(text)
    final_text = step2.translate(english_text)

    print(final_text)
    sys.exit(0)

print(
    f"No translation path available from "
    f"{source_code} to {target_code}."
)

sys.exit(1)