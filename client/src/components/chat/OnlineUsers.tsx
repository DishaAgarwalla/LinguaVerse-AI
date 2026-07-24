import { FaUsers, FaCircle, FaUser } from "react-icons/fa";

interface User {
  id: string;
  name: string;
}

interface OnlineUsersProps {
  users: User[];
}

const OnlineUsers = ({ users }: OnlineUsersProps) => {
  return (
    <div className="rounded-2xl bg-white shadow-lg shadow-gray-100/50 border border-gray-100/50 p-5 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 p-1.5">
          <FaUsers className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">
          Online Users
        </h2>
        <span className="ml-auto text-sm font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
          {users.length}
        </span>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-6">
          <FaUser className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No users online</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-64 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded-lg p-2.5 transition-all duration-200 hover:bg-gray-50"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <FaCircle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-green-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;