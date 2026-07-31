import {
  FiUser,
  FiMonitor,
  FiGlobe,
  FiBell,
  FiShield,
  FiLock,
  FiAlertTriangle,
} from "react-icons/fi";

interface Props {
  active: string;
  onChange: (tab: string) => void;
}

const menu = [
  {
    id: "account",
    title: "Account",
    icon: FiUser,
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: FiMonitor,
  },
  {
    id: "language",
    title: "Language",
    icon: FiGlobe,
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: FiBell,
  },
  {
    id: "privacy",
    title: "Privacy",
    icon: FiShield,
  },
  {
    id: "security",
    title: "Security",
    icon: FiLock,
  },
  {
    id: "danger",
    title: "Danger Zone",
    icon: FiAlertTriangle,
  },
];

export default function SettingsSidebar({
  active,
  onChange,
}: Props) {
  return (
    <div className="w-72 rounded-3xl bg-white p-5 shadow">

      <h2 className="mb-6 text-xl font-bold">
        Settings
      </h2>

      <div className="space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                active === item.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">
                {item.title}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}