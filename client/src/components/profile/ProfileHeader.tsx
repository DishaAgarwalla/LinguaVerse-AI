import type { UserProfile } from "../../types/profile";

interface Props {
  profile: UserProfile;
}

export default function ProfileHeader({ profile }: Props) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl shadow-blue-500/20">
      <h1 className="text-3xl font-bold">
        Welcome, {profile.name} 👋
      </h1>
      <p className="mt-2 text-blue-100">
        Manage your account and view your activity.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium border border-white/30">
          🟢 Active
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium border border-white/30">
          📧 {profile.email}
        </span>
      </div>
    </div>
  );
}