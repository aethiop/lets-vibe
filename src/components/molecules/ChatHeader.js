import React from "react";
import { Identity } from "../atoms/Identity";
import { VStack, HStack, Text, Container, Center, Stack } from "native-base";
import { IconButton } from "../atoms/Button";

export default function ChatHeader({ navigation, pub, name, children }) {
	return (
		<HStack
			w="full"
			px="4"
			py="3"
			justifyContent="flex-end"
			alignItems="center"
		>
			<HStack justifyContent="flex-end">
				<IconButton
					onPress={() => navigation.goBack()}
					icon="arrow-back"
				/>
			</HStack>
		</HStack>
	);
}
