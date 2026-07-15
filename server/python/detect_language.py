from langdetect import detect, DetectorFactory
import sys

DetectorFactory.seed = 0

sys.stdout.reconfigure(encoding="utf-8")

if len(sys.argv) < 2:
    print("en")
    sys.exit(0)

text = sys.argv[1].strip()

# Very short messages are unreliable
if len(text) < 15:
    print("en")
    sys.exit(0)

try:
    language = detect(text)
    print(language)

except Exception:
    print("en")