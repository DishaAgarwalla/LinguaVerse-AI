import { useState } from "react";
import { 
  FaTrash, 
  FaCopy, 
  FaCheck, 
  FaLanguage, 
  FaClock,
  FaArrowRight,
  FaVolumeUp
} from "react-icons/fa";

interface Translation {
  id: string;
  sourceText: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  createdAt: string;
}

interface Props {
  item: Translation;
  onDelete: (id: string) => void;
}

const HistoryCard = ({ item, onDelete }: Props) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const copyTranslation = async () => {
    await navigator.clipboard.writeText(item.translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakTranslation = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(item.translated);
    utterance.lang = item.targetLang;
    utterance.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
    
    setTimeout(() => setIsPlaying(false), Math.max(item.translated.length * 100, 1000));
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(item.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="group rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-100 hover:-translate-y-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2 shadow-lg shadow-blue-500/20">
            <FaLanguage className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              {item.sourceLang}
            </span>
            <FaArrowRight className="w-3 h-3 text-gray-400" />
            <span className="text-sm font-semibold text-blue-600">
              {item.targetLang}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaClock className="w-3 h-3" />
            <span>{formatDate(item.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Source Text */}
        <div className="rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-100 p-4 transition-all duration-300 hover:border-blue-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Original
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
            {item.sourceText}
          </p>
        </div>

        {/* Translation */}
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/30 border border-blue-100 p-4 transition-all duration-300 hover:border-indigo-200">
          <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Translation
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
            {item.translated}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={copyTranslation}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-3.5 py-2 text-xs font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
          >
            {copied ? (
              <>
                <FaCheck className="w-3 h-3" />
                Copied!
              </>
            ) : (
              <>
                <FaCopy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>

          <button
            onClick={speakTranslation}
            disabled={isPlaying}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-3.5 py-2 text-xs font-medium text-white shadow-lg shadow-green-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaVolumeUp className={`w-3 h-3 ${isPlaying ? "animate-pulse" : ""}`} />
            {isPlaying ? "Playing..." : "Listen"}
          </button>
        </div>

        <button
          onClick={handleDelete}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 hover:scale-105 ${
            showDeleteConfirm
              ? "bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          <FaTrash className="w-3 h-3" />
          {showDeleteConfirm ? "Confirm Delete" : "Delete"}
        </button>
      </div>

      {/* Delete confirmation message */}
      {showDeleteConfirm && (
        <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-2 text-xs text-red-700 animate-slideDown">
          Click again to permanently delete this translation.
        </div>
      )}
    </div>
  );
};

export default HistoryCard;