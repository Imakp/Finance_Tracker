import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import NewMonthModal from "./NewMonthModal";
import { FiSun, FiMoon, FiMenu, FiPlus } from "react-icons/fi";

function Header() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // Apply new theme colors, border instead of shadow, adjust padding
    <header className="bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark sticky top-0 z-40">
      {/* Adjusted padding for better spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          {/* Use theme text colors */}
          <h1 className="text-xl font-semibold text-text-light-primary dark:text-text-dark-primary">
            Finance Tracker
          </h1>
          {/* Adjusted gap */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
            >
              New Month
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-text-light-secondary dark:text-text-dark-secondary hover:bg-border-light dark:hover:bg-border-dark transition-colors duration-200"
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
            {/* Use theme text colors */}
            <h1 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary truncate">
              Finance Tracker
            </h1>
            {/* Adjusted gap */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-full text-white bg-primary hover:bg-primary-hover transition-colors duration-200"
                aria-label="Add new month"
              >
                <FiPlus size={18} />
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full text-text-light-secondary dark:text-text-dark-secondary hover:bg-border-light dark:hover:bg-border-dark transition-colors duration-200"
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
