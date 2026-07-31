import { Bell } from "lucide-react";
import type { Settings } from "../../types/settings";

interface Props {
  settings: Settings;
  save: (data: Partial<Settings>) => Promise<void>;
}

export default function NotificationSettings({
  settings,
  save,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
          <Bell className="h-7 w-7" />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h2>

          <p className="mt-1 text-gray-500 dark:text-slate-400">
            Manage how LinguaVerse keeps you informed.
          </p>

        </div>

      </div>

      {/* Email Notifications */}

      <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Email Notifications
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Receive translation updates, security alerts and important account information through email.
            </p>

          </div>

          <button
            onClick={() =>
              save({
                emailNotifications:
                  !settings.emailNotifications,
              })
            }
            className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
              settings.emailNotifications
                ? "bg-indigo-600"
                : "bg-gray-300 dark:bg-slate-600"
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                settings.emailNotifications
                  ? "left-7"
                  : "left-1"
              }`}
            />
          </button>

        </div>

      </div>

      {/* Push Notifications */}

      <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Push Notifications
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Receive instant browser notifications for translations and activity.
            </p>

          </div>

          <button
            onClick={() =>
              save({
                pushNotifications:
                  !settings.pushNotifications,
              })
            }
            className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
              settings.pushNotifications
                ? "bg-indigo-600"
                : "bg-gray-300 dark:bg-slate-600"
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                settings.pushNotifications
                  ? "left-7"
                  : "left-1"
              }`}
            />
          </button>

        </div>

      </div>

      {/* Information Card */}

      <div className="rounded-3xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-6">

        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
          Notification Tips
        </h3>

        <ul className="mt-4 space-y-3 text-sm text-blue-600 dark:text-blue-200">

          <li>
            • Email notifications are useful for important account updates.
          </li>

          <li>
            • Push notifications appear instantly while using LinguaVerse AI.
          </li>

          <li>
            • You can enable or disable these settings at any time.
          </li>

        </ul>

      </div>

    </div>
  );
}