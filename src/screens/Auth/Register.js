import React, { useState } from "react";
import { Platform } from "react-native";

import {
	KeyboardAvoidingView,
	Center,
	Heading,
	VStack,
	Input,
	Button,
	Box,
	Icon,
} from "native-base";
import { PrimaryButton, TextButton } from "../../components/atoms/Button";
import { TextInput } from "../../components/atoms/Input";
import { MaterialIcons } from "@expo/vector-icons";
// import { useAuthDispatch, createUser, useAuth } from "../../contexts/auth";
import Logo from "../../components/atoms/Logo";
import { useAuth } from "../../hooks/useGun";

export default function RegisterScreen({ navigation }) {
	// const [username, setUsername] = useState("");
	const { login } = useAuth();
	// const user = useAuth();
	// const dispatch = useAuthDispatch();
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<Center _dark={{ bg: "#121212" }} flex={1} py={10}>
				<VStack w={{ base: "75%", md: "25%" }} space={3}>
					<Center my={5} flex={1}>
						<Logo />
					</Center>
					{/* <TextInput
						value={username}
						onChangeText={(text) => setUsername(text)}
						placeholder="Enter a username"
						icon="person"
					/> */}
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
