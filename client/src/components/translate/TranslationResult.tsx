import { FaSpinner, FaCheckCircle } from "react-icons/fa";

interface Props {
  translated: string;
  loading?: boolean;
}

const TranslationResult = ({ translated, loading = false }: Props) => {
  if (loading) {
    return (
      <div className="h-56 rounded-xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/30 p-4 flex flex-col items-center justify-center">
        <FaSpinner className="w-8 h-8 text-blue-500 animate-spin mb-3" />
        <p className="text-sm text-blue-600 font-medium">Translating...</p>
      </div>
    );
  }

  if (!translated) {
    return (
      <div className="h-56 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-4 flex flex-col items-center justify-center">
        <div className="text-4xl mb-3 opacity-30">🌐</div>
        <p className="text-sm text-gray-400 text-center">
          Translation will appear here
        </p>
        <p className="text-xs text-gray-300 mt-1">
          Enter text and click Translate
        </p>
      </div>
    );
  }

  return (
    <div className="h-56 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50/30 p-4 overflow-y-auto relative">
      <div className="absolute top-3 right-3">
        <FaCheckCircle className="w-4 h-4 text-green-500" />
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {translated}
      </p>
    </div>
  );
};

export default TranslationResult;