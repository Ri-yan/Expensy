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
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
export default function AuthScreen() {
  const [method, setMethod] = useState("signin");
  function changeMethod(method) {
    setMethod(method);
  }
  if (method === "signin") {
    return <LoginScreen changeMethod={changeMethod} />;
  } else if (method === "signup")
    return <SignUpScreen changeMethod={changeMethod} />;
}

const styles = StyleSheet.create({});
