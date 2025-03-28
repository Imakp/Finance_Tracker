import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MonthlyDetailContext = createContext();

export function MonthlyDetailProvider({ children }) {
  const { year, month } = useParams(); // Get year/month from URL params
  const [currentMonthDetail, setCurrentMonthDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMonthlyDetail = useCallback(async () => {
    if (!year || !month) return; // Don't fetch if params aren't available

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/months/${year}/${month}`);
      setCurrentMonthDetail(response.data);
    } catch (err) {
      console.error("Error fetching monthly detail:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch month details"
      );
      setCurrentMonthDetail(null); // Clear data on error
    } finally {
      setLoading(false);
    }
  }, [year, month]); // Dependency array includes year and month

  // Fetch data when year/month params change
  useEffect(() => {
    fetchMonthlyDetail();
  }, [fetchMonthlyDetail]); // Use the memoized fetch function

  // --- CRUD Operations ---

  // CREATE Transaction
  const addTransaction = async (transactionData) => {
    if (!currentMonthDetail) return;
    try {
      const response = await axios.post(
        `/api/months/${year}/${month}/transactions`,
        transactionData
      );
      // Optimistically update UI or refetch
      // For simplicity, refetching ensures consistency
      await fetchMonthlyDetail();
      return response.data; // Return the newly created transaction
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError(err.response?.data?.message || "Failed to add transaction");
      throw err; // Re-throw error for component handling
    }
  };

  // UPDATE Transaction
  const updateTransaction = async (transactionId, updatedData) => {
    if (!currentMonthDetail) return;
    try {
      const response = await axios.put(
        `/api/months/${year}/${month}/transactions/${transactionId}`,
        updatedData
      );
      // Refetch to update the state
      await fetchMonthlyDetail();
      return response.data; // Return the updated transaction
    } catch (err) {
      console.error("Error updating transaction:", err);
      setError(err.response?.data?.message || "Failed to update transaction");
      throw err;
    }
  };

  // DELETE Transaction
  const deleteTransaction = async (transactionId) => {
    if (!currentMonthDetail) return;
    try {
      await axios.delete(
        `/api/months/${year}/${month}/transactions/${transactionId}`
      );
      // Refetch to update the state
      await fetchMonthlyDetail();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError(err.response?.data?.message || "Failed to delete transaction");
      throw err;
    }
  };

  // UPDATE Month Details (e.g., remarks, budget goals - if applicable)
  const updateMonthDetails = async (updatedData) => {
    if (!currentMonthDetail) return;
    try {
      const response = await axios.put(
        `/api/months/${year}/${month}`,
        updatedData
      );
      // Refetch to update the state
      await fetchMonthlyDetail();
      return response.data;
    } catch (err) {
      console.error("Error updating month details:", err);
      setError(err.response?.data?.message || "Failed to update month details");
      throw err;
    }
  };

  // DELETE Month (Handled by MonthsContext, but could be added here if needed for specific detail view logic)
  // const deleteCurrentMonth = async () => { ... }

  const value = {
    currentMonthDetail,
    loading,
    error,
    fetchMonthlyDetail, // Expose refetch if needed manually
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateMonthDetails,
  };

  return (
    <MonthlyDetailContext.Provider value={value}>
      {children}
    </MonthlyDetailContext.Provider>
  );
}

export function useMonthlyDetail() {
  const context = useContext(MonthlyDetailContext);
  if (context === undefined) {
    throw new Error(
      "useMonthlyDetail must be used within a MonthlyDetailProvider"
    );
  }
  return context;
}
