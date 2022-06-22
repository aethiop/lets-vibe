import React, { useEffect } from "react";
import { useAuth } from "../hooks/useGun";
import AuthNavigation from "../navigators/AuthNavigation";
import MainNavigation from "../navigators/MainNavigation";
import ProfileScreen from "./App/Profile";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Main Auth Guard
export default function Main() {
	const { isAuthed } = useAuth();
	return (
		<Stack.Navigator>
			{isAuthed ? (
				<Stack.Screen
					options={{ headerShown: false }}
					name="Main"
					component={MainNavigation}
				/>
			) : (
				<Stack.Screen
					options={{
						headerShown: false,
						animationTypeForReplace: !isAuthed ? "push" : "pop",
					}}
					name="Auth"
					component={AuthNavigation}
				/>
			)}
		</Stack.Navigator>
	);
}
