import React, { useEffect, useState } from "react";
import {
	HStack,
	VStack,
	Text,
	Box,
	Icon,
	useColorMode,
	useColorModeValue,
} from "native-base";
import { Identity } from "../atoms/Identity";
import { useAuth, useGunState } from "../../hooks/useGun";

export const UserProfile = ({ navigation, children, publicKey }) => {
	const { gun } = useAuth();
	const { fields: profile } = useGunState(
		gun.get("~" + publicKey).get("profile"),
		{
			interval: 0,
		}
	);

	const { name, color } = profile;
	return (
		<HStack
			mx={4}
			space={4}
			alignItems={"center"}
			borderWidth={1}
			borderColor={useColorModeValue("light.300", "dark.200")}
			rounded="2xl"
			p={4}
		>
			<Identity publicKey={publicKey} size={7} bg={color} />
			<VStack>
				<Text fontSize="lg" fontWeight={"bold"}>
					{name}
				</Text>
				<Text fontSize={"xs"} fontWeight={"thin"} isTruncated>
					{publicKey.slice(0, 16)}
				</Text>
			</VStack>
			<HStack flex={1} justifyContent={"flex-end"}>
				{children}
			</HStack>
		</HStack>
	);
};
