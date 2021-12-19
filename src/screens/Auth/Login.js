import { View } from "native-base";
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
import { useAuthDispatch, authUser, useAuth } from "../../contexts/auth";
export default function Login({ navigation }) {
	const [key, setKey] = useState("");
	const user = useAuth();
	const dispatch = useAuthDispatch();
	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<Center _dark={{ bg: "#121212" }} flex={1} py={10}>
				<VStack w={{ base: "75%", md: "25%" }} space={3}>
					<Center my={5} flex={1}>
						<Logo />
					</Center>
					<TextInput
						value={key}
						onChangeText={(text) => setKey(text)}
						placeholder="Paste your key"
						icon="finger-print"
					/>
					<PrimaryButton
						onPress={() => authUser(dispatch, { key: key })}
						isLoading={user.loading}
					>
						Login
					</PrimaryButton>
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
