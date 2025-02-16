import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import NewMonthModal from "./NewMonthModal";
import { FiSun, FiMoon, FiMenu, FiPlus } from "react-icons/fi";

function Header() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-md z-40">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Finance Tracker
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-gray-100 px-4 py-2 rounded transition-colors"
            >
              New
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
              Finance Tracker
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-full text-gray-100 bg-blue-500 hover:bg-blue-600 transition-colors"
                aria-label="Add new month"
              >
                <FiPlus size={20} />
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={isDarkMode ? "Light mode" : "Dark mode"}
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewMonthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}

export default Header;
