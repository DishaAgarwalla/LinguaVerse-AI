import { useState } from "react";
import type { Settings } from "../../types/settings";

interface Props {
  settings: Settings;
  save: (data: Partial<Settings>) => Promise<void>;
}

export default function AccountSettings({
  settings,
  save,
}: Props) {
  const [name, setName] = useState(settings.name);
  const [email, setEmail] = useState(settings.email);

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        Account Settings
      </h2>

      <div>
        <label className="mb-2 block font-medium">
          Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <button
        onClick={() =>
          save({
            name,
            email,
          })
        }
        className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Save Changes
      </button>

    </div>
  );
}