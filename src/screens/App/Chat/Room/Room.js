import {
	VStack,
	Box,
	Center,
	HStack,
	Text,
	Skeleton,
	useColorMode,
	useColorModeValue,
	Input,
	Pressable,
	ScrollView,
	Container,
	View,
	Stagger,
} from "native-base";
import React, { useState, useRef, useEffect } from "react";
import { useAuth, useGunState } from "../../../../hooks/useGun";
import ChatHeader from "../../../../components/molecules/ChatHeader";
import { Identity } from "../../../../components/atoms/Identity";
import { KeyboardAvoidingView } from "react-native";
import { IconButton } from "../../../../components/atoms/Button";
import { TextInput } from "../../../../components/atoms/Input";
import { DescriptiveText } from "../../../../components/molecules/DescriptiveText";
import { Icon } from "../../../../components/atoms/Icon";

export default function Chat({ navigation, route }) {
	const { gun, user, keys } = useAuth();
	const [height, setHeight] = useState("auto");
	const { room, pub } = route.params;
	const [secret, setSecret] = useState("");
	const [showReactions, setShowReactions] = useState(false);
	// create emoji reactions for the chat
	const emojiReactions = [
		{
			name: "like",
			text: "👍 ",
		},
		{
			name: "dislike",
			text: "👎",
		},
		{
			name: "love",
			text: "❤️",
		},
		{
			name: "fire",
			text: "🔥",
		},
		{
			name: "congrats",
			text: "🎉",
		},
		{
			name: "stary-eyes",
			text: "🤩",
		},
		{
			name: "sad",
			text: "😢",
		},
		{
			name: "vomit",
			text: "🤮",
		},
		{
			name: "fear",
			text: "😱",
		},
		{
			name: "poop",
			text: "💩",
		},
	];
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
		interval: 0,
		keys: secret,
	});

	const { fields: theirChat } = useGunState(
		gun.user(pub).get("chats").get(user.is.pub),
		{
			interval: 0,
			keys: secret,
		}
	);

	const { colorMode, toggleColorMode } = useColorMode();
	const [editing, setEditing] = useState(false);
	const { text = "", reactions: forThem } = myChat;
	const { text: their, reactions: forMe } = theirChat;

	return (
		<View position="fixed" h="full" w="full" _dark={{ bg: "#121212" }}>
			<VStack py={2} space={2} flex={1}>
				<HStack
					w="full"
					px={5}
					py={4}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<HStack alignItems={"center"} justifyContent={"flex-start"}>
						<Text fontSize={"2xl"} fontWeight={"bold"}>
							{name}
						</Text>
					</HStack>
					<IconButton
						icon="arrow-back"
						onPress={() => {
							navigation.goBack();
						}}
					/>
				</HStack>
				<HStack
					py={2}
					px={5}
					w={"full"}
					space={4}
					justifyContent={"flex-end"}
				>
					{their && their.length > 0 ? (
						<VStack flex={1} space={2}>
							<Pressable
								flex={1}
								onPress={() => setShowReactions(!showReactions)}
							>
								<Box
									_dark={{ bg: "primary.500" }}
									_light={{ bg: "primary.300" }}
									rounded={"2xl"}
									flex={1}
									p={2}
								>
									<Text
										p={2}
										fontSize={"md"}
										fontWeight={"bold"}
									>
										{their}
									</Text>
								</Box>
							</Pressable>
							<HStack>
								<Stagger
									flex={1}
									visible={showReactions}
									initial={{
										opacity: 0,
										scale: 0,
										translateX: -5,
									}}
									animate={{
										opacity: 1,
										scale: 1.3,
										translateX: 5,
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
										opacity: 0,
										scale: 0.9,
										translateX: 0,
										transition: {
											type: "spring",
											mass: 0.8,
											stagger: {
												reverse: true,
											},
										},
									}}
								>
									{emojiReactions.map((reaction, index) => {
										return (
											<Pressable
												p={2}
												key={reaction.name + index}
												onPress={() => {
													put({
														reactions:
															reaction.name,
													});
													setShowReactions(false);
												}}
											>
												<Text fontSize="xl">
													{reaction.text}
												</Text>
											</Pressable>
										);
									})}
								</Stagger>
							</HStack>
						</VStack>
					) : (
						<Skeleton
							startColor={useColorModeValue(
								"light.100",
								"dark.100"
							)}
							w="full"
							h={16}
							endColor={useColorModeValue("light.300", "dark.50")}
							borderRadius={"2xl"}
							flex={1}
						></Skeleton>
					)}
					<Box>
						<Identity publicKey={pub} size="xs" />
					</Box>
				</HStack>
				<HStack px={5} w={"full"} space={4} justifyContent={"flex-end"}>
					<Box
						_dark={{ bg: "dark.100" }}
						_light={{ bg: "light.300" }}
						rounded={"2xl"}
						p={2}
						flex={1}
					>
						<Input
							value={text}
							placeholder="Type a message..."
							variant={"unstyled"}
							fontWeight={"bold"}
							size="lg"
							onChangeText={(text) => put({ text: text })}
						/>
					</Box>
					<Box>
						<Identity publicKey={user.is.pub} size="xs" />
					</Box>
				</HStack>
				<HStack px={7}>
					{!!forMe && (
						<Text fontSize="2xl">
							{
								emojiReactions.filter(
									({ name }) => forMe === name
								)[0].text
							}
						</Text>
					)}
				</HStack>
			</VStack>
		</View>
	);
}
