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
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import InputFields from "./InputFields";
import { Colors } from "../../../constants/Colors";
import PrimaryButton from "../ui/PrimaryButton";
export default function ExpenseForm({
  cancelHandler,
  submitButtonLable,
  confirmHandler,
  defaultValue,
}) {
  const [inputValue, setInputVAlue] = useState({
    amount: defaultValue ? defaultValue.amount.toString() : "",
    date: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : "",
    description: defaultValue ? defaultValue.description.toString() : "",
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputVAlue((currValue) => {
      return { ...currValue, [inputIdentifier]: enteredValue };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };
    const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionValid = expenseData.description.trim().length > 0;
    if (!amountValid || !dateValid || !descriptionValid) {
      Alert.alert("Invalid input", "Please check input");
      return;
    }
    confirmHandler(expenseData);
  }
  return (
    <View style={styles.forrm}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <InputFields
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount,
          }}
        />
        <InputFields
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date,
          }}
        />
      </View>

      <InputFields
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapatalize: "none",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description,
        }}
      />
      <View style={styles.buttons}>
        <PrimaryButton mode="flat" pressButton={cancelHandler}>
          Cancel
        </PrimaryButton>
        <PrimaryButton mode="flat" pressButton={submitHandler}>
          {submitButtonLable}
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forrm: {
    marginTop: 80,
  },
  title: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryNavIcon,
    textAlign: "center",
    marginVertical: 24,
  },
  buttons: {
    marginTop:100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
