import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenses from "./src/screens/ManageExpenses";
import RecentExpenses from "./src/screens/RecentExpences";
import AllExpenses from "./src/screens/AllExpenses";
import { Colors } from "./constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./src/components/ui/IconButton";
import ExpensesContextProvider from "./store/Expenses-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

{
  /* <Drawer.Navigator>
  <Drawer.Screen>
    
  </Drawer.Screen>
</Drawer.Navigator> */
}
const ExpensesOverView = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primaryNav },
        headerTintColor: Colors.primaryNavIcon,
        tabBarStyle: { backgroundColor: Colors.primaryNav, paddingBottom: 8 },
        tabBarActiveTintColor: Colors.primaryNavIcon,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            pressButton={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="calendar" size={size} color={color} />;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ExpensesOverview"
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primaryNav },
              headerTintColor: Colors.primaryNavIcon,
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverView}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{ presentation: "modal" }}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
