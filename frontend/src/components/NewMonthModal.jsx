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
      const response = await fetch("/api/months", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(monthData),
      });

      if (!response.ok) {
        throw new Error("Failed to create month");
      }

      const newMonth = await response.json();
      addMonth(newMonth);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Use theme card styles */}
      <div className="bg-card-light dark:bg-card-dark rounded-lg w-full max-w-md mx-auto overflow-hidden border border-border-light dark:border-border-dark">
        {/* Header: Use theme text/border colors */}
        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">
            Create New Month
          </h2>
        </div>

        {/* Form: Adjust padding and spacing */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Apply theme label/select styles */}
          <div>
            <label
              htmlFor="year-select"
              className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5"
            >
              Select Year
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              required // Add required attribute
              className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
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

          {/* Apply theme label/select styles */}
          <div>
            <label
              htmlFor="month-select"
              className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5"
            >
              Select Month
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              required
              className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
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
              Create Month
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMonthModal;
