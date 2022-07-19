import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "native-base";
import Gun from "gun/gun";

import SEA from "gun/sea";
import "gun/lib/then";
import "gun/lib/promise";
import "gun/lib/open";
import "gun/lib/store";
import "gun/lib/path";
import "../lib/file-upload";
import "../lib/certificate";
import "../lib/friend";
import "../lib/notifications";

import { storage } from "../lib/storage";
import { GunProvider } from "../hooks/useGun";
import { ThemeContainer } from "./ThemeContainer";
import { CertProvider } from "../hooks/useCert";
import { NotificationProvider } from "../hooks/useNotifications";
import { FriendProvider } from "../hooks/useFriend";
const linking = {
	prefixes: ["https://vibe.marda.studio", "vibe.marda.studio"],
	config: {
		screens: {
			Main: {
				screens: {
					Home: {
						screens: {
							Library: "library/:path",
							Chats: "chats",
							Messages: "messages",
							Notes: "notes",
							Games: "games",
							Tasks: "tasks",
						},
					},
					Chat: "chat/:pub",
					Storybook: "storybook",
					Message: "message/:pub",
					Settings: "settings",
					Notifications: "notifications",
					Friends: "friends",
					Profile: "profile/:user",
				},
			},

			Auth: {
				screens: {
					Login: "login",
					Register: "register",
				},
			},
		},
	},
};
const asyncFn =
	(fn) =>
	(...args) => {
		return new Promise((resolve) => {
			resolve(fn.call(this, ...args));
		});
	};
export default function AppContainer({ children }) {
	return (
		<NavigationContainer
			linking={linking}
			// fallback={<Text>Loading...</Text>}
		>
			<GunProvider
				sea={SEA}
				Gun={Gun}
				keyFieldName="vibeKeys"
				storage={storage}
				gunOpts={{
					peers: ["http://localhost:8765/gun"],
					localStorage: false,
					rad: false,
				}}
			>
				<CertProvider>
					<FriendProvider>
						<NotificationProvider>
							<ThemeContainer>{children}</ThemeContainer>
						</NotificationProvider>
					</FriendProvider>
				</CertProvider>
			</GunProvider>
		</NavigationContainer>
	);
}
