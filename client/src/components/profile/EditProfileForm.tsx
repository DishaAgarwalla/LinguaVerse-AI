import { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile";
import { FaSave, FaSpinner, FaUser, FaImage } from "react-icons/fa";

export default function EditProfileForm() {
  const { profile, saveProfile, saving } = useProfile();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAvatar(profile.avatar || "");
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveProfile({ name, avatar });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!profile) return null;

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-lg shadow-gray-100/50 border border-gray-100/50">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Personal Information</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaUser className="w-4 h-4 text-blue-500" />
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaImage className="w-4 h-4 text-blue-500" />
            Avatar URL
          </label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
          />
          <p className="mt-1 text-xs text-gray-400">Enter a URL for your profile picture</p>
        </div>

        {success && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-green-700 text-sm animate-slideDown">
            ✅ Profile updated successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <FaSpinner className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FaSave className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}