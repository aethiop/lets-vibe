import {
	VStack,
	Box,
	Center,
	HStack,
	Text,
	Skeleton,
	useColorMode,
	useColorModeValue,
	KeyboardAvoidingView,
	Input,
} from "native-base";
import React, { useState, useRef, useEffect } from "react";
import { useAuth, useGunState } from "../../hooks/useGun";
import { IconButton } from "../../components/atoms/Button";
import { Identity } from "../../components/atoms/Identity";
import { TextInput } from "../../components/atoms/Input";
export default function Chat({ navigation, route }) {
	const { gun, user, keys } = useAuth();
	const { room, pub } = route.params;
	const [secret, setSecret] = useState("");
	const { colorMode, toggleColorMode } = useColorMode();
	useEffect(async () => {
		let friend = await gun.get("~" + pub);
		let secret = await SEA.secret(friend.epub, keys);
		setSecret(secret);
	}, []);
	const { fields: profile } = useGunState(gun.user(pub).get("profile"), {
		interval: 0,
	});
	const { name } = profile;
	const { fields: myChat, put } = useGunState(user.get("chats").get(pub), {
		interval: 7,
		keys: secret,
	});
	const { fields: theirChat } = useGunState(
		gun.user(pub).get("chats").get(user.is.pub),
		{
			interval: 7,
			keys: secret,
		}
	);

	const { text = "" } = myChat;
	const { text: their } = theirChat;
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			<VStack _dark={{ bg: "#121212" }} space={4} flex={1}>
				<HStack
					px="4"
					py="3"
					justifyContent="space-between"
					alignItems="center"
				>
					<HStack alignItems="center" space={4}>
						<Identity publicKey={pub} size="xs" />
						<Text fontSize="20" fontWeight="bold">
							{name}
						</Text>
					</HStack>
					<HStack justifyContent="flex-end">
						<IconButton
							onPress={() => navigation.goBack()}
							icon="arrow-back"
						/>
					</HStack>
				</HStack>
				<VStack flex={1} space="7">
					{their && their.length > 0 && (
						<Box
							bg="primary.500"
							flex="grow"
							mx="5"
							roundedBottom={"2xl"}
							roundedTopRight={"2xl"}
							roundedTopLeft={"sm"}
							p="4"
						>
							<Text fontSize={"lg"} fontWeight={"bold"} px="2">
								{their}
							</Text>
						</Box>
					)}
					<Box
						bg="dark.200"
						mx="5"
						safeAreaTop
						roundedTop={"2xl"}
						roundedBottomLeft={"2xl"}
						roundedBottomRight={"sm"}
						p="3"
					>
						<Input
							variant="unstyled"
							value={text}
							onBlur={() => {
								put({ text: "" });
							}}
							size="lg"
							borderSize={0}
							_focus={
								colorMode === "dark" ? "dark.300" : "dark.100"
							}
							onChangeText={(text) => put({ text: text })}
						/>
					</Box>
				</VStack>

				{/* <HStack space={2} px={"4"} py="3" alignItems={"center"}>
				<HStack>
					<TextInput
						w="full"
						autoCapitalize="none"
						autoCorrect={false}
						onBlur={() => {
							put({ text: "" });
						}}
						value={text}
						icon="chatbubble-outline"
						placeholder="Type a message..."
						onChangeText={(text) => {
							console.log(secret);
							put({ text: text });
						}}
					/>
				</HStack>
				<IconButton
					icon="refresh-circle"
					onPress={() => put({ text: "" })}
				/>
			</HStack> */}
			</VStack>
		</KeyboardAvoidingView>
	);
}
