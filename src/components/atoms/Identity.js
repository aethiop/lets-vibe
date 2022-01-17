import React, { useEffect } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/big-smile";
import { SvgXml } from "react-native-svg";
// import SvgUri from "react-native-svg-uri";

import { Center, Image } from "native-base";
export const Identity = ({ publicKey, size }) => {
	var url = `https://vibatar.herokuapp.com/4.x/big-smile/png?seed=${publicKey}`;

	return (
		<Center bg={"primary.500"} p={2} borderRadius="3xl">
			<Image source={{ uri: url }} size={size} alt="profile-avatar" />
		</Center>
	);
};
