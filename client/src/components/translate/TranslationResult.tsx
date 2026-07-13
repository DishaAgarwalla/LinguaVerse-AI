interface Props {
  translated: string;
}

const TranslationResult = ({ translated }: Props) => {
  return (
    <div className="h-56 rounded-xl border bg-gray-50 p-4">
      {translated || "Translation will appear here..."}
    </div>
  );
};

export default TranslationResult;