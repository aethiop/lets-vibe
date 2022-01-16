import React from "react";
import { Platform } from "react-native";

import { KeyboardAvoidingView, Center, VStack } from "native-base";
import { PrimaryButton, TextButton } from "../../components/atoms/Button";
import Logo from "../../components/atoms/Logo";
import { useAuth } from "../../hooks/useGun";

export default function RegisterScreen({ navigation }) {
	const { login } = useAuth();
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<Center _dark={{ bg: "#121212" }} flex={1} py={10}>
				<VStack w={{ base: "75%", md: "25%" }} space={5}>
					<Center flex={1}>
						<Logo />
					</Center>
					<PrimaryButton
						colorScheme={"primary"}
						icon={"qr-code"}
						onPress={() => login()}
					>
						Let's get started!
					</PrimaryButton>
					<TextButton
						onPress={() => navigation.navigate("Login")}
						variant="ghost"
					>
						I already have an account!
					</TextButton>
				</VStack>
			</Center>
		</KeyboardAvoidingView>
	);
}
