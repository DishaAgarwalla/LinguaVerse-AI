import { useState } from "react";
import type { Settings } from "../../types/settings";

interface Props {
  settings: Settings;
  save: (data: Partial<Settings>) => Promise<void>;
}

export default function SecuritySettings({
  settings,
  save,
}: Props) {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const updatePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill all fields.");
      return;
    }

    alert(
      "Password change will be connected with backend."
    );

    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold">
        Security Settings
      </h2>

      <div className="space-y-5">

        <div>

          <label className="mb-2 block font-medium">
            Current Password
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div className="flex items-center justify-between rounded-xl border p-4">

          <div>

            <h3 className="font-semibold">
              Two-Factor Authentication
            </h3>

            <p className="text-sm text-gray-500">
              Enable additional security.
            </p>

          </div>

          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={(e) =>
              save({
                twoFactorAuth:
                  e.target.checked,
              })
            }
            className="h-5 w-5"
          />

        </div>

        <button
          onClick={updatePassword}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Update Password
        </button>

      </div>

    </div>
  );
}