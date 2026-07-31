import { Shield } from "lucide-react";
import type { Settings } from "../../types/settings";

interface Props {
  settings: Settings;
  save: (data: Partial<Settings>) => Promise<void>;
}

export default function PrivacySettings({
  settings,
  save,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg">
          <Shield className="h-7 w-7" />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Privacy
          </h2>

          <p className="mt-1 text-gray-500 dark:text-slate-400">
            Control how your profile and personal information are shared.
          </p>

        </div>

      </div>

      {/* Public Profile */}

      <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Public Profile
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Allow other LinguaVerse users to view your public profile and activity.
            </p>

          </div>

          <button
            onClick={() =>
              save({
                publicProfile:
                  !settings.publicProfile,
              })
            }
            className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
              settings.publicProfile
                ? "bg-indigo-600"
                : "bg-gray-300 dark:bg-slate-600"
            }`}
          >

            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                settings.publicProfile
                  ? "left-7"
                  : "left-1"
              }`}
            />

          </button>

        </div>

      </div>

      {/* Privacy Information */}

      <div className="rounded-3xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-6">

        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
          Privacy Information
        </h3>

        <ul className="mt-4 space-y-3 text-sm text-blue-600 dark:text-blue-200">

          <li>
            • Your translations and AI history remain private unless explicitly shared.
          </li>

          <li>
            • Your personal information is securely stored and encrypted.
          </li>

          <li>
            • Public Profile only affects what other users can see.
          </li>

          <li>
            • You can change these settings anytime.
          </li>

        </ul>

      </div>

    </div>
  );
}