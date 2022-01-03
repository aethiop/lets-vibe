import React from "react";
import { Text, HStack, StatusBar, Pressable } from "native-base";
import { IconButton } from "../atoms/Button";
import { Identity } from "../atoms/Identity";

export const Heading = (props) => {
	const { name, publicKey, navigation } = props;
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
					<IconButton icon="people-outline" />
					<IconButton icon="notifications-outline" />
				</HStack>
			</HStack>
		</>
	);
};
