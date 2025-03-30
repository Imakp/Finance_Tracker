import { useMonths } from "../contexts/MonthsContext";
import MonthlyCard from "../components/MonthlyCard";

function HomePage() {
  const { months } = useMonths();

  if (!months) {
    return (
      <div className="flex items-center justify-center pt-20">
        <div className="text-text-light-secondary dark:text-text-dark-secondary">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Adjust title/subtitle styles and margins */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-text-light-primary dark:text-text-dark-primary mb-3">
          Monthly Overview
        </h1>
        <p className="text-base text-text-light-secondary dark:text-text-dark-secondary">
          Track your monthly progress and insights
        </p>
      </div>

      {months.length === 0 ? (
        <div className="text-center text-text-light-secondary dark:text-text-dark-secondary py-10">
          No months added yet. Click "New Month" in the header to add your first
          month.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {months.map((monthData) => (
            <div key={`${monthData.month}-${monthData.year}`}>
              <MonthlyCard {...monthData} />
            </div>
          ))}{" "}
          {/* <-- Correct placement for map closing brackets */}
        </div>
      )}
    </div>
  );
}

export default HomePage;
