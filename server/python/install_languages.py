import argostranslate.package

languages = [
    ("en", "hi"),
    ("hi", "en"),

    ("en", "bn"),
    ("bn", "en"),

    ("en", "fr"),
    ("fr", "en"),

    ("en", "de"),
    ("de", "en"),

    ("en", "es"),
    ("es", "en"),

    ("en", "ja"),
    ("ja", "en"),

    ("en", "ko"),
    ("ko", "en"),

    ("en", "ru"),
    ("ru", "en"),

    ("en", "ar"),
    ("ar", "en"),
]

print("Updating package index...")

argostranslate.package.update_package_index()

available = argostranslate.package.get_available_packages()

for source, target in languages:

    package = next(
        (
            p
            for p in available
            if p.from_code == source
            and p.to_code == target
        ),
        None,
    )

    if package is None:
        print(f"Package {source}->{target} not found.")
        continue

    print(f"Installing {source} -> {target}")

    path = package.download()

    argostranslate.package.install_from_path(path)

print("\nAll language packages installed.")