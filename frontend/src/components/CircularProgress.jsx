function CircularProgress({ percentage, color, label }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    blue: "stroke-blue-500",
    brown: "stroke-amber-700",
    gray: "stroke-gray-500",
  };

  return (
    <div className="flex flex-col items-center">
      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="stroke-gray-200 dark:stroke-gray-700 fill-none"
          strokeWidth="8"
          cx="50"
          cy="50"
          r={radius}
        />
        <circle
          className={`${colors[color]} fill-none`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          cx="50"
          cy="50"
          r={radius}
        />
      </svg>
      <span className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
        {label}
      </span>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {percentage}%
      </span>
    </div>
  );
}

export default CircularProgress;
