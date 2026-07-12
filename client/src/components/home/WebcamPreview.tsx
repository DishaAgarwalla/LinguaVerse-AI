import { FaVideo, FaCamera } from "react-icons/fa";
import signImage from "../../assets/sign-language.png";

const WebcamPreview = () => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl">

      <div className="mb-5 flex items-center justify-between">

        <h3 className="text-xl font-bold flex items-center gap-2">
          <FaVideo className="text-blue-600" />
          Webcam Preview
        </h3>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          Live
        </span>

      </div>

      <div className="overflow-hidden rounded-2xl">

        <img
          src={signImage}
          alt="Sign Language"
          className="h-[320px] w-full object-cover"
        />

      </div>

      <button
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <FaCamera />

        Start Camera
      </button>

    </div>
  );
};

export default WebcamPreview;