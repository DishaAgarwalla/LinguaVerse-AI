import {
  FaVolumeUp,
  FaRobot,
  FaBookOpen,
} from "react-icons/fa";

const TranslationPanel = () => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl">

      <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        📝 Live Translation
      </h3>

      <div className="rounded-xl bg-slate-100 p-5">

        <p className="text-lg font-semibold">
          Hello, how are you today?
        </p>

        <div className="mt-6 space-y-2 text-slate-600">

          <p>
            <strong>Language:</strong> English
          </p>

          <p>
            <strong>Confidence:</strong> 98%
          </p>

        </div>

      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">

        <FaVolumeUp />

        Speak Translation

      </button>

      <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-5">

        <div className="flex items-center gap-3">

          <FaRobot
            className="text-3xl text-blue-600"
          />

          <div>

            <h4 className="font-bold">
              AI Avatar
            </h4>

            <p className="text-slate-500">
              Coming Soon
            </p>

          </div>

        </div>

      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-600 py-3 font-semibold text-blue-600 hover:bg-blue-50">

        <FaBookOpen />

        Learn Sign Language

      </button>

    </div>
  );
};

export default TranslationPanel;