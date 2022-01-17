import React, { useEffect, useRef, useState } from "react";
import { Center, Box, VStack, HStack, Icon } from "native-base";
import { TextInput } from "../../../components/atoms/Input";
import { IconButton, PrimaryButton } from "../../../components/atoms/Button";
// import { sendFriendRequest } from "../../hooks/useFriend";
import { useAuth, useGunSetState, useGunState } from "../../../hooks/useGun";
import { useCert } from "../../../hooks/useCert";
import { AddFriend } from "../../../components/molecules/AddFriend";
import { UserProfile } from "../../../components/molecules/UserProfile";
import { getFriends } from "../../../lib/friend";
import { Pressable } from "react-native";

export default function Chat({ navigation }) {
	const { gun, user, logout } = useAuth();
	const [suggFriends, setSuggFriends] = useState(new Set());
	const [isOpen, setIsOpen] = useState(false);
	const { list: friends } = useGunSetState(user.get("friends"), {
		interval: 0,
	});
	const { list: suggestions, addToSet: addSuggestion } = useGunSetState(
		user.get("suggestions"),
		{}
	);

	// const [friends, setFriends] = useState({});
	console.log(suggestions);
	const friendList = Array.from(friends.keys()).map((key) => {
		return {
			key,
			pub: Object.values(friends.get(key)).slice(0, -1).join(""),
		};
	});
	const pubList = friendList.map(({ pub }) => pub);
	const createChatRoom = async (friendPub) => {
		if (!(await user.get("certificates/chats").get(friendPub))) {
		}
		const chatCert = await user.get("certificates/chats").get(friendPub);
		return chatCert;
	};
	const f = friendList
		.map((friend) => getFriends(gun, friend.pub))
		.flat()
		.filter((f) => !pubList.includes(f))
		.filter((f) => f !== user.is.pub);

	return (
		<VStack space={4} _dark={{ bg: "#121212" }} flex={1}>
			<VStack flex={1} space={4}>
				<AddFriend isOpen={isOpen} hideModal={() => setIsOpen(false)} />
				{friendList.map((friend) => {
					return (
						<Pressable
							key={friend.key}
							onPress={async () => {
								// const cert = await createChatRoom(friend.pub);
								navigation.navigate("Room", {
									pub: friend.pub,
								});
							}}
						>
							<UserProfile publicKey={friend.pub} />
						</Pressable>
					);
				})}
			</VStack>
		</VStack>
	);
}
