import React, { useEffect, useRef, useState } from "react";
import { Center, Box, VStack, HStack, Text } from "native-base";
import { TextInput } from "../../components/atoms/Input";
import { IconButton, PrimaryButton } from "../../components/atoms/Button";
// import { sendFriendRequest } from "../../hooks/useFriend";
import { useAuth, useGunSetState, useGunState } from "../../hooks/useGun";
import { useCert } from "../../hooks/useCert";
import { AddFriend } from "../../components/molecules/AddFriend";
import { UserProfile } from "../../components/molecules/UserProfile";
import { getFriends } from "../../lib/friend";
import { Pressable } from "react-native";

export default function FriendScreen({ navigation }) {
	const { gun, user, logout } = useAuth();
	const [suggFriends, setSuggFriends] = useState(new Set());
	const [isOpen, setIsOpen] = useState(false);
	const { list: friends } = useGunSetState(user.get("friends"), {
		interval: 0,
	});
	const { list: suggestions, addToSet: addSuggestion } = useGunSetState(
		user.get("suggestions"),
		{
			interval: 300,
		}
	);

	// const [friends, setFriends] = useState({});
	console.log(suggestions);
	const friendList = Array.from(friends.keys()).map((key) => {
		return {
			key,
			pub: Object.values(friends.get(key)).slice(0, -1).join(""),
		};
	});

	return (
		<VStack pt={3} space={4} _dark={{ bg: "#121212" }} flex={1}>
			<HStack
				w="full"
				px={4}
				py={4}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Text fontSize="2xl" fontWeight="bold">
					Friends
				</Text>
				<IconButton
					icon="arrow-back"
					onPress={() => {
						navigation.goBack();
					}}
				/>
			</HStack>
			<VStack flex={1} space={1}>
				<AddFriend isOpen={isOpen} hideModal={() => setIsOpen(false)} />
				{friendList.map((friend) => {
					return (
						<Pressable
							my="2"
							py="2"
							key={friend.key}
							onPress={async () => {
								navigation.navigate("Profile", {
									room: friend.key,
									pub: friend.pub,
								});
							}}
						>
							<UserProfile publicKey={friend.pub} />
						</Pressable>
					);
				})}
			</VStack>
			<HStack
				safeAreaTop
				mt={"auto"}
				px={"4"}
				py="3"
				alignItems={"center"}
				justifyContent={"flex-end"}
			>
				<IconButton
					icon="person-add-outline"
					onPress={() => setIsOpen(true)}
				/>
			</HStack>
		</VStack>
	);
}
