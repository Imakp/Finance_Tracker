function CircularProgress({ percentage, color, label, size = "default" }) {
  const sizeConfig = {
    sm: {
      radius: 24,
      svgClass: "w-16 h-16",
      labelClass: "text-xs",
      valueClass: "text-xs",
    },
    default: {
      radius: 30,
      svgClass: "w-20 h-20",
      labelClass: "text-sm",
      valueClass: "text-sm",
    },
    lg: {
      radius: 36,
      svgClass: "w-24 h-24",
      labelClass: "text-base",
      valueClass: "text-sm",
    },
  };

  const { radius, svgClass, labelClass, valueClass } =
    sizeConfig[size] || sizeConfig.default;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    blue: "stroke-blue-400",
    yellow: "stroke-yellow-400",
    green: "stroke-green-400",
  };

  return (
    <div className="flex flex-col items-center">
      <svg className={`${svgClass} transform -rotate-90`} viewBox="0 0 100 100">
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
      <span
        className={`mt-2 font-medium text-gray-900 dark:text-gray-100 ${labelClass}`}
      >
        {label}
      </span>
      <span className={`text-gray-600 dark:text-gray-400 ${valueClass}`}>
        {percentage}%
      </span>
    </div>
  );
}

export default CircularProgress;
