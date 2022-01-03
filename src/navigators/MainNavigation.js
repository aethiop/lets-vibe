import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/App/Room/Room";
import SearchScreen from "../screens/App/Search";
import SettingsScreen from "../screens/App/Settings";
import { createMenuNavigator } from "../components/organisms/MenuNavigator";
import AppNavigation from "./AppNavigator";
const Stack = createNativeStackNavigator();

export default function MainNavigation() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Home" component={AppNavigation} />
			<Stack.Screen name="Search" component={SearchScreen} />
			<Stack.Screen name="Settings" component={SettingsScreen} />
		</Stack.Navigator>
	);
}
