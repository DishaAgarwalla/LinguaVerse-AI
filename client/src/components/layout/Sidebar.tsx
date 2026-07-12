import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGlobe,
  FiClock,
  FiImage,
  FiFileText,
  FiMic,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen border-r bg-white p-5 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold text-blue-600">
        Dashboard
      </h2>

      <nav className="space-y-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FiHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/translate"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FiGlobe />
          Translate
        </NavLink>

        <NavLink
          to="/ocr"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FiImage />
          OCR
        </NavLink>

        <NavLink
          to="/speech"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FiMic />
          Speech
        </NavLink>

        <NavLink
          to="/documents"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FiFileText />
          Documents
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FiClock />
          History
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;