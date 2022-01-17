import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/App/Room/Room";
import SearchScreen from "../screens/App/Search";
import SettingsScreen from "../screens/App/Settings";
import { createMenuNavigator } from "../components/organisms/MenuNavigator";
import AppNavigation from "./AppNavigator";
import FriendScreen from "../screens/App/Friends";
import NotificationScreen from "../screens/App/Notifications";
import ProfileScreen from "../screens/App/Profile";
import RoomScreen from "../screens/App/Chat/Room/Room";
const Stack = createStackNavigator();

export default function MainNavigation() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animationEnabled: false,
			}}
		>
			<Stack.Screen name="Home" component={AppNavigation} />
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen name="Room" component={RoomScreen} />
			<Stack.Screen name="Search" component={SearchScreen} />
			<Stack.Screen name="Settings" component={SettingsScreen} />
			<Stack.Screen name="Friends" component={FriendScreen} />
			<Stack.Screen name="Notifications" component={NotificationScreen} />
		</Stack.Navigator>
	);
}
