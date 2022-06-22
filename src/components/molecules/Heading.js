import React, { useEffect, useLayoutEffect } from "react";

import {
	Text,
	HStack,
	StatusBar,
	Pressable,
	Box,
	useColorModeValue,
} from "native-base";
import { IconButton } from "../atoms/Button";
import { Identity } from "../atoms/Identity";
import { useAuth, useGunState } from "../../hooks/useGun";

export const Heading = (props) => {
	const { publicKey, navigation } = props;
	const { user } = useAuth();
	const { fields: notify, put } = useGunState(user.get("notify"), {
		interval: 0,
	});
	const { fields: profile, put: setProfile } = useGunState(
		user.get("profile"),
		{}
	);
	const { color } = profile;
	const { enabled } = notify;
	return (
		<>
			<StatusBar barStyle="light-content" />
			<HStack
				px="1"
				py="3"
				justifyContent="space-between"
				alignItems="center"
			>
				<Pressable onPress={() => navigation.navigate("Settings")}>
					<HStack alignItems="center" px="5" space={4}>
						<Identity publicKey={publicKey} size="xs" bg={color} />
						<Text fontSize="20" fontWeight="bold">
							{name}
						</Text>
					</HStack>
				</Pressable>
				<HStack px="4" space={2}>
					<IconButton
						icon="people-outline"
						onPress={() => navigation.push("Friends")}
					/>
					<Box flex={1}>
						<IconButton
							icon="notifications-outline"
							onPress={() => {
								navigation.navigate("Notifications");
								put({ enabled: false });
							}}
						/>
						{enabled && (
							<Text
								bg="red.500"
								p={2}
								position="absolute"
								top={0}
								right={0}
								rounded="full"
							></Text>
						)}
					</Box>
				</HStack>
			</HStack>
		</>
	);
};
