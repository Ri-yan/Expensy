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
  ActivityIndicator,
  Button,
} from "react-native";
import PrimaryButton from "../ui/PrimaryButton";

import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
export default function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occured</Text>
      <Text style={styles.text}>{message}</Text>
      <PrimaryButton pressButton={onConfirm}>Okay</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "24",
    backgroundColor: Colors.primaryNavIcon,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
