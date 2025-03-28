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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-auto overflow-hidden shadow-xl">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Edit Month
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Year
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-12 px-3 py-2 text-base border rounded-lg"
              required
            />
          </div>
          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Month
            </label>
            <input
              id="month"
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full h-12 px-3 py-2 text-base border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-gray-100 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMonthModal;
