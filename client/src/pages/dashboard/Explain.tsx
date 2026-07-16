import ExplainCard from "../../components/explain/ExplainCard";

const Explain = () => {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          AI Explain
        </h1>

        <p className="mt-2 text-gray-500">
          Understand the meaning, pronunciation,
          grammar, examples, and usage of any
          word or sentence using AI.
        </p>

      </div>

      <ExplainCard />

    </div>
  );
};

export default Explain;