import { Box, View } from "native-base";
import React, { useState } from "react";
import { Platform } from "react-native";
import {
	KeyboardAvoidingView,
	Center,
	Heading,
	VStack,
	Input,
	Icon,
	Button,
} from "native-base";
import { PrimaryButton, TextButton } from "../../components/atoms/Button";
import { TextInput } from "../../components/atoms/Input";
import Logo from "../../components/atoms/Logo";
import { useAuth } from "../../hooks/useGun";

export default function Login({ navigation }) {
	const [key, setKey] = useState("");
	const { login } = useAuth();
	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<Center _dark={{ bg: "#121212" }} flex={1} py={10}>
				<VStack w={{ base: "75%", md: "25%" }} space={5}>
					<Center>
						<Logo />
					</Center>
					<TextInput
						value={key}
						onChangeText={(text) => setKey(text)}
						placeholder="Paste your key"
						icon="finger-print"
					/>
					<Box w="auto">
						<PrimaryButton
							colorScheme={"primary"}
							icon={"enter-outline"}
							onPress={() =>
								login(key === "string" ? key : JSON.parse(key))
							}
						>
							Login
						</PrimaryButton>
					</Box>

					<TextButton
						onPress={() => navigation.navigate("Register")}
						variant="ghost"
					>
						Create one!
					</TextButton>
				</VStack>
			</Center>
		</KeyboardAvoidingView>
	);
}
