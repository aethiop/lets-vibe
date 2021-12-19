import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/Auth/Register";
import HomeScreen from "../screens/App/Home";
const Stack = createNativeStackNavigator();

export default function MainNavigation() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} />
		</Stack.Navigator>
	);
}
