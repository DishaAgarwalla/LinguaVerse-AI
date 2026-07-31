import { FaTrashAlt, FaSignOutAlt } from "react-icons/fa";

interface Props {
  logout: () => void;
  deleteAccount: () => void;
}

export default function DangerZone({
  logout,
  deleteAccount,
}: Props) {
  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-2xl font-bold text-red-600">
          Danger Zone
        </h2>

        <p className="mt-2 text-gray-500">
          These actions are irreversible. Please proceed carefully.
        </p>
      </div>

      {/* Logout */}

      <div className="flex items-center justify-between rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

        <div>

          <h3 className="font-semibold text-gray-800">
            Logout
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Sign out from your current account.
          </p>

        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-medium text-white transition hover:bg-yellow-600"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* Delete Account */}

      <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-6">

        <div>

          <h3 className="font-semibold text-red-700">
            Delete Account
          </h3>

          <p className="mt-1 text-sm text-red-600">
            Permanently delete your account and all your data.
            This action cannot be undone.
          </p>

        </div>

        <button
          onClick={() => {
            const confirmDelete = window.confirm(
              "Are you sure you want to permanently delete your account?"
            );

            if (confirmDelete) {
              deleteAccount();
            }
          }}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <FaTrashAlt />
          Delete
        </button>

      </div>

    </div>
  );
}