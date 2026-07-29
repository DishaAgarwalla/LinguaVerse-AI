import type { UserProfile } from "../../types/profile";

interface Props {
  profile: UserProfile;
}

export default function ProfileStats({ profile }: Props) {
  const stats = [
    { title: "Translations", value: profile._count.translations, icon: "🌍" },
    { title: "Speech", value: profile._count.speeches, icon: "🎤" },
    { title: "OCR", value: profile._count.ocrHistory, icon: "📷" },
    { title: "Documents", value: profile._count.documents, icon: "📄" },
    { title: "Messages", value: profile._count.messages, icon: "💬" },
    { title: "AI Explain", value: profile._count.explanations, icon: "🤖" },
    { title: "Grammar", value: profile._count.grammar, icon: "✍️" },
    { title: "Tone", value: profile._count.tones, icon: "🎭" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="group rounded-2xl bg-white p-5 shadow-lg shadow-gray-100/50 border border-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-100"
        >
          <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
            {stat.icon}
          </div>
          <h2 className="mt-3 text-3xl font-bold text-blue-600">{stat.value}</h2>
          <p className="mt-2 text-sm text-gray-500">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}