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
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ExpensesOutput from "../components/shared/ExpensesOutput/ExpensesOutput.js";
import { ExpensesContext } from "../../store/Expenses-context.js";
export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput  fallbackText={'No expenses'}  expenses={expensesCtx.expenses} periodName="Total"></ExpensesOutput>
  );
}

const styles = StyleSheet.create({
  container: {},
});
