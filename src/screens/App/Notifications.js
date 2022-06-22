import React, { useEffect, useState } from "react";
import {
	Center,
	Text,
	VStack,
	HStack,
	Box,
	Icon,
	useColorModeValue,
	ScrollView,
} from "native-base";
import { TextInput } from "../../components/atoms/Input";
import { IconButton, PrimaryButton } from "../../components/atoms/Button";
import { useAuth, useGunSetState } from "../../hooks/useGun";
import { UserProfile } from "../../components/molecules/UserProfile";
import { NotificationCard } from "../../components/molecules/NotificationCard";

export default function NotificationScreen({ navigation }) {
	const { gun, user, keys } = useAuth();
	const { list: notifications, updateInSet } = useGunSetState(
		user.get("notifications"),
		{
			interval: 0,
		}
	);

	const notificationMessages = {
		"joined-chat": "joined the chat",
		"friend-request": "sent you a friend request",
		"friend-request-accepted": "accepted your friend request",
	};
	const { list: friends, addToSet: addFriend } = useGunSetState(
		user.get("friends"),
		{}
	);

	// console.log(notifications);
	const notificationList = Array.from(notifications.keys())
		.map((key) => {
			if (notifications.get(key).data !== null) {
				return {
					soul: notifications.get(key).soul,
					type: notifications.get(key).type,
					data: notifications.get(key).data,
					created: notifications.get(key).createdAt,
				};
			}
		})
		.sort((a, b) => b.created - a.created);

	return (
		<VStack pt={3} space={4} _dark={{ bg: "#121212" }} flex={1}>
			<HStack
				w="full"
				px={4}
				py={4}
				space={2}
				alignItems={"center"}
				justifyContent={"flex-end"}
			>
				<IconButton
					icon="backspace-outline"
					onPress={async () => {
						notificationList.map(({ soul }) => {
							updateInSet(soul, null);
						});
					}}
				/>
				<IconButton
					icon="arrow-back"
					onPress={() => {
						navigation.goBack();
					}}
				/>
			</HStack>
			<ScrollView flex={1}>
				{notificationList.map((notification) => {
					console.log(notification);
					return (
						notification.data && (
							<NotificationCard
								key={notification.soul}
								type={notification.type}
								data={notification.data}
								created={notification.created}
							>
								<IconButton
									icon="close-outline"
									size="md"
									onPress={() => {
										updateInSet(notification.soul, null);
									}}
								/>

								{notification.type === "friend-request" && (
									<IconButton
										icon="checkmark"
										size="md"
										onPress={async () => {
											// user.acceptFriend(notification.pub);
											// generate friend certificate
											user.acceptFriend(
												notification.data
											);
											updateInSet(
												notification.soul,
												null
											);
										}}
									/>
								)}
								{notification.type === "joined-chat" && (
									<IconButton
										icon="enter-outline"
										size="md"
										onPress={async () => {
											// user.acceptFriend(notification.pub);
											// generate friend certificate
											navigation.navigate("Chat", {
												pub: notification.data,
											});
											updateInSet(
												notification.soul,
												null
											);
										}}
									/>
								)}
							</NotificationCard>
						)
					);
					// if (notification.type === "friend-request") {
					// 	return (
					// 		<UserProfile
					// 			publicKey={notification.pub}
					// 			key={notification.soul}
					// 		>
					// <IconButton
					// 	icon="close-outline"
					// 	size="md"
					// 	onPress={() => {
					// 		updateInSet(notification.soul, null);
					// 	}}
					// />
					// 			<IconButton
					// 				icon="checkmark"
					// 				size="md"
					// 				onPress={async () => {
					// 					// user.acceptFriend(notification.pub);
					// 					// generate friend certificate
					// 					user.acceptFriend(notification.pub);
					// 					updateInSet(notification.soul, null);
					// 					// location.reload();
					// 				}}
					// 			/>
					// 		</UserProfile>
					// 	);
					// }
				})}
			</ScrollView>
			<HStack
				safeAreaTop
				mt={"auto"}
				px={"4"}
				py="3"
				alignItems={"center"}
				justifyContent={"flex-end"}
			></HStack>
		</VStack>
	);
}
