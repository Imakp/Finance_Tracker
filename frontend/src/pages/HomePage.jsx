import { useMonths } from "../contexts/MonthsContext";
import MonthlyCard from "../components/MonthlyCard";

function HomePage() {
  const { months } = useMonths();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive container with dynamic padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-6 sm:pb-8">
        {/* Hero section for better mobile experience */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2  mt-4">
            Monthly Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track your monthly progress and insights
          </p>
        </div>

        {/* Responsive grid with better breakpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {months.map((monthData) => (
            <div className="transform transition duration-200 hover:scale-102 hover:shadow-lg">
              <MonthlyCard
                key={`${monthData.month}-${monthData.year}`}
                {...monthData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;