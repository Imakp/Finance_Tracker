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
  const validPercentage = Number(percentage) || 0;
  const strokeDashoffset =
    circumference - (validPercentage / 100) * circumference;

  const colorClasses = {
    needs: "stroke-needs",
    wants: "stroke-wants",
    savings: "stroke-savings",
    income: "stroke-income",
    primary: "stroke-primary",
    default: "stroke-gray-400",
  };

  const strokeColorClass = colorClasses[color] || colorClasses.default;

  return (
    <div className="flex flex-col items-center">
      <svg className={`${svgClass} transform -rotate-90`} viewBox="0 0 100 100">
        {/* Use theme border colors for the background track */}
        <circle
          className="stroke-border-light dark:stroke-border-dark fill-none"
          strokeWidth="8"
          cx="50"
          cy="50"
          r={radius}
        />
        {/* Apply the mapped theme color class */}
        <circle
          className={`${strokeColorClass} fill-none transition-all duration-300 ease-in-out`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          cx="50"
          cy="50"
          r={radius}
        />
      </svg>
      {/* Use theme text colors */}
      <span
        className={`mt-2 font-medium text-text-light-primary dark:text-text-dark-primary ${labelClass}`}
      >
        {label}
      </span>
      {/* Use theme secondary text colors */}
      <span
        className={`text-text-light-secondary dark:text-text-dark-secondary ${valueClass}`}
      >
        {validPercentage}%
      </span>
    </div>
  );
}

export default CircularProgress;
