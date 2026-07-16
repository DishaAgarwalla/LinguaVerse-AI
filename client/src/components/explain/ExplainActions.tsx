interface Props {
  text: string;
}

const ExplainActions = ({ text }: Props) => {
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    alert("Copied successfully.");
  };

  return (
    <div className="flex gap-4">

      <button
        onClick={copy}
        className="
          rounded-lg
          bg-blue-600
          px-5
          py-2
          font-semibold
          text-white
          hover:bg-blue-700
        "
      >
        Copy
      </button>

    </div>
  );
};

export default ExplainActions;