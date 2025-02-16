import { createContext, useState, useContext, useEffect } from "react";

const MonthsContext = createContext();

export function MonthsProvider({ children }) {
  const [months, setMonths] = useState(() => {
    const saved = localStorage.getItem("months");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("months", JSON.stringify(months));
  }, [months]);

  const addMonth = (monthData) => {
    setMonths((prevMonths) => [
      ...prevMonths,
      {
        ...monthData,
        transactions: [],
      },
    ]);
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

  return (
    <MonthsContext.Provider value={{ months, addMonth, addTransaction }}>
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
