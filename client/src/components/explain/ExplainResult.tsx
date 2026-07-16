interface Props {
  result: {
    word: string;
    language: string;
    meaning: string;
    pronunciation: string;
    grammar: string;
    example: string;
    tips: string;
  };
}

const ExplainResult = ({ result }: Props) => {
  return (
    <div className="grid gap-5">

      <div className="rounded-lg border p-5">
        <h3 className="font-bold text-blue-600">
          Word
        </h3>

        <p className="mt-2">{result.word}</p>
      </div>

      <div className="rounded-lg border p-5">
        <h3 className="font-bold text-blue-600">
          Meaning
        </h3>

        <p className="mt-2 whitespace-pre-wrap">
          {result.meaning}
        </p>
      </div>

      <div className="rounded-lg border p-5">
        <h3 className="font-bold text-blue-600">
          Pronunciation
        </h3>

        <p className="mt-2">
          {result.pronunciation}
        </p>
      </div>

      <div className="rounded-lg border p-5">
        <h3 className="font-bold text-blue-600">
          Grammar
        </h3>

        <p className="mt-2 whitespace-pre-wrap">
          {result.grammar}
        </p>
      </div>

      <div className="rounded-lg border p-5">
        <h3 className="font-bold text-blue-600">
          Example
        </h3>

        <p className="mt-2 whitespace-pre-wrap">
          {result.example}
        </p>
      </div>

      <div className="rounded-lg border p-5">
        <h3 className="font-bold text-blue-600">
          Tips
        </h3>

        <p className="mt-2 whitespace-pre-wrap">
          {result.tips}
        </p>
      </div>

    </div>
  );
};

export default ExplainResult;