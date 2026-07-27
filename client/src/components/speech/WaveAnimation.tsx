const WaveAnimation = () => {
  const bars = [
    { height: "h-4", delay: "0s" },
    { height: "h-8", delay: "0.1s" },
    { height: "h-12", delay: "0.2s" },
    { height: "h-16", delay: "0.15s" },
    { height: "h-12", delay: "0.25s" },
    { height: "h-8", delay: "0.35s" },
    { height: "h-4", delay: "0.4s" },
  ];

  return (
    <div className="flex items-center justify-center gap-1.5 h-20">
      {bars.map((bar, index) => (
        <div
          key={index}
          className={`w-2 ${bar.height} bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-wave`}
          style={{ animationDelay: bar.delay }}
        />
      ))}
    </div>
  );
};

export default WaveAnimation;