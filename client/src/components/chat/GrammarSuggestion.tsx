import { MdAutoAwesome } from "react-icons/md";

interface GrammarSuggestionProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

export default function GrammarSuggestion({ enabled, onToggle }: GrammarSuggestionProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onToggle(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all duration-200 cursor-pointer"
      />
      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
        <MdAutoAwesome className="w-3 h-3" />
        AI Grammar Correction
      </span>
    </label>
  );
}