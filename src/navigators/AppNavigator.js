import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMenuNavigator } from "../components/organisms/MenuNavigator";
import NotesScreen from "../screens/App/Notes/Notes";
import GameScreen from "../screens/App/Games/Games";
import LibraryScreen from "../screens/App/Library/Library";
import TaskScreen from "../screens/App/Tasks/Tasks";
import { useAuth, useGunSetState } from "../hooks/useGun";
import { FileSystemProvider } from "../hooks/useFileSystem";
import RoomNavigation from "./RoomNavigation";
import Chats from "../screens/App/Chat/Chat";
const Stack = createNativeStackNavigator();

const MenuNav = createMenuNavigator();
const LibraryView = (props) => {
	return (
		<FileSystemProvider>
			<LibraryScreen {...props} />
		</FileSystemProvider>
	);
};

export default function AppNavigation() {
	const { user, keys } = useAuth();

	// useEffect(() => {
	// 	if (notificationList.length > 0) {
	// 		notificationList.map((notification) => {
	// 			console.log(notification);
	// 			new Notification("Friend Request", {
	// 				body:
	// 					"You have a friend request from: " +
	// 					notification.pub.slice(0, 8),
	// 			});
	// 		});
	// 	}
	// 	return () => {};
	// }, [notificationList]);
	// console.log(notificationList);
	return (
		<MenuNav.Navigator
			initialRouteName="Library"
			screenOptions={{
				headerShown: false,
			}}
		>
			<MenuNav.Screen
				name="Library"
				component={LibraryView}
				options={{
					icon: "folder-open",
					title: "Library",
					pub: keys.pub,
				}}
				initialParams={{
					path: "/",
				}}
			/>
			<MenuNav.Screen
				name="Chats"
				component={Chats}
				options={{
					icon: "chatbubble",
					title: "Chats",
					pub: keys.pub,
				}}
			/>

			{/* <MenuNav.Screen
				name="Rooms"
				component={RoomScreen}
				options={{
					icon: "cube",
					title: "Rooms",
					pub: keys.pub,
				}}
			/>
			<MenuNav.Screen
				name="Notes"
				component={NotesScreen}
				options={{
					icon: "book",
					title: "Notes",
					pub: keys.pub,
				}}
			/>
			<MenuNav.Screen
				name="Games"
				component={GameScreen}
				options={{
					icon: "game-controller",
					title: "Games",
					pub: keys.pub,
				}}
			/>
			<MenuNav.Screen
				name="Tasks"
				component={TaskScreen}
				options={{
					icon: "checkbox",
					title: "Task",
					pub: keys.pub,
				}}
			/> */}
		</MenuNav.Navigator>
	);
}
