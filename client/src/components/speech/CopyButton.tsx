import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

interface Props {
  text: string;
}

const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert("Failed to copy.");
    }
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
    >
      {copied ? (
        <>
          <FaCheck className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <FaCopy className="w-4 h-4" />
          Copy
        </>
      )}
    </button>
  );
};

export default CopyButton;