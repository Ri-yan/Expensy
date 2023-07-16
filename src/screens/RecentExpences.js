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

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo;
  });
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
