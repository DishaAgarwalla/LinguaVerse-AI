import type { TranslationResult } from "../../types/signLanguage";

interface TranslationPanelProps {
  translations: TranslationResult[];
}

const TranslationPanel = ({
  translations,
}: TranslationPanelProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <h2 className="mb-5 text-lg font-semibold">
        🌍 Live Translation
      </h2>

      <div className="space-y-4">

        {translations.length === 0 ? (
          <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-500">
            No translation available.
          </div>
        ) : (
          translations.map((item) => (
            <div
              key={item.language}
              className="rounded-lg border p-4"
            >
              <p className="text-sm text-gray-500">
                {item.language}
              </p>

              <p className="mt-2 text-lg font-medium">
                {item.text}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default TranslationPanel;