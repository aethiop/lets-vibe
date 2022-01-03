import React, { useEffect } from "react";
// import { useAuth, useAuthDispatch, authUser } from "../contexts/auth";
import { useAuth } from "../hooks/useGun";
import AuthNavigation from "../navigators/AuthNavigation";
import MainNavigation from "../navigators/MainNavigation";
import { Text, useColorMode } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useGunState } from "../hooks/useGun";

const Stack = createNativeStackNavigator();

export default function Main() {
	const { keys, isAuthed, user, sea } = useAuth();

	return (
		<Stack.Navigator name="Root">
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
