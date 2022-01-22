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
	Container,
	View,
	Stagger,
} from "native-base";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useAuth, useGunState, useGunSetState } from "../../../../hooks/useGun";
import { Identity } from "../../../../components/atoms/Identity";
import { IconButton } from "../../../../components/atoms/Button";
import { TextInput } from "../../../../components/atoms/Input";
import { DescriptiveText } from "../../../../components/molecules/DescriptiveText";
import { Icon } from "../../../../components/atoms/Icon";
import { ScrollView } from "react-native";
import Gun from "gun/gun";
export default function Room({ navigation, route }) {
	const { gun, user, keys } = useAuth();
	const { room, pub } = route.params;
	const [secret, setSecret] = useState("");
	const [theirActive, setTheirActive] = useState(false);
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
	const { list: myChat, addToSet: send } = useGunSetState(
		user.get("messages").get(pub),
		{
			interval: 0,
			keys: secret,
		}
	);

	const { fields: theirChat } = useGunState(
		gun.user(pub).get("chats").get(user.is.pub),
		{
			interval: 0,
			keys: secret,
		}
	);
	useEffect(async () => {
		let friend = await gun.get("~" + pub);
		let secret = await SEA.secret(friend.epub, keys);
		setSecret(secret);
	}, []);

	const { fields: profile } = useGunState(gun.user(pub).get("profile"), {
		interval: 0,
	});
	const { name } = profile;
	const { text = "", isActive } = myChat;
	const { text: their, reaction: forMe, isActive: themActive } = theirChat;
	// const { fields: myReactions, put: react } = useGunState(
	// 	user.get("chats").get(pub).get("reaction"),
	// 	{ interval: 0 }
	// );
	// const { fields: theirReactions } = useGunState(
	// 	gun.user(pub).get("chats").get(user.is.pub).get("reaction"),
	// 	{ interval: 0 }
	// );
	// const { reaction } = theirReactions;
	// console.log(reaction);
	// useLayoutEffect(() => {
	// 	put({ isActive: true });
	// 	user.notify(pub, true);
	// 	user.sendNotification(pub, {
	// 		data: user.is.pub,
	// 		type: "joined-chat",
	// 		createdAt: Gun.state(),
	// 	});
	// 	return () => {
	// 		put({ isActive: false });
	// 	};
	// }, []);

	// if (isActive && themActive) user.notify(pub, false);

	return (
		<View position="fixed" h="full" w="full" _dark={{ bg: "#121212" }}>
			<VStack flex={1}>
				<HStack
					w="full"
					px={5}
					py={4}
					my={2}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<HStack
						alignItems={"center"}
						space={2}
						justifyContent={"flex-start"}
					>
						<HStack space={2} alignItems={"center"}>
							{isActive && (
								<Identity publicKey={user.is.pub} size="xs" />
							)}
							{themActive && (
								<Identity publicKey={pub} size="xs" />
							)}
						</HStack>
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
					<Box>
						<Identity publicKey={pub} size="xs" />
					</Box>
					{their && their.length > 0 ? (
						<VStack flex={1}>
							{showReactions && (
								<ScrollView
									horizontal={true}
									overflowX={"hidden"}
									showsHorizontalScrollIndicator={false}
									style={{
										paddingHorizontal: 10,
										flex: 1,
									}}
								>
									<Stagger
										visible={showReactions}
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
										{emojiReactions.map(
											(reaction, index) => {
												return (
													<Pressable
														py={2}
														px={2}
														key={
															reaction.name +
															index
														}
														onPress={() => {
															// put({
															// 	reaction:
															// 		reaction.name,
															// });
															react({
																reaction:
																	reaction.name,
															});
															setTimeout(() => {
																react({
																	reaction:
																		"",
																});
															}, 1000);

															setShowReactions(
																false
															);
														}}
													>
														<Text fontSize="xl">
															{reaction.text}
														</Text>
													</Pressable>
												);
											}
										)}
									</Stagger>
								</ScrollView>
							)}
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
						</VStack>
					) : (
						<Skeleton
							startColor={useColorModeValue(
								"light.100",
								"dark.100"
							)}
							w="full"
							endColor={useColorModeValue("light.300", "dark.50")}
							borderRadius={"2xl"}
							flex={1}
						></Skeleton>
					)}
				</HStack>
				<HStack
					px={5}
					my={2}
					w={"full"}
					space={4}
					justifyContent={"flex-end"}
				>
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
							// onChangeText={(text) => put({ text: text })}
						/>
					</Box>
					<Box>
						<Identity publicKey={user.is.pub} size="xs" />
					</Box>
					<Box position="absolute" left="2.5" bottom="-7" mt="auto">
						{!!forMe && (
							<Text fontSize="xl">
								{reaction &&
									emojiReactions.filter(
										({ text, name }) => name === reaction
									)[0].text}
							</Text>
						)}
					</Box>
				</HStack>
			</VStack>
		</View>
	);
}
