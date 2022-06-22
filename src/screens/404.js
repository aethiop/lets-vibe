import React, { useEffect, useRef } from "react";
import { Center, Box, VStack, HStack, Icon } from "native-base";
import { TextInput } from "../components/atoms/Input";
import { IconButton, PrimaryButton } from "../components/atoms/Button";

export default function Error({ navigation }) {
	return (
		<VStack pt={3} space={4} px={5} _dark={{ bg: "#121212" }} flex={1}>
			<PrimaryButton
				w="full"
				onPress={() => navigation.navigate("Root")}
			>Go  Home</PrimaryButton>
		</VStack>
	);
}
