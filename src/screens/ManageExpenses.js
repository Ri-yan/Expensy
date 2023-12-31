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
import {
  storeExpense,
  updateExpense,
  deleteExpense,
  deleteExpenseFromFB,
} from "../util/http.js";
import Loading from "../components/ui/Loading.js";
import ErrorOverlay from "../components/ui/ErrorOverlay.js";
import ImagePicker from "../components/ImagePicker.js";
import GeoLocation from "../components/GeoLocation.js";

export default function ManageExpenses({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpensesContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  const deleteExpenseHandler = () => {
    expenseCtx.deleteExpense(editedExpenseId);
    deleteExpenseFromFB(editedExpenseId);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      setIsLoading(true);
      try {
        await updateExpense(editedExpenseId, {
          ...expenseData,
          userId: expenseCtx.token,
        });
        expenseCtx.updateExpense(editedExpenseId, expenseData);
      } catch (error) {
        setError("Could not update expenses");
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      try {
        const id = await storeExpense({
          ...expenseData,
          userId: expenseCtx.token,
        });
        expenseCtx.addExpense({
          ...expenseData,
          id: id,
          userId: expenseCtx.token,
        });
      } catch (error) {
        setError("Could not add expenses");
      }
      setIsLoading(false);
    }
    console.log(expenseData)
    navigation.goBack();
  };
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  if (isLoading) {
    return <Loading />;
  }
  function errorHandler() {
    setError(null);
  }
  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  return (
    <ScrollView
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: Colors.primaryBackground,
      }}
    >
      <View style={styles.container}>
        {/* {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              size={24}
              color={Colors.primaryNavIcon}
              pressButton={deleteExpenseHandler}
            />
          </View>
        )} */}
        <ExpenseForm
          confirmHandler={confirmHandler}
          submitButtonLable={isEditing ? "Update" : "Add"}
          cancelHandler={cancelHandler}
          defaultValue={selectedExpense}
          deleteExpenseHandler={deleteExpenseHandler}
          isEditing={isEditing}
        />
        {/* <ImagePicker />
        <GeoLocation /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: Colors.primaryBackground,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: "purple",
    borderBottomWidth: 2,
    alignItems: "center",
  },
});
