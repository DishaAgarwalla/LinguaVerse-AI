interface Props {
  translated: string;
}

const DocumentActions = ({ translated }: Props) => {
  const copy = async () => {
    await navigator.clipboard.writeText(translated);
    alert("Copied!");
  };

  return (
    <div className="mt-6">

      <button
        onClick={copy}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white"
      >
        Copy Translation
      </button>

    </div>
  );
};

export default DocumentActions;