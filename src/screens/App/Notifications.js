import React, { useEffect, useState } from "react";
import {
	Center,
	Text,
	VStack,
	HStack,
	Box,
	Icon,
	useColorModeValue,
} from "native-base";
import { TextInput } from "../../components/atoms/Input";
import { IconButton, PrimaryButton } from "../../components/atoms/Button";
import { useAuth, useGunSetState } from "../../hooks/useGun";
import { UserProfile } from "../../components/molecules/UserProfile";

export default function NotificationScreen({ navigation }) {
	const { gun, user } = useAuth();
	const { list: notifications, updateInSet } = useGunSetState(
		user.get("notifications"),
		{}
	);

	const notificationList = Array.from(notifications.keys()).map((key) => {
		if (notifications.get(key) !== null) {
			return {
				key,
				pub: Object.values(notifications.get(key))
					.slice(0, -1)
					.join(""),
			};
		}
	});

	return (
		<VStack space={4} _dark={{ bg: "#121212" }} flex={1}>
			<HStack
				w="full"
				px={4}
				py={4}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<IconButton
					icon="arrow-back"
					onPress={() => {
						navigation.goBack();
					}}
				/>
			</HStack>
			{notificationList.map((notification) => {
				console.log(notification);
				if (notification.pub) {
					return (
						<UserProfile
							publicKey={notification.pub}
							key={notification.key}
						>
							<IconButton
								icon="close-outline"
								size="md"
								onPress={() => {
									updateInSet(notification.key, null);

									// removeFromSet(notification.key);
									// removeFromSet(notification.key);
								}}
							/>
							<IconButton
								icon="checkmark"
								size="md"
								onPress={async () => {
									// removeFromSet(notification.key);
									user.acceptFriend(notification.pub);
									updateInSet(notification.key, null);
									// location.reload();
								}}
							/>
						</UserProfile>
					);
				}
			})}

			{/* {Object.keys(notification).length > 0 &&
				Object.keys(notification)?.map((key) => {
					var pub = notification[key].pub;
					var name = notification[key].name;
					return (
						<UserProfile publicKey={pub} username={name} key={key}>
							<IconButton
								icon="close-outline"
								size="md"
								onPress={() => {
									user.rejectFriend(key);
									
								}}
							/>
							<IconButton
								icon="checkmark"
								size="md"
								onPress={async () => {
									await user.acceptFriend(pub, key);
									
								}}
							/>
						</UserProfile>
					);
				})} */}
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
