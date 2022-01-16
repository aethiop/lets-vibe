import React from "react";
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
import { useAuth, useGunSetState } from "../../hooks/useGun";

export const Heading = (props) => {
	const { name, publicKey, notifications, navigation } = props;

	return (
		<>
			<StatusBar backgroundColor="primary.500" barStyle="light-content" />
			<HStack
				px="1"
				py="3"
				justifyContent="space-between"
				alignItems="center"
			>
				<Pressable onPress={() => navigation.navigate("Settings")}>
					<HStack alignItems="center" px="5" space={4}>
						<Identity publicKey={publicKey} size="xs" />
						<Text fontSize="20" fontWeight="bold">
							{name}
						</Text>
					</HStack>
				</Pressable>
				<HStack px="4" space={2}>
					<IconButton
						onPress={() => navigation.navigate("Search")}
						icon="search-outline"
					/>
					<IconButton
						icon="people-outline"
						onPress={() => navigation.navigate("Friends")}
					/>
					<Box>
						<IconButton
							icon="notifications-outline"
							onPress={() => navigation.navigate("Notifications")}
						/>
						{notifications && notifications.length > 0 && (
							<Text
								position="absolute"
								top="0"
								right="0"
								bg="red.500"
								px={1.5}
								rounded="full"
								color={useColorModeValue("white", "black")}
								fontSize="xs"
							>
								{notifications.length}
							</Text>
						)}
					</Box>
				</HStack>
			</HStack>
		</>
	);
};
