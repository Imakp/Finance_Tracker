import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const MonthsContext = createContext();

export function MonthsProvider({ children }) {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios.get("/api/months");
        setMonths(response.data);
      } catch (error) {
        console.error("Error fetching months:", error);
      }
    };
    fetchMonths();
  }, []);

  const addMonth = async (monthData) => {
    try {
      const response = await axios.post("/api/months", monthData);
      const newMonth = {
        ...response.data,
        transactions: [],
        income: 0,
        categories: {
          needs: 0,
          wants: 0,
          savings: 0,
        },
        balance: 0,
      };
      setMonths((prevMonths) => [...prevMonths, newMonth]);
    } catch (error) {
      console.error("Error creating month:", error);
      throw error;
    }
  };

  const addTransaction = (year, month, transaction) => {
    setMonths((prev) =>
      prev.map((m) => {
        if (m.year === year && m.month.toLowerCase() === month.toLowerCase()) {
          const isIncome = transaction.type === "income";
          const amount = isIncome
            ? Math.abs(transaction.amount)
            : -Math.abs(transaction.amount);

          // Add the new transaction
          const updatedTransactions = [
            ...m.transactions,
            { ...transaction, amount },
          ];

          // Recalculate totals from all transactions
          const totals = updatedTransactions.reduce(
            (acc, t) => {
              const transAmount = Math.abs(t.amount);
              if (t.type === "income") {
                acc.income += transAmount;
              } else {
                acc.categories[t.type] =
                  (acc.categories[t.type] || 0) + transAmount;
              }
              acc.balance += t.amount; // Use signed amount for balance
              return acc;
            },
            {
              income: 0,
              categories: {
                needs: 0,
                wants: 0,
                savings: 0,
              },
              balance: 0,
            }
          );

          return {
            ...m,
            transactions: updatedTransactions,
            income: totals.income,
            categories: totals.categories,
            balance: totals.balance,
          };
        }
        return m;
      })
    );
  };

  const updateTransaction = (year, month, index, updatedTransaction) => {
    setMonths((prev) =>
      prev.map((m) => {
        if (m.year === year && m.month.toLowerCase() === month.toLowerCase()) {
          const transactions = [...m.transactions];
          transactions[index] = updatedTransaction;

          // Recalculate totals
          const totals = transactions.reduce(
            (acc, t) => {
              const transAmount = Math.abs(t.amount);
              if (t.type === "income") {
                acc.income += transAmount;
              } else {
                acc.categories[t.type] =
                  (acc.categories[t.type] || 0) + transAmount;
              }
              acc.balance += t.amount;
              return acc;
            },
            {
              income: 0,
              categories: { needs: 0, wants: 0, savings: 0 },
              balance: 0,
            }
          );

          return {
            ...m,
            transactions,
            income: totals.income,
            categories: totals.categories,
            balance: totals.balance,
          };
        }
        return m;
      })
    );
  };

  const deleteTransaction = (year, month, index) => {
    setMonths((prev) =>
      prev.map((m) => {
        if (m.year === year && m.month.toLowerCase() === month.toLowerCase()) {
          const transactions = m.transactions.filter((_, i) => i !== index);

          // Recalculate totals
          const totals = transactions.reduce(
            (acc, t) => {
              const transAmount = Math.abs(t.amount);
              if (t.type === "income") {
                acc.income += transAmount;
              } else {
                acc.categories[t.type] =
                  (acc.categories[t.type] || 0) + transAmount;
              }
              acc.balance += t.amount;
              return acc;
            },
            {
              income: 0,
              categories: { needs: 0, wants: 0, savings: 0 },
              balance: 0,
            }
          );

          return {
            ...m,
            transactions,
            income: totals.income,
            categories: totals.categories,
            balance: totals.balance,
          };
        }
        return m;
      })
    );
  };

  return (
    <MonthsContext.Provider
      value={{
        months,
        addMonth,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </MonthsContext.Provider>
  );
}

export function useMonths() {
  const context = useContext(MonthsContext);
  if (!context) {
    throw new Error("useMonths must be used within a MonthsProvider");
  }
  return context;
}
