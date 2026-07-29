import type { UserProfile } from "../../types/profile";

interface Props {
  profile: UserProfile;
}

export default function ProfileAvatar({
  profile,
}: Props) {
  return (
    <div className="flex flex-col items-center">

      <img
        src={
          profile.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            profile.name
          )}&background=2563eb&color=fff`
        }
        alt={profile.name}
        className="h-36 w-36 rounded-full border-4 border-blue-500 object-cover shadow-lg"
      />

      <button
        className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
      >
        Change Avatar
      </button>

    </div>
  );
}