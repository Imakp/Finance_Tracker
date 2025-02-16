import { useParams } from "react-router-dom";
import { useMonths } from "../contexts/MonthsContext";
import { useState } from "react";

function MonthlyDetail() {
  const { year, month } = useParams();
  const { months, addTransaction } = useMonths();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentMonth = months.find(
    (m) =>
      m.month.toLowerCase() === month.toLowerCase() && m.year === parseInt(year)
  );

  if (!currentMonth) {
    return <div className="container mx-auto px-4 pt-20">Month not found</div>;
  }

  const getCategoryColor = (type) => {
    const colors = {
      needs: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      wants:
        "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
      savings: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
      income:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    };
    return colors[type.toLowerCase()] || "bg-gray-100";
  };

  const totalIncome = currentMonth.income || 1;

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold capitalize text-gray-900 dark:text-gray-100">
          {month} {year} Transactions
        </h1>
        <button
          className="bg-blue-500 text-gray-100 px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Financial Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
              Monthly Breakdown
            </h2>
            
            <div className="space-y-4">
              {['needs', 'wants', 'savings'].map((type) => {
                const actualPercentage = totalIncome > 0 
                  ? (currentMonth.categories[type] / totalIncome) * 100 
                  : 0;
                const targetPercentage = {
                  needs: 50,
                  wants: 30,
                  savings: 20
                }[type];

                return (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize dark:text-gray-300">{type}</span>
                      <span className="dark:text-gray-300">
                        ₹{currentMonth.categories[type].toLocaleString()} / 
                        ₹{Math.round(totalIncome * (targetPercentage/100)).toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                      <div
                        className={`h-full rounded-full ${getCategoryColor(type)}`}
                        style={{ width: `${Math.min(actualPercentage, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Target: {targetPercentage}% ({((actualPercentage/targetPercentage)*100).toFixed(0)}% of goal)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Remarks Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-3 dark:text-gray-100">Financial Health Check</h3>
            <ul className="space-y-2 text-sm dark:text-gray-300">
              {currentMonth.categories.needs > totalIncome * 0.5 && (
                <li>⚠️ Needs spending exceeds 50% - consider reducing essential expenses</li>
              )}
              {currentMonth.categories.wants > totalIncome * 0.3 && (
                <li>⚠️ Wants spending exceeds 30% - review discretionary spending</li>
              )}
              {currentMonth.categories.savings < totalIncome * 0.2 && (
                <li>⚠️ Savings below 20% - prioritize saving goals</li>
              )}
              {currentMonth.balance < 0 && (
                <li>🚨 Negative balance - overspending detected!</li>
              )}
            </ul>
          </div>
        </div>

        {/* Right Column - Transactions Table */}
        <div className="md:col-span-2">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 w-auto">
                    Name
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100 w-32">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100 w-48">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100 w-40">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentMonth.transactions?.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 dark:text-gray-100 whitespace-normal break-words max-w-[200px]">
                      {transaction.name}
                    </td>
                    <td className={`px-4 py-4 text-center ${
                      transaction.amount > 0 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-600 dark:text-red-400"
                    }`}>
                      ₹{Math.abs(transaction.amount).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 dark:text-gray-100 text-center">
                      {new Date(transaction.date).toLocaleDateString("en-IN", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md dark:text-gray-100">
            <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                addTransaction(parseInt(year), month, {
                  name: formData.get("name"),
                  amount: parseFloat(formData.get("amount")),
                  date: formData.get("date") || new Date().toISOString(),
                  type: formData.get("type"),
                });
                setIsModalOpen(false);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Amount
                </label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Type
                </label>
                <select
                  name="type"
                  required
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="income">Income</option>
                  <option value="needs">Needs</option>
                  <option value="wants">Wants</option>
                  <option value="savings">Savings</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-gray-100 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlyDetail;
