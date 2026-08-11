import { useEffect, useState } from "react";
import {
  FiActivity,
  FiClock,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

import WelcomeCard from "./WelcomeCard";
import FeatureGrid from "./FeatureGrid";

import { getMe } from "../../services/userService";

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] =
    useState<User | null>(null);

  const [stats, setStats] = useState({
    translations: 0,
    languages: 0,
    streak: 0,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();

        setUser(data);

        setStats({
          translations: 127,
          languages: 8,
          streak: 15,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="space-y-8 animate-slideUp">

      <WelcomeCard name={user?.name} />

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Translation */}

        <div
          className="
          group
          rounded-2xl
          border
          border-gray-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          p-6
          shadow-lg
          transition-all
          duration-300
          hover:shadow-2xl
          hover:-translate-y-1
        "
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                Total Translations
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                {stats.translations}
              </p>

            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">

              <FiActivity className="w-6 h-6 text-white" />

            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-green-500">

            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>

            +12% this week

          </div>
        </div>

        {/* Languages */}

        <div
          className="
          group
          rounded-2xl
          border
          border-gray-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          p-6
          shadow-lg
          transition-all
          duration-300
          hover:shadow-2xl
          hover:-translate-y-1
        "
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                Languages Used
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                {stats.languages}
              </p>

            </div>

            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-3 shadow-lg">

              <FiTrendingUp className="w-6 h-6 text-white" />

            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-blue-500">

            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>

            5 active languages

          </div>
        </div>

        {/* Streak */}

        <div
          className="
          group
          rounded-2xl
          border
          border-gray-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          p-6
          shadow-lg
          transition-all
          duration-300
          hover:shadow-2xl
          hover:-translate-y-1
        "
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                Daily Streak
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                {stats.streak} days
              </p>

            </div>

            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-red-600 p-3 shadow-lg">

              <FiClock className="w-6 h-6 text-white" />

            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-orange-500">

            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>

            Keep it up!

          </div>
        </div>

        {/* User */}

        <div
          className="
          group
          rounded-2xl
          border
          border-gray-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          p-6
          shadow-lg
          transition-all
          duration-300
          hover:shadow-2xl
          hover:-translate-y-1
        "
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                Account Status
              </p>

              <p className="mt-2 text-xl font-bold text-gray-800 dark:text-white">
                {user?.name || "User"}
              </p>

            </div>

            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">

              <FiUser className="w-6 h-6 text-white" />

            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-green-500">

            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>

            Active

          </div>
        </div>

      </div>

      {/* Features */}

      <div className="mt-10">

        <FeatureGrid />

      </div>

    </div>
  );
};

export default Dashboard;