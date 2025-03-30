import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";

function MonthlyCard({ month, year, categories, income, balance }) {
  const totalIncome = income;
  const needsPercentage = totalIncome
    ? Number(((categories.needs / totalIncome) * 100).toFixed(2))
    : 0;
  const wantsPercentage = totalIncome
    ? Number(((categories.wants / totalIncome) * 100).toFixed(2))
    : 0;
  const savingsPercentage = totalIncome
    ? Number(((categories.savings / totalIncome) * 100).toFixed(2))
    : 0;

  const needsColor = "needs";
  const wantsColor = "wants";
  const savingsColor = "savings";

  return (
    <Link
      to={`/${year}/${month.toLowerCase()}`}
      className="block p-5 bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary transition-all duration-200 ease-in-out group"
    >
      {/* Use theme text colors, adjust font size/weight */}
      <h2 className="text-lg font-semibold mb-4 capitalize text-text-light-primary dark:text-text-dark-primary group-hover:text-primary transition-colors duration-200">
        {month} {year}
      </h2>

      {/* Simplify progress layout: always a row, justify around */}
      <div className="flex justify-around items-center mb-5">
        <CircularProgress
          percentage={needsPercentage}
          color={needsColor}
          label="Needs"
          size="sm"
        />
        <CircularProgress
          percentage={wantsPercentage}
          color={wantsColor}
          label="Wants"
          size="sm"
        />
        <CircularProgress
          percentage={savingsPercentage}
          color={savingsColor}
          label="Savings"
          size="sm"
        />
      </div>

      {/* Adjust spacing and text styles */}
      <div className="mt-5 space-y-2.5">
        <div className="flex justify-between items-center">
          {/* Use theme secondary text color */}
          <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
            Total Income:
          </span>
          {/* Use theme primary text color */}
          <span className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
            ₹{income.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          {/* Use theme secondary text color */}
          <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
            Remaining:
          </span>
          {/* Use theme primary text color */}
          <span className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
            ₹{balance.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MonthlyCard;
