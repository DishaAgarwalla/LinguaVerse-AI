import argostranslate.package

print("Updating package index...")

argostranslate.package.update_package_index()

available_packages = argostranslate.package.get_available_packages()

pairs = [
    ("en", "hi"),
    ("hi", "en"),
    ("en", "fr"),
    ("fr", "en"),
    ("en", "es"),
    ("es", "en"),
    ("en", "de"),
    ("de", "en"),
]

for from_code, to_code in pairs:
    for package in available_packages:
        if (
            package.from_code == from_code
            and package.to_code == to_code
        ):
            print(f"Installing {from_code} -> {to_code}")
            download_path = package.download()
            argostranslate.package.install_from_path(download_path)

print("Done!")