import React, { ComponentProps, useReducer, useState, useEffect } from "react";
import {
	HStack,
	VStack,
	Center,
	Avatar,
	Heading,
	Text,
	Pressable,
	Box,
	useToast,
	useColorMode,
	useColorModeValue,
	Skeleton,
} from "native-base";
import { MotiView } from "moti";
import { IconButton } from "../../components/atoms/Button";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton } from "../../components/atoms/Button";
import { Identity } from "../../components/atoms/Identity";
import { useAuth, useGunState } from "../../hooks/useGun";
import { ColoredIcon, Icon } from "../../components/atoms/Icon";
import { useLinkTo } from "@react-navigation/native";
import { TextInput } from "../../components/atoms/Input";
import { Accordion } from "../../components/atoms/Accordion";
import { DescriptiveText } from "../../components/molecules/DescriptiveText";
import * as Clipboard from "expo-clipboard";

export default function ProfileScreen({ navigation, route }) {
	const { gun, keys, user, logout } = useAuth();
	const { pub: pubKey } = route.params;
	// const { fields: profile, put } = useGunState(user.get("profile"), {
	// 	interval: 0,
	// });
	const { fields: profile } = useGunState(gun.user(pubKey).get("profile"), {
		interval: 10,
	});
	const { name, themeMode } = profile;
	console.log(name);
	// const { name = "", themeMode } = profile;
	console.log(themeMode);
	return (
		<VStack
			space={4}
			bg={themeMode === "light" ? "light.50" : "#121212"}
			w="full"
			h="full"
			flex={1}
		>
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
		</VStack>
	);
}
