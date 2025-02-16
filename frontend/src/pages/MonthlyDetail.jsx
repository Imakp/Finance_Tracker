import { useParams, useNavigate } from "react-router-dom";
import { useMonths } from "../contexts/MonthsContext";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

function MonthlyDetail() {
  const navigate = useNavigate();
  const { year, month } = useParams();
  const { months, addTransaction, updateTransaction, deleteTransaction } =
    useMonths();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState(-1);

  const currentMonth = months.find(
    (m) =>
      m.month.toLowerCase() === month.toLowerCase() && m.year === parseInt(year)
  );

  if (!currentMonth) {
    return <div className="container mx-auto px-4 pt-20">Month not found</div>;
  }

  const getCategoryColor = (type) => {
    const colors = {
      needs: "bg-blue-200 text-blue-800 dark:bg-blue-500 dark:text-sky-50",
      wants:
        "bg-yellow-200 text-yellow-800 dark:bg-yellow-500 dark:text-lime-50",
      savings:
        "bg-green-200 text-green-800 dark:bg-green-500 dark:text-emerald-50",
      income:
        "bg-purple-200 text-purple-800 dark:bg-purple-500 dark:text-fuchsia-50",
    };
    return colors[type.toLowerCase()] || "bg-gray-100";
  };

  const totalIncome = currentMonth.income || 1;

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <FiArrowLeft
              size={20}
              className="text-gray-900 dark:text-gray-100"
            />
          </button>
          <h1 className="text-xl font-bold capitalize text-gray-900 dark:text-gray-100">
            {month} {year}
          </h1>
        </div>
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
              {["needs", "wants", "savings"].map((type) => {
                const actualPercentage =
                  totalIncome > 0
                    ? (currentMonth.categories[type] / totalIncome) * 100
                    : 0;
                const targetPercentage = {
                  needs: 50,
                  wants: 30,
                  savings: 20,
                }[type];

                return (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize dark:text-gray-300">
                        {type}
                      </span>
                      <span className="dark:text-gray-300">
                        ₹{currentMonth.categories[type].toLocaleString()} / ₹
                        {Math.round(
                          totalIncome * (targetPercentage / 100)
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                      <div
                        className={`h-full rounded-full ${getCategoryColor(
                          type
                        )}`}
                        style={{
                          width: `${Math.min(
                            (
                              (actualPercentage / targetPercentage) *
                              100
                            ).toFixed(2),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Target: {targetPercentage}% (
                      {((actualPercentage / targetPercentage) * 100).toFixed(2)}
                      % of goal)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Remarks Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-3 dark:text-gray-100">
              Financial Health Check
            </h3>
            <ul className="space-y-2 text-sm dark:text-gray-300">
              {currentMonth.categories.needs > totalIncome * 0.5 && (
                <li>
                  ⚠️ Needs spending exceeds 50% - consider reducing essential
                  expenses
                </li>
              )}
              {currentMonth.categories.wants > totalIncome * 0.3 && (
                <li>
                  ⚠️ Wants spending exceeds 30% - review discretionary spending
                </li>
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
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900 dark:text-gray-100 w-auto">
                    Name
                  </th>
                  <th className="px-4 py-3 text-center text-base font-medium text-gray-900 dark:text-gray-100 w-32">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-center text-base font-medium text-gray-900 dark:text-gray-100 w-48">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center text-base font-medium text-gray-900 dark:text-gray-100 w-40">
                    Type
                  </th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[68vh] overflow-y-auto scrollbar-hide">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentMonth.transactions?.map((transaction, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setSelectedTransactionIndex(index);
                      }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <td className="px-4 py-4 dark:text-gray-100 whitespace-normal break-words max-w-[200px] w-auto">
                        {transaction.name}
                      </td>
                      <td
                        className={`px-4 py-4 text-center w-32 ${
                          transaction.amount > 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        ₹{Math.abs(transaction.amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 dark:text-gray-100 text-center w-48">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-IN",
                          {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-4 text-center w-40">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                            transaction.type
                          )}`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <table className="w-full">
              <tfoot className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold dark:text-gray-100 w-auto text-right">
                    Total
                  </td>
                  <td
                    className={`px-4 py-3 text-sm text-center font-semibold w-32 ${
                      currentMonth.balance >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    ₹{Math.abs(currentMonth.balance).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 w-48"></td>
                  <td className="px-4 py-3 w-40"></td>
                </tr>
              </tfoot>
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

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md dark:text-gray-100">
            <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedTransaction = {
                  name: formData.get("name"),
                  amount: parseFloat(formData.get("amount")),
                  date: formData.get("date"),
                  type: formData.get("type"),
                };

                // Preserve amount sign based on type
                updatedTransaction.amount =
                  updatedTransaction.type === "income"
                    ? Math.abs(updatedTransaction.amount)
                    : -Math.abs(updatedTransaction.amount);

                updateTransaction(
                  parseInt(year),
                  month,
                  selectedTransactionIndex,
                  updatedTransaction
                );
                setSelectedTransaction(null);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={selectedTransaction?.name}
                  className="w-full p-2 border rounded-md dark:bg-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  defaultValue={Math.abs(selectedTransaction?.amount)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  name="date"
                  type="date"
                  required
                  defaultValue={
                    new Date(selectedTransaction.date)
                      .toISOString()
                      .split("T")[0]
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  name="type"
                  required
                  defaultValue={selectedTransaction.type}
                  className="w-full p-2 border rounded-md dark:bg-gray-700"
                >
                  <option value="income">Income</option>
                  <option value="needs">Needs</option>
                  <option value="wants">Wants</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    deleteTransaction(
                      parseInt(year),
                      month,
                      selectedTransactionIndex
                    );
                    setSelectedTransaction(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedTransaction(null)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlyDetail;
