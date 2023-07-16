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
  Button,
} from "react-native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/ui/IconButton.js";
import PrimaryButton from "../components/ui/PrimaryButton.js";
import { ExpensesContext } from "../../store/Expenses-context.js";
import { Colors } from "../../constants/Colors.js";
import ExpenseForm from "../components/ManageExpense/ExpenseForm.js";

export default function ManageExpenses({ navigation, route }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpensesContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  const deleteExpense = () => {
    expenseCtx.deleteExpenses(editedExpenseId);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = (expenseData) => {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  return (
    <View style={styles.container}>
      <ExpenseForm
        confirmHandler={confirmHandler}
        submitButtonLable={isEditing ? "Update" : "Add"}
        cancelHandler={cancelHandler}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={24}
            color={Colors.primaryNavIcon}
            pressButton={deleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primaryBackground,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: "purple",
    borderTopWidth: 2,
    alignItems: "center",
  },
});
