import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/Auth/Register";
import LoginScreen from "../screens/Auth/Login";
const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
	return (
		<Stack.Navigator
			initialRouteName="Register"
			screenOptions={{
				headerShown: false,
				animationEnabled: false,
			}}
		>
			<Stack.Screen name="Register" component={RegisterScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	);
}
