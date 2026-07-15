interface User {
  id: string;
  name: string;
}

interface OnlineUsersProps {
  users: User[];
}

const OnlineUsers = ({
  users,
}: OnlineUsersProps) => {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        Online Users
      </h2>

      {users.length === 0 ? (
        <p className="text-sm text-gray-500">
          No users online.
        </p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3"
            >
              <span className="h-3 w-3 rounded-full bg-green-500"></span>

              <span>{user.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;