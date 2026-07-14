import { saveAs } from "file-saver";

interface Props {
  translated: string;
}

const SpeechControls = ({ translated }: Props) => {
  const copyText = async () => {
    await navigator.clipboard.writeText(translated);
    alert("Copied!");
  };

  const download = () => {
    const blob = new Blob([translated], {
      type: "text/plain;charset=utf-8",
    });

    saveAs(blob, "translation.txt");
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={copyText}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        📋 Copy
      </button>

      <button
        onClick={download}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        📥 Download
      </button>
    </div>
  );
};

export default SpeechControls;