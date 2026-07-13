interface Props {
  value: string;
  onChange: (value: string) => void;
}

const InputBox = ({ value, onChange }: Props) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter text..."
      className="h-56 w-full resize-none rounded-xl border p-4 outline-none focus:border-blue-500"
    />
  );
};

export default InputBox;