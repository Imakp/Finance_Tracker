import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMonths } from "../contexts/MonthsContext";
import { useMonthlyDetail } from "../contexts/MonthlyDetailContext";
import { FiArrowLeft, FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import EditMonthModal from "../components/EditMonthModal";
import axios from "axios";

function MonthlyDetail() {
  const navigate = useNavigate();
  const { year, month } = useParams();
  const { deleteMonth } = useMonths();
  const {
    currentMonthDetail: currentMonth,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateMonthDetails,
  } = useMonthlyDetail();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transactions = currentMonth?.transactions || [];

  const handleDeleteMonth = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete the data for ${month} ${year}? This action cannot be undone.`
      )
    ) {
      return;
    }
    try {
      await axios.delete(`/api/months/${year}/${month}`);
      deleteMonth(year, month);
      navigate("/");
    } catch (err) {
      console.error("Error deleting month:", err);
      alert(
        err.response?.data?.message || err.message || "Failed to delete month."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center text-text-light-secondary dark:text-text-dark-secondary pt-10">
        Loading month details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-500 pt-10">
        Error: {error}
      </div>
    );
  }

  if (!currentMonth) {
    return (
      <div className="text-center text-text-light-secondary dark:text-text-dark-secondary pt-10">
        Month data not found for {month} {year}.
      </div>
    );
  }

  const categoryStyles = {
    needs: {
      bg: "bg-needs",
      text: "text-white",
      border: "border-needs",
      stroke: "stroke-needs",
      fill: "fill-needs",
    },
    wants: {
      bg: "bg-wants",
      text: "text-white",
      border: "border-wants",
      stroke: "stroke-wants",
      fill: "fill-wants",
    },
    savings: {
      bg: "bg-savings",
      text: "text-white",
      border: "border-savings",
      stroke: "stroke-savings",
      fill: "fill-savings",
    },
    income: {
      bg: "bg-income",
      text: "text-white",
      border: "border-income",
      stroke: "stroke-income",
      fill: "fill-income",
    },
    default: {
      bg: "bg-gray-500",
      text: "text-white",
      border: "border-gray-500",
      stroke: "stroke-gray-500",
      fill: "fill-gray-500",
    },
  };

  const getCategoryStyle = (type) => {
    return categoryStyles[type.toLowerCase()] || categoryStyles.default;
  };

  const totalIncome = currentMonth.income || 1;

  const handleEditMonth = async (updatedData) => {
    try {
      await updateMonthDetails(updatedData);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error updating month:", err);
      alert(err.message || "Failed to update month details.");
    }
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      await addTransaction(transactionData);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding transaction:", err);
      alert(err.message || "Failed to add transaction.");
    }
  };

  const handleUpdateTransaction = async (
    transactionId,
    updatedTransactionData
  ) => {
    try {
      await updateTransaction(transactionId, updatedTransactionData);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Error updating transaction:", err);
      alert(err.message || "Failed to update transaction.");
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (
      !window.confirm(
        `Are you sure you want to delete this transaction? This action cannot be undone.`
      )
    ) {
      return;
    }
    try {
      await deleteTransaction(transactionId);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert(err.message || "Failed to delete transaction.");
    }
  };

  return (
    <div>
      {/* Top bar: Use theme text/hover colors, adjust spacing */}
      <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full text-text-light-secondary dark:text-text-dark-secondary hover:bg-border-light dark:hover:bg-border-dark transition-colors duration-200"
            aria-label="Go back"
          >
            <FiArrowLeft size={20} />
          </button>
          {/* Use theme primary text color */}
          <h1 className="text-2xl font-semibold capitalize text-text-light-primary dark:text-text-dark-primary">
            {month} {year}
          </h1>
        </div>
        {/* Action buttons: Use theme colors, consistent styling */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors duration-200"
            onClick={() => setIsModalOpen(true)}
            aria-label="Add transaction"
          >
            <FiPlus size={18} />
          </button>
          {/* Consider adding a dedicated danger color to theme */}
          <button
            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
            onClick={handleDeleteMonth}
            aria-label="Delete month"
          >
            <FiTrash2 size={18} />
          </button>
          {/* Consider adding a dedicated success/edit color */}
          <button
            className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
            onClick={() => setIsEditModalOpen(true)}
            aria-label="Edit month"
          >
            <FiEdit size={18} />
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Financial Summary */}
        <div className="space-y-6 lg:space-y-8">
          {/* Monthly Breakdown Card */}
          <div className="bg-card-light dark:bg-card-dark p-5 rounded-lg border border-border-light dark:border-border-dark">
            <h2 className="text-lg font-semibold mb-5 text-text-light-primary dark:text-text-dark-primary">
              Monthly Breakdown
            </h2>
            <div className="space-y-5">
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

                const categoryStyle = getCategoryStyle(type);
                return (
                  <div key={type} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      {/* Use theme text colors */}
                      <span className="capitalize text-text-light-secondary dark:text-text-dark-secondary">
                        {type}
                      </span>
                      <span className="font-medium text-text-light-primary dark:text-text-dark-primary">
                        ₹{currentMonth.categories[type].toLocaleString()} / ₹
                        {Math.round(
                          totalIncome * (targetPercentage / 100)
                        ).toLocaleString()}
                      </span>
                    </div>
                    {/* Use theme border color for track, theme category color for fill */}
                    <div className="h-2 bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${categoryStyle.bg} transition-all duration-300 ease-in-out`}
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

          {/* Remarks Section Card */}
          <div className="bg-card-light dark:bg-card-dark p-5 rounded-lg border border-border-light dark:border-border-dark">
            <h3 className="text-lg font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
              Financial Health Check
            </h3>
            {/* Use theme text colors */}
            <ul className="space-y-2.5 text-sm text-text-light-secondary dark:text-text-dark-secondary">
              {currentMonth.categories.needs > totalIncome * 0.5 && (
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">⚠️</span> Needs
                  spending exceeds 50% - consider reducing essential expenses
                </li>
              )}
              {currentMonth.categories.wants > totalIncome * 0.3 && (
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">⚠️</span> Wants
                  spending exceeds 30% - review discretionary spending
                </li>
              )}
              {currentMonth.categories.savings < totalIncome * 0.2 && (
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">⚠️</span> Savings
                  below 20% - prioritize saving goals
                </li>
              )}
              {currentMonth.balance < 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">🚨</span> Negative
                  balance - overspending detected!
                </li>
              )}
              {/* Added check for no alerts */}
              {currentMonth.categories.needs <= totalIncome * 0.5 &&
                currentMonth.categories.wants <= totalIncome * 0.3 &&
                currentMonth.categories.savings >= totalIncome * 0.2 &&
                currentMonth.balance >= 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✅</span> Looking
                    good! Your budget follows the 50/30/20 rule.
                  </li>
                )}
            </ul>
          </div>
        </div>

        {/* Right Column - Transactions Table */}
        <div className="lg:col-span-2">
          {/* Use theme card/border colors */}
          <div className="rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
            {/* Removed min-w, let table be responsive */}
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-sm">
                {/* Use theme background/text colors for header */}
                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-border-light dark:border-border-dark">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-text-light-secondary dark:text-text-dark-secondary w-auto">
                      Name
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-text-light-secondary dark:text-text-dark-secondary w-32">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-text-light-secondary dark:text-text-dark-secondary w-40">
                      Date
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-text-light-secondary dark:text-text-dark-secondary w-36">
                      Category
                    </th>
                  </tr>
                </thead>
              </table>
              {/* Table body container with max height */}
              <div className="max-h-[calc(100vh-250px)] overflow-y-auto scrollbar-hide">
                {" "}
                {/* Adjust max-h as needed */}
                <table className="w-full text-sm">
                  {/* Use theme background/text/divider colors */}
                  <tbody className="divide-y divide-border-light dark:divide-border-dark bg-card-light dark:bg-card-dark">
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => {
                        const categoryStyle = getCategoryStyle(
                          transaction.type
                        );
                        const isIncome =
                          transaction.type.toLowerCase() === "income";
                        const amountColor = isIncome
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400";

                        return (
                          <tr
                            key={transaction._id}
                            onClick={() => setSelectedTransaction(transaction)}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors duration-150"
                          >
                            {/* Use theme text colors */}
                            <td className="px-4 py-3 text-text-light-primary dark:text-text-dark-primary whitespace-normal break-words w-auto">
                              {transaction.name}
                            </td>
                            <td
                              className={`px-4 py-3 text-center font-medium w-32 ${amountColor}`}
                            >
                              {isIncome ? "+" : "-"} ₹
                              {Math.abs(transaction.amount).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-text-light-secondary dark:text-text-dark-secondary text-center w-40">
                              {new Date(transaction.date).toLocaleDateString(
                                undefined,
                                {
                                  month: "long",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td className="px-4 py-3 text-center w-36">
                              {/* Use theme category styles for badge */}
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text} capitalize`}
                              >
                                {transaction.type}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-4 py-6 text-center text-text-light-secondary dark:text-text-dark-secondary"
                        >
                          No transactions found. Click the + button to add your
                          first transaction.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Footer table */}
              <table className="w-full text-sm">
                {/* Use theme background/text/border colors */}
                <tfoot className="bg-gray-50 dark:bg-gray-900/50 border-t border-border-light dark:border-border-dark">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-light-secondary dark:text-text-dark-secondary w-auto text-right">
                      Balance
                    </td>
                    <td
                      className={`px-4 py-3 text-center font-semibold w-32 ${
                        currentMonth.balance >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      ₹{currentMonth.balance.toLocaleString()}{" "}
                      {/* Show actual balance with sign */}
                    </td>
                    {/* Keep empty cells for alignment */}
                    <td className="px-4 py-3 w-40"></td>
                    <td className="px-4 py-3 w-36"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        // Use a slightly darker overlay
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Apply theme card styles */}
          <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 w-full max-w-md border border-border-light dark:border-border-dark">
            {/* Apply theme text styles */}
            <h2 className="text-xl font-semibold mb-5 text-text-light-primary dark:text-text-dark-primary">
              Add New Transaction
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newTransaction = {
                  name: formData.get("name"),
                  amount: parseFloat(formData.get("amount")),
                  date: formData.get("date") || new Date().toISOString(),
                  type: formData.get("type"),
                };
                handleAddTransaction(newTransaction);
                setIsModalOpen(false);
              }}
            >
              {/* Apply theme text/input styles */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5 text-text-light-secondary dark:text-text-dark-secondary">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
                  placeholder="e.g., Groceries, Salary"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5 text-text-light-secondary dark:text-text-dark-secondary">
                  Amount
                </label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
                  placeholder="e.g., 50.00"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5 text-text-light-secondary dark:text-text-dark-secondary">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-1.5 text-text-light-secondary dark:text-text-dark-secondary">
                  Category
                </label>
                <select
                  name="type"
                  required
                  className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
                >
                  <option value="" disabled defaultValue>
                    Select category
                  </option>{" "}
                  {/* Fixed selected to defaultValue */}
                  <option value="income">Income</option>
                  <option value="needs">Needs</option>
                  <option value="wants">Wants</option>
                  <option value="savings">Savings</option>
                </select>
              </div>

              {/* Apply theme button styles */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 rounded-md text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-hover transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Month Modal - Removed duplicate */}
      {isEditModalOpen && (
        <EditMonthModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          currentMonth={currentMonth}
          onUpdate={handleEditMonth}
        />
      )}

      {/* Edit Transaction Modal */}
      {selectedTransaction && (
        // Use a slightly darker overlay
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Apply theme card styles */}
          <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 w-full max-w-md border border-border-light dark:border-border-dark">
            {/* Apply theme text styles */}
            <h2 className="text-xl font-semibold mb-5 text-text-light-primary dark:text-text-dark-primary">
              Edit Transaction
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedTransactionData = {
                  name: formData.get("name"),
                  amount: Math.abs(parseFloat(formData.get("amount"))),
                  date: formData.get("date"),
                  type: formData.get("type"),
                };

                handleUpdateTransaction(
                  selectedTransaction._id,
                  updatedTransactionData
                );
              }}
            >
              {/* Apply theme text/input styles */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5 text-text-light-secondary dark:text-text-dark-secondary">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={selectedTransaction?.name}
                  className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5 text-text-light-secondary dark:text-text-dark-secondary">
                  Amount
                </label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  defaultValue={Math.abs(selectedTransaction?.amount)}
                  className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5 text-text-light-secondary dark:text-text-dark-secondary">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  required
                  defaultValue={
                    new Date(selectedTransaction.date)
                      .toISOString()
                      .split("T")[0]
                  }
                  className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium mb-1.5 text-text-light-secondary dark:text-text-dark-secondary">
                  Category
                </label>
                <select
                  name="type"
                  required
                  defaultValue={selectedTransaction.type}
                  className="w-full p-2 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary focus:ring-primary focus:border-primary"
                >
                  <option value="income">Income</option>
                  <option value="needs">Needs</option>
                  <option value="wants">Wants</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
              {/* Apply theme button styles */}
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteTransaction(selectedTransaction._id)
                  }
                  className="px-4 py-1.5 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                  aria-label="Delete transaction"
                >
                  Delete
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTransaction(null)}
                    className="px-4 py-1.5 rounded-md text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-hover transition-colors"
                  >
                    Update Transaction
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
