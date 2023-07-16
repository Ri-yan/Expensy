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

export default function IconButton({ icon, size, color, pressButton }) {
  return (
    <Pressable
      onPress={pressButton}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={true}
    >
      <View style={styles.container}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
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
  pressed: {
    opacity: 0.75,
  },
});
