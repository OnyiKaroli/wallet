import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

//const API_URL = "https://wallet-api-impk.onrender.com/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch summary function (was missing)
  const fetchSummary = useCallback(async () => {
    if (!userId) {
      console.log("No userId provided for summary");
      return;
    }

    console.log("Fetching summary for userId:", userId);
    // Change this URL to include "transactions" in the path
    console.log("Full URL:", `${API_URL}/transactions/summary/${userId}`);

    try {
      // Updated URL here
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      console.log("Summary response status:", response.status);
      console.log(
        "Summary response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // Get the raw text first
      const responseText = await response.text();
      console.log("Raw summary response:", responseText);

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed summary data:", data);
      } catch (parseError) {
        console.error("Failed to parse summary JSON:", parseError);
        console.log("Response was:", responseText.substring(0, 200));
        return;
      }

      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary({ balance: 0, income: 0, expense: 0 });
    }
  }, [userId]);

  const fetchTransactions = useCallback(async () => {
    if (!userId) {
      console.log("No userId provided for transactions");
      return;
    }

    console.log("Fetching transactions for userId:", userId);
    console.log("Full URL:", `${API_URL}/transactions/${userId}`);

    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      console.log("Transactions response status:", response.status);

      // Get the raw text first
      const responseText = await response.text();
      console.log("Raw transactions response:", responseText);

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed transactions data:", data);
      } catch (parseError) {
        console.error("Failed to parse transactions JSON:", parseError);
        console.log("Response was:", responseText.substring(0, 200));
        setTransactions([]);
        return;
      }

      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });

      // Fixed condition - should check if response is NOT ok
      if (!response.ok) throw new Error("Failed to delete transaction");

      // Refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", "Failed to delete transaction");
    }
  };

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
    fetchTransactions,
    fetchSummary,
  };
};
