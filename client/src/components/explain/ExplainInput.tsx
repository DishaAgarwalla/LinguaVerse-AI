import { FaEdit } from "react-icons/fa";

interface Props {
  text: string;
  setText: (value: string) => void;
}

const ExplainInput = ({ text, setText }: Props) => {
  const characterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 flex items-center gap-2">
        <FaEdit className="w-4 h-4 text-cyan-500" />
        Word or Sentence
      </label>
      <div className="relative">
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a word or sentence to get an AI-powered explanation..."
          className="w-full rounded-xl border border-gray-200 p-4 pr-20 text-gray-700 placeholder-gray-400 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 hover:border-cyan-300 resize-none"
        />
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white px-2 py-1 rounded-lg border border-gray-100">
          <span className="font-medium">{wordCount}</span> words • <span className="font-medium">{characterCount}</span> chars
        </div>
      </div>
    </div>
  );
};

export default ExplainInput;