import sys
import json
import argostranslate.package
import argostranslate.translate

def translate_to_english(text, source_lang):
    installed = argostranslate.translate.get_installed_languages()

    from_lang = next(
        (lang for lang in installed if lang.code == source_lang),
        None,
    )

    to_lang = next(
        (lang for lang in installed if lang.code == "en"),
        None,
    )

    if not from_lang or not to_lang:
        return text

    translation = from_lang.get_translation(to_lang)

    return translation.translate(text)


def explain(text, language):
    english_text = text

    if language != "en":
        english_text = translate_to_english(text, language)

    explanation = {
        "word": text,
        "language": language,
        "meaning": f'"{english_text}" is translated/interpreted as "{english_text}".',
        "pronunciation": english_text,
        "grammar": "This can be used as a word or phrase depending on context.",
        "example": f"Example: {english_text}",
        "tips": "Try using this word in daily conversations to improve your vocabulary."
    }

    return explanation


def main():
    if len(sys.argv) < 3:
        print(
            json.dumps(
                {
                    "success": False,
                    "message": "Invalid arguments.",
                }
            )
        )
        return

    text = sys.argv[1]
    language = sys.argv[2]

    result = explain(text, language)

    print(
        json.dumps(
            {
                "success": True,
                "result": result,
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()