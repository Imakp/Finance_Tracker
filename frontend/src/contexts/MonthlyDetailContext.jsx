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
  const { year, month } = useParams();
  const [currentMonthDetail, setCurrentMonthDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMonthlyDetail = useCallback(async () => {
    if (!year || !month) return;

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
      setCurrentMonthDetail(null);
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    fetchMonthlyDetail();
  }, [fetchMonthlyDetail]);

  const addTransaction = async (transactionData) => {
    if (!currentMonthDetail) return;
    try {
      const response = await axios.post(
        `/api/months/${year}/${month}/transactions`,
        transactionData
      );
      await fetchMonthlyDetail();
      return response.data;
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError(err.response?.data?.message || "Failed to add transaction");
      throw err;
    }
  };

  const updateTransaction = async (transactionId, updatedData) => {
    if (!currentMonthDetail) return;
    try {
      const response = await axios.put(
        `/api/months/${year}/${month}/transactions/${transactionId}`,
        updatedData
      );
      await fetchMonthlyDetail();
      return response.data;
    } catch (err) {
      console.error("Error updating transaction:", err);
      setError(err.response?.data?.message || "Failed to update transaction");
      throw err;
    }
  };

  const deleteTransaction = async (transactionId) => {
    if (!currentMonthDetail) return;
    try {
      await axios.delete(
        `/api/months/${year}/${month}/transactions/${transactionId}`
      );
      await fetchMonthlyDetail();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError(err.response?.data?.message || "Failed to delete transaction");
      throw err;
    }
  };

  const updateMonthDetails = async (updatedData) => {
    if (!currentMonthDetail) return;
    try {
      const response = await axios.put(
        `/api/months/${year}/${month}`,
        updatedData
      );
      await fetchMonthlyDetail();
      return response.data;
    } catch (err) {
      console.error("Error updating month details:", err);
      setError(err.response?.data?.message || "Failed to update month details");
      throw err;
    }
  };

  const value = {
    currentMonthDetail,
    loading,
    error,
    fetchMonthlyDetail,
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
