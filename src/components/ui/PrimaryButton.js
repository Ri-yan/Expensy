import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";

export default function PrimaryButton({ children, pressButton, mode }) {
  return (
    <View>
      <Pressable
        onPress={pressButton}
        style={({ pressed }) => pressed && styles.pressed}
        android_ripple={true}
      >
        <View style={[styles.button,mode==='flat' && styles.flat]}>
          <Text style={[styles.buttonText,mode==='flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
    elevation: 2,
    marginHorizontal: 8,
  },
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.primaryNavIcon,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  flatText: {
    color: "purple",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "blue",
    borderRadius: 4,
  },
});
