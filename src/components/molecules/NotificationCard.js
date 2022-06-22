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
import { useAuth, useGunSetState } from "../../hooks/useGun";
import { IconButton } from "../atoms/Button";

export const NotificationCard = ({ children, type, data, created }) => {
	const notificationMessages = {
		"joined-chat": "joined the chat",
		"friend-request": "sent you a friend request",
		"friend-request-accepted": "accepted your friend request",
	};

	return (
		<HStack
			mx={4}
			my={2}
			space={4}
			alignItems={"center"}
			borderWidth={1}
			borderColor={useColorModeValue("light.300", "dark.200")}
			rounded="2xl"
			p={4}
		>
			<Identity publicKey={data} size={7} />
			<VStack>
				<Text fontSize="lg" fontWeight={"bold"}>
					{notificationMessages[type]}
				</Text>
				<Text fontSize={"xs"} fontWeight={"thin"} isTruncated>
					{new Date(created).toLocaleString("en-US", {
						weekday: "short",
						year: "numeric",
						month: "long",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
					})}
				</Text>
			</VStack>
			<HStack flex={1} justifyContent={"flex-end"}>
				{children}
			</HStack>
		</HStack>
	);
};
