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
import ExpensesSummary from "./ExpensesSummary.js";
import ExpensesList from "./ExpensesList.js";
import { Colors } from "../../../../constants/Colors.js";
const DUMMY = [
  {
    id: "1",
    description: "shirt and pant",
    amount: 22.3,
    date: new Date("2021-12-13"),
  },
  {
    id: "2",
    description: "lowers",
    amount: 32,
    date: new Date("2021-12-13"),
  },
  {
    id: "3",
    description: "Tshirt",
    amount: 424,
    date: new Date("2021-12-13"),
  },
  {
    id: "4",
    description: "burger",
    amount: 54,
    date: new Date("2021-12-13"),
  },
];
export default function ExpensesOutput({ expenses, periodName,fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>
  if(expenses.length>0){
    content= <ExpensesList expenses={expenses} periodName={periodName}></ExpensesList>

  }

  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={expenses}
        periodName={periodName}
      ></ExpensesSummary>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:24,
        paddingBottom:0,
        paddingHorizontal:24,
        backgroundColor:Colors.primaryBackground
    },
    infoText:{
      fontSize:16,
      color:Colors.primaryNavIcon,
      textAlign:'center',
      marginTop:32
    }
});
