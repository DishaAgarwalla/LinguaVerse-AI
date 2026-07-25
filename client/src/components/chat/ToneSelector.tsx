import { FaSlidersH } from "react-icons/fa";

interface ToneSelectorProps {
  value: "normal" | "formal" | "casual";
  onChange: (tone: "normal" | "formal" | "casual") => void;
}

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
        <FaSlidersH className="w-3 h-3" />
        AI Tone
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as "normal" | "formal" | "casual")}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
      >
        <option value="normal">Normal</option>
        <option value="formal">Formal</option>
        <option value="casual">Casual</option>
      </select>
    </div>
  );
}