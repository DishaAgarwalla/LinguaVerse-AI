interface GrammarSuggestionProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

export default function GrammarSuggestion({
  enabled,
  onToggle,
}: GrammarSuggestionProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        id="grammar"
        type="checkbox"
        checked={enabled}
        onChange={(e) =>
          onToggle(e.target.checked)
        }
        className="h-4 w-4 cursor-pointer"
      />

      <label
        htmlFor="grammar"
        className="cursor-pointer text-sm font-medium text-gray-700"
      >
        AI Grammar Correction
      </label>
    </div>
  );
}