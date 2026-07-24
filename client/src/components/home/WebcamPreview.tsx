import { FaVideo, FaCamera, FaCircle } from "react-icons/fa";
import signImage from "../../assets/sign-language.png";

const WebcamPreview = () => {
  return (
    <div className="group rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-300/50 border border-gray-100/50 hover:border-blue-100">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
          <FaVideo className="text-blue-600 group-hover:scale-110 transition-transform" />
          Webcam Preview
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1.5 text-sm font-semibold text-green-700">
          <FaCircle className="w-2 h-2 text-green-500 animate-pulse" />
          Live
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/30">
        <img
          src={signImage}
          alt="Sign Language"
          className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        {/* Camera indicator */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-white font-medium">Recording</span>
        </div>
      </div>

      <button
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 group/btn"
      >
        <FaCamera className="group-hover/btn:rotate-12 transition-transform" />
        Start Camera
      </button>
    </div>
  );
};

export default WebcamPreview;