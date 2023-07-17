import {
  StyleSheet,
  View,
  TextInput,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Colors from "../../constants/Colors.js";
import { useEffect, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import ExpensesOutput from "../components/shared/ExpensesOutput/ExpensesOutput.js";
import { ExpensesContext } from "../../store/Expenses-context.js";
import { getDateMinusDays } from "../util/date.js";
import { fetchExpenses } from "../util/http.js";
import Loading from "../components/ui/Loading.js";
import ErrorOverlay from "../components/ui/ErrorOverlay.js";

export default function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(false);
  const expensesCtx = useContext(ExpensesContext);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
        setIsLoading(false);
      } catch (error) {
        setError("Could not get expenses");
      }
    }
    getExpenses();
  }, []);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo;
  });
  function errorHandler() {
    setError(null);
  }
  if (isLoading) {
    return <Loading />;
  }
  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  return (
    <ExpensesOutput
      fallbackText={"No expenses"}
      expenses={recentExpenses}
      periodName="Last 7 days"
    ></ExpensesOutput>
  );
}

const styles = StyleSheet.create({
  container: {},
});
