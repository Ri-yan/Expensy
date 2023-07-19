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
import InputFields from "../ManageExpense/InputFields";
import { Colors } from "../../../constants/Colors";
import PrimaryButton from "../ui/PrimaryButton";

export default function AuthForm({ mode, submit, credentialsInvalid }) {
  const [inputValue, setInputVAlue] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  function inputChangeHandler(
    inputIdentifier,
    enteredValue,
    credentialsInvalid
  ) {
    setInputVAlue((currValue) => {
      return { ...currValue, [inputIdentifier]: enteredValue };
    });
  }
  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;
  function onSubmit() {
    submit({
      email: inputValue.email,
      password: inputValue.password,
      confirm_password: inputValue.confirm_password,
    });
    console.log(inputValue);
  }
  return (
    <View>
      <Text style={styles.maintitle}>Expency</Text>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>{mode}</Text>
        <View style={{ height: 60, marginTop: 10 }}>
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
        <View style={{ height: 60, marginTop: 10 }}>
          <InputFields
            label="Password"
            textInputConfig={{
              autoCorrect: false,
              autoCapatalize: "none",
              secureTextEntry: true,
              onChangeText: inputChangeHandler.bind(this, "password"),
              value: inputValue.password,
            }}
          />
        </View>
        {mode === "Signup" && (
          <View style={{ height: 60, marginTop: 10 }}>
            <InputFields
              label="Confirm Password"
              textInputConfig={{
                autoCorrect: false,
                autoCapatalize: "none",
                secureTextEntry: true,
                onChangeText: inputChangeHandler.bind(this, "confirm_password"),
                value: inputValue.confirm_password,
              }}
            />
          </View>
        )}
        <View style={{ marginHorizontal: 5, marginTop: 20 }}>
          <PrimaryButton mode="" pressButton={onSubmit}>
            {mode}
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subcontainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "dashed",
    padding: 15,
    marginVertical: 10,
    borderColor: Colors.primaryNavIcon,
  },
  maintitle: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
    color: Colors.secondaryNav,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.secondaryNav,
    textAlign: "center",
  },
});
