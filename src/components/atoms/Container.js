import React, { useLayoutEffect, useEffect } from "react";
import { Box, useColorMode } from "native-base";
import { Heading } from "../molecules/Heading";
import { useAuth, useGunState, useGunSetState } from "../../hooks/useGun";
import { Platform } from "react-native";
import useNetwork from "../../hooks/useNetwork";

export const Container = ({
	title,
	navigation,
	pub,
	icon,
	children,
	...props
}) => {
	const { keys, isAuthed, user, gun, sea } = useAuth();
	const { colorMode, setColorMode } = useColorMode();

	const { fields: profile, put: setOnlineStatus } = useGunState(
		user.get("profile"),
		{
			interval: 0,
		}
	);

	const { themeMode } = profile;
	const networkState = useNetwork();

	useLayoutEffect(() => {
		if (themeMode && themeMode !== colorMode) {
			setColorMode(themeMode);
		}
	}, [themeMode]);
	return (
		<Box {...props} mt={2} _dark={{ bg: "#121212" }}>
			<Heading
				navigation={navigation}
				name={title}
				publicKey={pub}
				icon={icon}
			/>
			{children}
		</Box>
	);
};
