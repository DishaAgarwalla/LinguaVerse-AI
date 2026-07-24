import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FiHome,
  FiGlobe,
  FiClock,
  FiImage,
  FiFileText,
  FiMic,
  FiMessageCircle,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
} from "react-icons/fi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      icon: FiHome,
      label: "Dashboard",
    },
    {
      path: "/translate",
      icon: FiGlobe,
      label: "Translate",
    },
    {
      path: "/chat",
      icon: FiMessageCircle,
      label: "Chat",
    },
    {
      path: "/ocr",
      icon: FiImage,
      label: "OCR",
    },
    {
      path: "/speech",
      icon: FiMic,
      label: "Speech",
    },
    {
      path: "/documents",
      icon: FiFileText,
      label: "Documents",
    },
    {
      path: "/explain",
      icon: FiBookOpen,
      label: "AI Explain",
    },
    {
      path: "/history",
      icon: FiClock,
      label: "History",
    },
    {
      path: "/sign-language",
      icon: FiBookOpen,
      label: "Sign Language",
    },
    {
      path: "/profile",
      icon: FiUser,
      label: "Profile",
    },
  ];

  return (
    <aside
      className={`relative flex flex-col bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } min-h-screen`}
    >
      {/* Logo */}

      <div
        className={`flex items-center h-20 border-b px-5 ${
          isCollapsed
            ? "justify-center"
            : "justify-between"
        }`}
      >
        {!isCollapsed ? (
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              LinguaVerse
            </h1>

            <p className="text-xs text-gray-500">
              AI Platform
            </p>
          </div>
        ) : (
          <span className="text-3xl">🌍</span>
        )}
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`group relative flex items-center ${
                isCollapsed
                  ? "justify-center"
                  : "gap-3"
              } rounded-xl px-3 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {/* Active Indicator */}

              {isActive && (
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-white" />
              )}

              <item.icon
                className={`h-5 w-5 ${
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-blue-600"
                }`}
              />

              {!isCollapsed && (
                <span className="font-medium">
                  {item.label}
                </span>
              )}

              {isCollapsed && (
                <div className="absolute left-full ml-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Button */}

      <button
        onClick={() =>
          setIsCollapsed(!isCollapsed)
        }
        className="absolute -right-3 top-20 rounded-full border bg-white p-2 shadow-md transition hover:border-blue-500"
      >
        {isCollapsed ? (
          <FiChevronRight />
        ) : (
          <FiChevronLeft />
        )}
      </button>

      {/* Bottom */}

      <div className="border-t p-4">
        {!isCollapsed ? (
          <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                AI
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-700">
                  LinguaVerse AI
                </p>

                <p className="text-xs text-gray-500">
                  Your Translation Assistant
                </p>
              </div>

              <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              AI
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;