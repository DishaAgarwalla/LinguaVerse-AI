const WaveAnimation = () => {
  return (
    <div className="flex justify-center items-end gap-1 h-14">

      <div className="w-2 h-4 bg-green-500 animate-bounce rounded-full"></div>
      <div
        className="w-2 h-8 bg-green-500 animate-bounce rounded-full"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-2 h-12 bg-green-500 animate-bounce rounded-full"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-8 bg-green-500 animate-bounce rounded-full"
        style={{ animationDelay: "0.3s" }}
      ></div>
      <div
        className="w-2 h-4 bg-green-500 animate-bounce rounded-full"
        style={{ animationDelay: "0.4s" }}
      ></div>

    </div>
  );
};

export default WaveAnimation;