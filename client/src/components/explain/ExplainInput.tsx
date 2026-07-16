interface Props {
  text: string;
  setText: (value: string) => void;
}

const ExplainInput = ({
  text,
  setText,
}: Props) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        Word or Sentence
      </label>

      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a word or sentence..."
        className="
          w-full
          rounded-lg
          border
          p-4
          outline-none
          focus:border-blue-500
        "
      />
    </div>
  );
};

export default ExplainInput;