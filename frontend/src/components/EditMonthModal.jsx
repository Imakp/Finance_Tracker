import { useState } from "react";

function EditMonthModal({ isOpen, onClose, currentMonth, onUpdate }) {
  const [month, setMonth] = useState(currentMonth.month);
  const [year, setYear] = useState(currentMonth.year);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ month, year });
  };

  return (
    // Use theme overlay style
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Use theme card styles */}
      <div className="bg-card-light dark:bg-card-dark rounded-lg w-full max-w-md mx-auto overflow-hidden border border-border-light dark:border-border-dark">
        {/* Header: Use theme text/border colors */}
        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">
            Edit Month Details
          </h2>
        </div>
        {/* Form: Adjust padding and spacing */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Apply theme label/input styles */}
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5"
            >
              Year
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
              required
            />
          </div>
          {/* Apply theme label/input styles */}
          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5"
            >
              Month
            </label>
            <input
              id="month"
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
              required
            />
          </div>
          {/* Footer with buttons: Apply theme styles */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-md text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary hover:bg-border-light dark:hover:bg-border-dark transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-hover transition-colors"
            >
              Update Month
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMonthModal;
