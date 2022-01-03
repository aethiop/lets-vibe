import React, { useLayoutEffect } from "react";
import { Box, useColorMode } from "native-base";
import { Heading } from "../molecules/Heading";
import { useAuth, useGunState } from "../../hooks/useGun";
export const Container = ({
	title,
	navigation,
	pub,
	icon,
	children,
	...props
}) => {
	const { keys, isAuthed, user, sea } = useAuth();
	const { colorMode, setColorMode } = useColorMode();
	const { fields: profile } = useGunState(user.get("profile"), {
		interval: 300,
	});
	const { themeMode } = profile;
	useLayoutEffect(() => {
		if (themeMode && themeMode !== colorMode) {
			setColorMode(themeMode);
		}
	}, [themeMode]);
	return (
		<Box {...props}>
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
