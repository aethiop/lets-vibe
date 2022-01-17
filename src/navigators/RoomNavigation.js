import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/Auth/Register";
import LoginScreen from "../screens/Auth/Login";
import ShowRooms from "../screens/App/Room/ShowRooms";
import Room from "../Screens/App/Room/Room";
import Model from "../components/molecules/RoomComponents/Model";
const Stack = createNativeStackNavigator();

export default function RoomNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Rooms"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Rooms" component={Room} />
      <Stack.Screen
        name="Room"
        component={Model}
        initialParams={{
          name: "",
          description: "",
        }}
      />
    </Stack.Navigator>
  );
}
