import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Gun from "gun/gun";
import SEA from "gun/sea";
import "gun/lib/then";
import "gun/lib/promise";
import "gun/lib/radix";
import "gun/lib/open";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/path";
import "gun/lib/rindexed";
import "../lib/file-upload";
import "../lib/friend";

import * as idb from "idb-keyval";
import { GunProvider } from "../hooks/useGun";
import { ThemeContainer } from "./ThemeContainer";
import { CertProvider } from "../hooks/useCert";
import { NotificationProvider } from "../hooks/useNotifications";
import { FriendProvider } from "../hooks/useFriend";

const linking = {
	prefixes: [
		"http://localhost:19006",
		"http://localhost:3000",
		"https://marda.studio",
		"https://www.marda.studio",
	],
	config: {
		screens: {
			Main: {
				screens: {
					Home: {
						screens: {
							Library: "library",
							Chat: "chat/:room/:user",
							Rooms: "room",
							Notes: "notes",
							Games: "games",
							Tasks: "tasks",
						},
					},
					Settings: "settings",
					Search: "search",
					Profile: { path: "profile/:pub", exact: true },
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
const storage = {
	setItem: asyncFn(idb.set.bind(idb)),
	getItem: asyncFn(idb.get.bind(idb)),
	removeItem: asyncFn(idb.del.bind(idb)),
};

export default function AppContainer({ children }) {
	return (
		<NavigationContainer linking={linking}>
			<GunProvider
				sea={SEA}
				Gun={Gun}
				keyFieldName="vibeKeys"
				storage={storage}
				gunOpts={{
					peers: [
						"https://marda.herokuapp.com/gun",
						"http://localhost:8765/gun",
					],
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
