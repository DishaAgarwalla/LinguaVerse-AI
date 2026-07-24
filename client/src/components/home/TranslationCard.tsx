interface TranslationCardProps {
  title: string;
  placeholder: string;
}

const TranslationCard = ({
  title,
  placeholder,
}: TranslationCardProps) => {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-200">
      <div className="border-b border-gray-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          {title}
        </h3>
      </div>
      <div className="p-5">
        <textarea
          placeholder={placeholder}
          rows={8}
          className="w-full resize-none rounded-xl border border-gray-200 p-4 text-gray-700 placeholder-gray-400 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
        />
        <div className="mt-2 text-xs text-gray-400 text-right">
          <span>0 characters</span>
        </div>
      </div>
    </div>
  );
};

export default TranslationCard;