interface TranslationCardProps {
  title: string;
  placeholder: string;
}

const TranslationCard = ({
  title,
  placeholder,
}: TranslationCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">

      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        {title}
      </h3>

      <textarea
        placeholder={placeholder}
        rows={8}
        className="w-full resize-none rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
      />

    </div>
  );
};

export default TranslationCard;