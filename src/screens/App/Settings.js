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
	StatusBar,
	Stagger,
	ScrollView,
	useToast,
	useColorMode,
	useColorModeValue,
	Skeleton,
} from "native-base";
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
import useNetwork from "../../hooks/useNetwork";

export default function SettingsScreen({ navigation }) {
	const { keys, sea, user, logout } = useAuth();
	const [copyPub, setCopyPub] = useState(false);
	const [copyPriv, setCopyPriv] = useState(false);
	const [editing, setEditing] = useState(false);
	const [showColor, setShowColors] = useState(false);
	const { colorMode, toggleColorMode } = useColorMode();
	const toast = useToast();
	const { fields: profile, put } = useGunState(user.get("profile"), {
		interval: 0,
	});
	const { name = "", themeMode, color } = profile;

	var colors = [
		{
			name: "purple",
			color: "primary.500",
		},
		{
			name: "blue",
			color: "blue.500",
		},
		{
			name: "green",
			color: "green.400",
		},
		{
			name: "yellow",
			color: "yellow.300",
		},
		{
			name: "orange",
			color: "orange.500",
		},
		{
			name: "red",
			color: "red.500",
		},
		{
			name: "pink",
			color: "pink.500",
		},
		{
			name: "gray",
			color: "gray.400",
		},
	];

	// put({
	// 	onlineStatus: {
	// 		online: networkState.online,
	// 		lastSeen: networkState.since,
	// 	},
	// });
	return (
		<VStack space={4} _dark={{ bg: "#121212" }} pt={4} flex={1}>
			<HStack justifyContent="flex-end" py="5" px="5">
				<IconButton
					onPress={() => navigation.goBack()}
					icon="arrow-back"
				/>
			</HStack>
			<VStack space={4} flex={1}>
				<Center>
					<Pressable onPress={() => setShowColors(!showColor)}>
						<Identity publicKey={keys.pub} size="md" bg={color} />
					</Pressable>

					<Stagger
						flex={1}
						visible={showColor}
						initial={{
							opacity: 0,
							scale: 0,
						}}
						animate={{
							scale: 1,
							opacity: 1,
							transition: {
								type: "spring",
								mass: 0.8,
								stagger: {
									offset: 30,
									reverse: true,
								},
							},
						}}
						exit={{
							scale: 0.8,
							opacity: 0,
							transition: {
								duration: 100,
								stagger: {
									offset: 30,
									reverse: true,
								},
							},
						}}
					>
						<ScrollView
							horizontal={true}
							overflowX={"hidden"}
							showsHorizontalScrollIndicator={false}
							style={{
								paddingHorizontal: 10,
								flex: 1,
							}}
						>
							{colors.map((colors, index) => {
								return (
									<Pressable
										borderWidth={1}
										borderColor={
											color === colors.name &&
											themeMode === "dark"
												? "light.300"
												: "dark.100"
										}
										px={2}
										mx={2}
										my={4}
										w={7}
										h={7}
										rounded={"2xl"}
										bg={colors.color}
										key={colors.name + index}
										onPress={() => {
											put({
												color: colors.name,
											});
										}}
									></Pressable>
								);
							})}
						</ScrollView>
					</Stagger>
					{!name ? (
						<Skeleton
							colorMode={themeMode}
							height={10}
							m={2}
							width={175}
							startColor={useColorModeValue(
								"light.100",
								"#121212"
							)}
							endColor={useColorModeValue(
								"light.300",
								"dark.100"
							)}
							borderRadius="full"
						></Skeleton>
					) : (
						<Heading py={4} size="md">
							{name}
						</Heading>
					)}

					<HStack space={4} justifyContent={"center"}>
						<PrimaryButton
							onPress={() => {
								setCopyPub(true);
								Clipboard.setString(keys.pub);
							}}
							colorScheme="primary"
							icon={copyPub ? "checkmark" : "copy"}
						>
							{copyPub ? "Copied!" : "Public Key"}
						</PrimaryButton>
						<PrimaryButton
							colorScheme="secondary"
							onPress={() => {
								setCopyPriv(true);
								Clipboard.setString(JSON.stringify(keys));
							}}
							icon={copyPriv ? "checkmark" : "finger-print"}
						>
							{copyPriv ? "Copied!" : "Private Key"}
						</PrimaryButton>
					</HStack>
				</Center>

				<VStack flex={1} space={2} py={4}>
					{/* <Accordion /> */}

					{editing ? (
						<HStack
							space={4}
							w="full"
							px={4}
							alignItems="center"
							justifyContent={"center"}
						>
							<TextInput
								w="80%"
								autoCorrect={false}
								placeholder="Name"
								icon="person"
								onChangeText={(text) => put({ name: text })}
								value={name}
								autoFocus
								onBlur={() => setEditing(false)}
							/>
							<IconButton
								onPress={() => setEditing(false)}
								icon="checkmark"
							/>
						</HStack>
					) : (
						<HStack
							w="full"
							alignItems={"center"}
							justifyContent="space-between"
							px={4}
							space={3}
						>
							<HStack
								alignItems={"center"}
								justifyContent={"flex-start"}
							>
								<DescriptiveText
									title={"Username  "}
									iconBg={"#9E77F1"}
									icon={"person"}
								/>
								<Text fontWeight={"thin"}>{name}</Text>
							</HStack>
							<IconButton
								onPress={() => setEditing(true)}
								icon="create"
							/>
						</HStack>
					)}

					<HStack
						space={4}
						w="full"
						px={4}
						justifyContent={"space-between"}
					>
						<DescriptiveText
							title={
								colorMode === "light"
									? "Light Mode"
									: "Night Mode"
							}
							iconBg={"#77A8F1"}
							icon={colorMode === "light" ? "sunny" : "moon"}
						/>
						<IconButton
							onPress={() => {
								toggleColorMode();
								put({
									themeMode:
										colorMode === "light"
											? "dark"
											: "light",
								});
							}}
							icon={colorMode === "light" ? "sunny" : "moon"}
						/>
					</HStack>
				</VStack>
			</VStack>
			<HStack
				safeAreaTop
				mt={"auto"}
				px={"4"}
				py="3"
				bottom={5}
				justifyContent={"flex-end"}
			>
				<PrimaryButton
					onPress={async () => {
						logout(() => {
							console.log("Logged out");
							window.location.replace(window.location.origin);
						});
					}}
					px="10"
					icon="exit-outline"
					colorScheme="error"
				>
					Logout
				</PrimaryButton>
			</HStack>
		</VStack>
	);
}
