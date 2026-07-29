import { useEffect, useState } from "react";
import { FiActivity, FiClock, FiTrendingUp, FiUser } from "react-icons/fi";
import WelcomeCard from "./WelcomeCard";
import FeatureGrid from "./FeatureGrid";
import { getMe } from "../../services/userService";

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    translations: 0,
    languages: 0,
    streak: 0
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
        // Simulate stats
        setStats({
          translations: 127,
          languages: 8,
          streak: 15
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
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100/50 hover:border-blue-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Translations</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">{stats.translations}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs text-green-600">
            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            +12% this week
          </div>
        </div>

        <div className="group bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100/50 hover:border-purple-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Languages Used</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">{stats.languages}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-3 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs text-blue-600">
            <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            5 active languages
          </div>
        </div>

        <div className="group bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100/50 hover:border-orange-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Daily Streak</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">{stats.streak} days</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-red-600 p-3 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
              <FiClock className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs text-orange-600">
            <span className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
            Keep it up!
          </div>
        </div>

        <div className="group bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100/50 hover:border-green-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Account Status</p>
              <p className="mt-2 text-xl font-bold text-gray-800">{user?.name || 'User'}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
              <FiUser className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs text-green-600">
            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Active
          </div>
        </div>
      </div>

      <div className="mt-8">
        <FeatureGrid />
      </div>
    </div>
  );
};

export default Dashboard;