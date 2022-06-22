import React, { useEffect } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/big-smile";
import { SvgXml } from "react-native-svg";
// import SvgUri from "react-native-svg-uri";
import Gun from "gun/gun";
import { Center, Image } from "native-base";
import { useUser, useAuth, useGunState } from "../../hooks/useGun";
import { useTheme } from "@react-navigation/native";
export const Identity = ({ publicKey, size, bg }) => {
	const { gun } = useAuth();
	const user = useUser(gun, publicKey);
	const { colorMode } = useTheme();
	var url = `https://vibatar.herokuapp.com/4.x/big-smile/png?seed=${publicKey}`;
	var colors = {
		purple: "primary.500",
		blue: "blue.500",
		green: "green.400",
		yellow: "yellow.300",
		red: "red.500",
		orange: "orange.500",
		pink: "pink.500",
		gray: "gray.600",
	};

	return (
		<Center bg={colors[bg]} p={2} borderRadius="3xl">
			<Image source={{ uri: url }} size={size} alt="profile-avatar" />
		</Center>
	);
};
