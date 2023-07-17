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
import { Colors } from "../../../constants/Colors";
import InputFields from "../../components/ManageExpense/InputFields";
import PrimaryButton from "../../components/ui/PrimaryButton";
export default function SignUpScreen({ changeMethod }) {
  const [inputValue, setInputVAlue] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputVAlue((currValue) => {
      return { ...currValue, [inputIdentifier]: enteredValue };
    });
  }
  function submitHandler() {
    console.log(inputValue);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.maintitle}>Expency</Text>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>SignUp</Text>
        <View>
          <InputFields
            label="Email"
            textInputConfig={{
              autoCorrect: false,
              autoCapatalize: "none",
              onChangeText: inputChangeHandler.bind(this, "email"),
              value: inputValue.email,
            }}
          />
        </View>
        <View>
          <InputFields
            label="Password"
            textInputConfig={{
              autoCorrect: false,
              autoCapatalize: "none",
              onChangeText: inputChangeHandler.bind(this, "password"),
              value: inputValue.password,
            }}
          />
        </View>
        <View>
          <InputFields
            label="Confirm Password"
            textInputConfig={{
              autoCorrect: false,
              autoCapatalize: "none",
              onChangeText: inputChangeHandler.bind(this, "confirm_password"),
              value: inputValue.confirm_password,
            }}
          />
        </View>
        <View style={{ marginHorizontal: 5, marginTop: 8 }}>
          <PrimaryButton pressButton={submitHandler}>Signup</PrimaryButton>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footer_title}>
            Already have an account?
            <Text
              style={{ marginLeft: 3 }}
              onPress={() => changeMethod("signin")}
            >
              Log In
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    marginTop: 110,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subcontainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderColor: Colors.secondaryNav,
    elevation: 4,
  },
  maintitle: {
    fontSize: 25,
    marginBottom: 30,
  },
  footer: {
    marginVertical: 5,
    marginTop: 10,
  },
  footer_title: {
    textAlign: "center",
    fontSize: 12,
  },
});
