import React, { useLayoutEffect, useEffect } from "react";
import { Box, StatusBar, useColorMode } from "native-base";
import { useAuth, useGunState } from "../lib/hooks/useGun";
import { Platform } from "react-native";

export const Layout = ({ children }) => {
	// If used after authenticated user,
	// the color mode will be set to user prefered theme automatically.
	const { user } = useAuth();
	const { colorMode, setColorMode } = useColorMode();

	//TODO: store other preferences in the user settings graph node
	// Encrypted theme settings stored in the user
	// const { fields: profile } = useGunState(
	// 	user.get("profile").get("settings"),
	// 	{
	// 		interval: 0,
	// 		keys: keys,
	// 	}
	// );
	const { fields: profile } = useGunState(user.get("profile"), {
		interval: 0,
	});
	const { themeMode } = profile;

	useLayoutEffect(() => {
		if (themeMode && themeMode !== colorMode) {
			setColorMode(themeMode);
		}
	}, [themeMode]);
	return (
		<Box
			safeAreaTop="10"
			flex={1}
			px={4}
			_dark={{ bg: "dark.50" }}
			_light={{ bg: "light.50" }}
		>
			<StatusBar
				barStyle={
					colorMode === "light" && Platform.OS === "ios"
						? "dark-content"
						: "light-content"
				}
			/>
			{children}
		</Box>
	);
};
