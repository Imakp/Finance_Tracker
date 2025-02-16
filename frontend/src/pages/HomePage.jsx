import { useMonths } from "../contexts/MonthsContext";
import MonthlyCard from "../components/MonthlyCard";

function HomePage() {
  const { months } = useMonths();

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {months.map((monthData) => (
          <MonthlyCard
            key={`${monthData.month}-${monthData.year}`}
            {...monthData}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
