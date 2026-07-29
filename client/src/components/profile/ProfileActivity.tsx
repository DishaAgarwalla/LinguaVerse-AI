import type { UserProfile } from "../../types/profile";
import { FaCalendar, FaEnvelope, FaShieldAlt, FaUserTag } from "react-icons/fa";

interface Props {
  profile: UserProfile;
}

export default function ProfileActivity({ profile }: Props) {
  const items = [
    { label: "Email", value: profile.email, icon: FaEnvelope },
    { label: "Role", value: profile.role, icon: FaUserTag },
    { 
      label: "Account Status", 
      value: profile.isVerified ? "Verified" : "Not Verified",
      icon: FaShieldAlt,
      color: profile.isVerified ? "text-green-600" : "text-red-600"
    },
    { 
      label: "Joined", 
      value: new Date(profile.createdAt).toLocaleDateString(),
      icon: FaCalendar
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg shadow-gray-100/50 border border-gray-100/50 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
      <h2 className="mb-5 text-xl font-bold text-gray-800 flex items-center gap-2">
        📅 Account Information
      </h2>
      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <span className="flex items-center gap-2 font-medium text-gray-600">
                <Icon className="w-4 h-4 text-blue-500" />
                {item.label}
              </span>
              <span className={`text-sm ${item.color || "text-gray-600"}`}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}