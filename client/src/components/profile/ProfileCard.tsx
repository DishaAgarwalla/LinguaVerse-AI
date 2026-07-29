import type { UserProfile } from "../../types/profile";

interface Props {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: Props) {
  const avatarUrl =
    profile.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=2563eb&color=fff&size=128`;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg shadow-gray-100/50 border border-gray-100/50 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
      <div className="flex flex-col items-center">
        <img
          src={avatarUrl}
          alt={profile.name}
          className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover shadow-lg"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">{profile.name}</h2>
        <p className="text-gray-500">{profile.email}</p>
        
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
          </span>
          <span
            className={`rounded-full px-4 py-1 text-sm font-semibold ${
              profile.isVerified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {profile.isVerified ? "✅ Verified" : "❌ Not Verified"}
          </span>
        </div>
        
        <p className="mt-3 text-xs text-gray-400">
          Joined {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}