import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";

function MonthlyCard({ month, year, categories, income, balance }) {
  const totalIncome = income;
  // Round to 2 decimal places to avoid floating-point precision issues
  const needsPercentage = totalIncome
    ? Number(((categories.needs / totalIncome) * 100).toFixed(2))
    : 0;
  const wantsPercentage = totalIncome
    ? Number(((categories.wants / totalIncome) * 100).toFixed(2))
    : 0;
  const savingsPercentage = totalIncome
    ? Number(((categories.savings / totalIncome) * 100).toFixed(2))
    : 0;

  return (
    <Link
      to={`/${year}/${month.toLowerCase()}`}
      className="block p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-slate-700 transition-shadow active:scale-95 sm:active:scale-100 transition-transform"
    >
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 capitalize text-gray-900 dark:text-gray-100">
        {month} {year}
      </h2>

      <div className="flex flex-col space-y-4 min-[425px]:flex-row min-[425px]:space-y-0 min-[425px]:justify-between min-[425px]:gap-4 mb-4">
        <CircularProgress
          percentage={needsPercentage}
          color="blue"
          label="Needs"
          size="sm"
          className="min-[425px]:scale-100"
        />
        <CircularProgress
          percentage={wantsPercentage}
          color="yellow"
          label="Wants"
          size="sm"
          className="min-[425px]:scale-100"
        />
        <CircularProgress
          percentage={savingsPercentage}
          color="green"
          label="Savings"
          size="sm"
          className="min-[425px]:scale-100"
        />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Total Income:
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">
            ₹{income.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Remaining:</span>
          <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">
            ₹{balance.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MonthlyCard;
