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
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import InputFields from "../../components/ManageExpense/InputFields";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "../../components/AuthComponents/AuthForm";
import AuthContent from "../../components/AuthComponents/AuthContent";
import { SignUp } from "../../util/http";
import { ExpensesContext } from "../../../store/Expenses-context";
export default function SignUpScreen() {
  const authCtx = useContext(ExpensesContext);

  const navigation = useNavigation();
  function submitHandler() {
    navigation.replace("ExpensesOverview");
  }
  async function onAuthenticate(data){
    try {
      const token = await SignUp(data.email,data.password)
      authCtx.authenticate(token)
      // submitHandler()
    } catch (error) {
      Alert.alert('Authentication failed')
    }
  }
  return (
   <AuthContent mode="Signup" submitHandler={submitHandler} onAuthenticate={onAuthenticate}/>
  );
}

const styles = StyleSheet.create({
  
});
