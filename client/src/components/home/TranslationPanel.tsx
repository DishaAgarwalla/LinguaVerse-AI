import {
  FaVolumeUp,
  FaRobot,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";

const TranslationPanel = () => {
  return (
    <div className="group rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-300/50 border border-gray-100/50 hover:border-blue-100">
      <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
        📝 Live Translation
        <span className="ml-auto text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
          Active
        </span>
      </h3>

      <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/50 p-6 border border-gray-100">
        <p className="text-xl font-semibold text-gray-800">
          "Hello, how are you today?"
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/70 backdrop-blur-sm p-3 border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Language</p>
            <p className="text-sm font-semibold text-gray-700">English 🇬🇧</p>
          </div>
          <div className="rounded-xl bg-white/70 backdrop-blur-sm p-3 border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Confidence</p>
            <p className="text-sm font-semibold text-green-600">98%</p>
          </div>
        </div>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105">
        <FaVolumeUp className="group-hover:animate-pulse" />
        Speak Translation
      </button>

      <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-200 p-5 bg-gradient-to-br from-gray-50 to-indigo-50/30 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/10">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg shadow-blue-500/25">
            <FaRobot className="text-2xl text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">AI Avatar</h4>
            <p className="text-sm text-gray-500">Coming Soon</p>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              <FaCheckCircle className="w-3 h-3" />
              Beta
            </span>
          </div>
        </div>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-200 bg-white px-6 py-3.5 font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:scale-105">
        <FaBookOpen />
        Learn Sign Language
      </button>
    </div>
  );
};

export default TranslationPanel;