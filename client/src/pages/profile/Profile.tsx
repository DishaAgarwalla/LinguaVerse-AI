import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaShieldAlt,
  FaEdit,
  FaSpinner,
} from "react-icons/fa";

import useProfile from "../../hooks/useProfile";

export default function Profile() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <FaSpinner className="mx-auto h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">
            Unable to load profile.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-600">

            <FaUser />

            Profile

          </div>

          <h1 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold text-transparent">

            My Profile

          </h1>

          <p className="mt-2 text-gray-500">

            Manage your account information.

          </p>

        </div>

        <Link
          to="/profile/edit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 font-medium text-white"
        >
          <FaEdit />

          Edit Profile
        </Link>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}

        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="flex flex-col items-center">

            {profile.avatar ? (

              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-24 w-24 rounded-full object-cover"
              />

            ) : (

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-3xl font-bold text-white">

                {profile.name.charAt(0).toUpperCase()}

              </div>

            )}

            <h2 className="mt-5 text-xl font-bold">

              {profile.name}

            </h2>

            <p className="text-gray-500">

              {profile.email}

            </p>

            <div className="mt-4 flex gap-2">

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                {profile.role}

              </span>

            </div>

            <p className="mt-3 text-xs text-gray-400">

              Joined{" "}

              {new Date(
                profile.createdAt
              ).toLocaleDateString()}

            </p>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-6 lg:col-span-2">

          <div className="rounded-2xl border bg-white p-6 shadow">

            <h3 className="mb-4 font-semibold">

              Account Information

            </h3>

            <div className="space-y-4">

              <div className="flex justify-between border-b pb-3">

                <span className="flex items-center gap-2 text-gray-600">

                  <FaEnvelope />

                  Email

                </span>

                <span>

                  {profile.email}

                </span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span className="flex items-center gap-2 text-gray-600">

                  <FaShieldAlt />

                  Role

                </span>

                <span>

                  {profile.role}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="flex items-center gap-2 text-gray-600">

                  <FaCalendar />

                  Joined

                </span>

                <span>

                  {new Date(
                    profile.createdAt
                  ).toLocaleDateString()}

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}