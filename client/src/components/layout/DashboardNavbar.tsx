import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiLogOut,
  FiUser,
  FiBell,
  FiSearch,
  FiSettings,
  FiEdit,
} from "react-icons/fi";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);

  const name =
    localStorage.getItem("name") || "User";

  const email =
    localStorage.getItem("email") ||
    "user@example.com";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  return (
    <header
      className="
      sticky
      top-0
      z-40
      flex
      h-20
      items-center
      justify-between
      border-b
      border-[var(--border)]
      bg-[var(--surface)]
      text-[var(--text)]
      px-8
      shadow-sm
      transition-colors
      duration-300
    "
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
          LinguaVerse AI
        </h1>

        <span
          className="
          hidden
          rounded-full
          border
          border-blue-200
          bg-blue-50
          px-3
          py-1
          text-xs
          font-medium
          text-blue-700
          md:inline-flex
        "
        >
          Dashboard
        </span>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Search */}

        <div
          className="
          hidden
          items-center
          gap-2
          rounded-xl
          border
          border-[var(--border)]
          bg-[var(--surface-2)]
          px-3
          py-2
          lg:flex
        "
        >
          <FiSearch className="text-[var(--text-secondary)]" />

          <input
            type="text"
            placeholder="Search..."
            className="
            w-48
            bg-transparent
            text-sm
            text-[var(--text)]
            placeholder:text-[var(--text-secondary)]
            outline-none
          "
          />
        </div>

        {/* Notification */}

        <button
          className="
          relative
          rounded-xl
          p-2
          transition
          hover:bg-[var(--surface-2)]
        "
        >
          <FiBell className="h-5 w-5 text-[var(--text)]" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}

        <div className="relative">
          <button
            onClick={() =>
              setIsDropdownOpen(!isDropdownOpen)
            }
            className="
            flex
            items-center
            gap-3
            rounded-xl
            p-2
            transition
            hover:bg-[var(--surface-2)]
          "
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-lg font-bold text-white">
              {name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden text-left md:block">
              <p className="font-semibold text-[var(--text)]">
                {name}
              </p>

              <p className="text-xs text-[var(--text-secondary)]">
                {email}
              </p>
            </div>
          </button>

          {isDropdownOpen && (
            <div
              className="
              absolute
              right-0
              mt-3
              w-64
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              shadow-xl
              transition-colors
            "
            >
              <div className="border-b border-[var(--border)] bg-[var(--surface-2)] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-lg font-bold text-white">
                    {name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold text-[var(--text)]">
                      {name}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)]">
                      {email}
                    </p>
                  </div>
                </div>
              </div>
                            <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate("/profile");
                }}
                className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-3
                text-[var(--text)]
                transition
                hover:bg-[var(--surface-2)]
              "
              >
                <FiUser />
                My Profile
              </button>

              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate("/profile/edit");
                }}
                className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-3
                text-[var(--text)]
                transition
                hover:bg-[var(--surface-2)]
              "
              >
                <FiEdit />
                Edit Profile
              </button>

              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate("/settings");
                }}
                className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-3
                text-[var(--text)]
                transition
                hover:bg-[var(--surface-2)]
              "
              >
                <FiSettings />
                Settings
              </button>

              <hr className="border-[var(--border)]" />

              <button
                onClick={logout}
                className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-3
                text-red-500
                transition
                hover:bg-red-500/10
              "
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;