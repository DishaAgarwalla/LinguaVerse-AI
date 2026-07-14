import { FaCopy } from "react-icons/fa";

interface Props {
  text: string;
}

const CopyButton = ({ text }: Props) => {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      alert("Copied successfully!");
    } catch (error) {
      alert("Failed to copy.");
    }
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
    >
      <FaCopy />
      Copy
    </button>
  );
};

export default CopyButton;