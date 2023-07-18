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
import PrimaryButton from "../../components/ui/PrimaryButton";
import InputFields from "../../components/ManageExpense/InputFields";
import AuthForm from "../../components/AuthComponents/AuthForm";

import { Colors } from "../../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function AuthContent({ mode, submitHandler,onAuthenticate }) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirm_password: false,
  });
  function submit(credentials) {
    let { email, password, confirm_password } = credentials;
    console.log("Auth Content", email, password, confirm_password);
    email = email.trim();
    password = password.trim();
    let passwordsAreEqual=true;
    if (confirm_password) {
      confirm_password = confirm_password.trim();
      passwordsAreEqual = password === confirm_password
    }
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;

    if (!emailIsValid || !passwordIsValid || !passwordsAreEqual) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirm_password: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  //   function submit() {
  //     submitHandler();
  //   }
  return (
    <View style={styles.container}>
      <AuthForm
        mode={mode}
        submit={submit}
        credentialsInvalid={credentialsInvalid}
      />
      {mode == "Login" ? (
        <View style={styles.footer}>
          <Text style={styles.footer_title}>
            Need an account?
            <Text
              style={{ marginLeft: 3 }}
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      ) : (
        <View style={styles.footer}>
          <Text style={styles.footer_title}>
            Already have an account?
            <Text
              style={{ marginLeft: 3 }}
              onPress={() => navigation.navigate("SignIn")}
            >
              Log In
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 24,
    paddingTop: 120,
    alignItems: "stretch",
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
