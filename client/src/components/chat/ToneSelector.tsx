interface ToneSelectorProps {
  value: "normal" | "formal" | "casual";
  onChange: (
    tone: "normal" | "formal" | "casual"
  ) => void;
}

export default function ToneSelector({
  value,
  onChange,
}: ToneSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        AI Tone
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value as
              | "normal"
              | "formal"
              | "casual"
          )
        }
        className="
          rounded-lg
          border
          border-gray-300
          px-3
          py-2
          text-sm
          outline-none
          focus:border-blue-500
        "
      >
        <option value="normal">
          Normal
        </option>

        <option value="formal">
          Formal
        </option>

        <option value="casual">
          Casual
        </option>
      </select>
    </div>
  );
}