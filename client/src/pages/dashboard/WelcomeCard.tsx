interface WelcomeCardProps {
  name?: string;
}

const WelcomeCard = ({ name }: WelcomeCardProps) => {
  return (
    <div className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 p-10 text-white shadow-xl">
      <h1 className="text-4xl font-bold">
        Welcome Back, {name} 👋
      </h1>

      <p className="mt-4 max-w-2xl text-lg opacity-90">
        Start translating text, speech, images and sign language
        using AI-powered tools.
      </p>
    </div>
  );
};

export default WelcomeCard;