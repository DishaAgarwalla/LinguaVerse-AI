import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LinguaVerse AI
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 hover:bg-blue-50 rounded-lg"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 hover:bg-blue-50 rounded-lg"
              aria-label="Twitter"
            >
              <FiTwitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 hover:bg-blue-50 rounded-lg"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 hover:bg-blue-50 rounded-lg"
              aria-label="Email"
            >
              <FiMail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © {currentYear} LinguaVerse AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;