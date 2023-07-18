import { Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContent from "../../components/AuthComponents/AuthContent";
import { Login } from "../../util/http";
import { ExpensesContext } from "../../../store/Expenses-context";
import { useContext } from "react";
export default function LoginScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(ExpensesContext);
  function submitHandler() {
    navigation.replace("ExpensesOverview");
  }
  async function onAuthenticate(data) {
    try {
      const token = await Login(data.email, data.password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed");
    }
  }
  return (
    <AuthContent
      mode="Login"
      submitHandler={submitHandler}
      onAuthenticate={onAuthenticate}
    />
  );
}

const styles = StyleSheet.create({});
