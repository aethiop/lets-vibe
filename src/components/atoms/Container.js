import React, { useLayoutEffect } from "react";
import { Box, useColorMode } from "native-base";
import { Heading } from "../molecules/Heading";
import { useAuth, useGunState, useGunSetState } from "../../hooks/useGun";
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
	const { list: notifications } = useGunSetState(user.get("notifications"), {
		interval: 10,
	});
	let notificationList = Array.from(notifications.keys()).map((key) => {
		if (notifications.get(key) && notifications.get(key) !== null) {
			return {
				key,
				pub: Object.values(notifications.get(key))
					.slice(0, -1)
					.join(""),
			};
		}
	});
	useLayoutEffect(() => {}, [notificationList]);
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
		<Box {...props} pt={1}>
			<Heading
				navigation={navigation}
				name={title}
				notifications={notificationList}
				publicKey={pub}
				icon={icon}
			/>
			{children}
		</Box>
	);
};
