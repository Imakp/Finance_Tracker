import { useEffect, useState } from "react";
import MonthlyCard from "../components/MonthlyCard";

function HomePage() {
  const [months, setMonths] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/months");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMonths(data);
      } catch (error) {
        console.error("Error fetching months:", error);
        setError("Failed to load months. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonths();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-6 sm:pb-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 mt-4">
            Monthly Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Track your monthly progress and insights
          </p>
        </div>

        {months.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            No months added yet. Click "New" to add your first month.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {months.map((monthData) => (
              <div
                className="transform transition duration-200 hover:scale-102 hover:shadow-lg"
                key={`${monthData.month}-${monthData.year}`}
              >
                <MonthlyCard {...monthData} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
