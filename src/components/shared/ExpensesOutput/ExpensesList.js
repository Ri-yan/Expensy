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
import ExpenseItem from "./ExpenseItem";
export default function ExpensesList({ expenses, periodName }) {
  const renderExpenses = (itemData) => {
    return (
      <ExpenseItem
        id={itemData.item.id}
        description={itemData.item.description}
        amount={itemData.item.amount}
        date={itemData.item.date}
      />
    );
  };
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenses}
    />
  );
}

const styles = StyleSheet.create({});
