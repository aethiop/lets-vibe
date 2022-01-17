import React from "react";
import { HStack, VStack, Center, Heading, ScrollView } from "native-base";
import { IconButton } from "../../components/atoms/Button";
import { Identity } from "../../components/atoms/Identity";
import { useAuth, useGunState } from "../../hooks/useGun";
import { PrimaryButton } from "../../components/atoms/Button";

export default function ProfileScreen({ navigation, route }) {
	const { gun, keys, user, logout } = useAuth();
	const { pub: pubKey } = route.params;

	const { fields: profile } = useGunState(gun.user(pubKey).get("profile"), {
		interval: 10,
	});
	const { name, themeMode } = profile;
	console.log(name);
	// const { name = "", themeMode } = profile;
	console.log(themeMode);
	return (
		<ScrollView space={4} _dark={{ bg: "#121212" }} flex={1} position="">
			<HStack justifyContent="flex-end" py="5" px="5">
				<IconButton
					onPress={() => navigation.goBack()}
					icon="arrow-back-outline"
					color={themeMode === "light" ? "#121212" : "#ffffff"}
				/>
			</HStack>
			<VStack space={4}>
				<Center>
					<Identity publicKey={pubKey} size="md" />
					<Heading py={4} size="md">
						{name}
					</Heading>
				</Center>
				<PrimaryButton
					mx="auto"
					px="4"
					colorScheme="primary"
					onPress={() => {
						navigation.navigate("Room", {
							pub: pubKey,
						});
					}}
					icon={"cube"}
				>
					Go to Room
				</PrimaryButton>

				<VStack
					flex={1}
					space={2}
					py={4}
					alignItems={"center"}
				></VStack>
			</VStack>
			<HStack
				safeAreaTop
				mt={"auto"}
				px={"4"}
				py="3"
				justifyContent={"flex-end"}
			></HStack>
		</ScrollView>
	);
}
