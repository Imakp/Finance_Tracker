import { useState } from "react";
import { useMonths } from "../contexts/MonthsContext";

function NewMonthModal({ isOpen, onClose }) {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { addMonth } = useMonths();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMonth) return;

    const monthData = {
      month: selectedMonth,
      year: parseInt(selectedYear),
    };

    try {
      const response = await fetch('/api/months', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(monthData),
      });

      if (!response.ok) {
        throw new Error('Failed to create month');
      }

      const newMonth = await response.json();
      addMonth(newMonth);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-auto overflow-hidden shadow-xl">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Create New Month
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          <div>
            <label
              htmlFor="year-select"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Select Year
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full h-12 px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              {Array.from(
                { length: 5 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="month-select"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Select Month
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full h-12 px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Footer with buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 sm:py-2 text-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-3 sm:py-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMonthModal;
