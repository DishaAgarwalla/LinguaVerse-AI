import { FaSpinner, FaCheckCircle } from "react-icons/fa";

interface Props {
  translated: string;
  loading?: boolean;
}

const TranslationResult = ({
  translated,
  loading = false,
}: Props) => {
  if (loading) {
    return (
      <div
        className="
          flex
          h-56
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-blue-200
          bg-gradient-to-br
          from-blue-50
          to-indigo-50/40

          dark:border-blue-700
          dark:from-slate-900
          dark:to-slate-800
        "
      >
        <FaSpinner className="mb-4 h-8 w-8 animate-spin text-blue-500" />

        <p className="font-medium text-blue-600 dark:text-blue-300">
          Translating...
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          AI is generating the best translation.
        </p>
      </div>
    );
  }

  if (!translated) {
    return (
      <div
        className="
          flex
          h-56
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-gray-200
          bg-gray-50

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div className="mb-3 text-5xl opacity-40">
          🌍
        </div>

        <p className="font-medium text-gray-500 dark:text-slate-300">
          Translation will appear here
        </p>

        <p className="mt-1 text-sm text-gray-400 dark:text-slate-500">
          Enter text and click Translate
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        h-56
        overflow-y-auto
        rounded-2xl
        border
        border-green-200
        bg-gradient-to-br
        from-green-50
        to-emerald-50/40
        p-5

        dark:border-green-700
        dark:from-slate-900
        dark:to-slate-800
      "
    >
      <div className="absolute right-4 top-4">
        <FaCheckCircle className="text-green-500" />
      </div>

      <p
        className="
          whitespace-pre-wrap
          leading-8
          text-gray-800

          dark:text-slate-100
        "
      >
        {translated}
      </p>
    </div>
  );
};

export default TranslationResult;