import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, StatusBar } from "native-base";
// import { AuthProvider } from "../contexts/auth";
// import { FileSystemProvider } from "../contexts/file";
import Gun from "gun/gun";
import sea from "gun/sea";
import "gun/lib/promise"
import "../lib/file-upload";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";

import * as idb from "idb-keyval";
import { GunProvider } from "../hooks/useGun";
import { ThemeContainer } from "./ThemeContainer";
import { FileSystemProvider } from "../hooks/useFileSystem";

const linking = {
	prefixes: [
		"http://localhost:19006",
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
							Rooms: "room",
							Notes: "notes",
							Games: "games",
							Tasks: "tasks",
						},
					},
					Settings: "settings",
					Search: "search",
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
const peers = ["http://localhost:8765/gun"];

export default function AppContainer({ children }) {
	return (
		<NavigationContainer linking={linking}>
			<GunProvider
				peers={peers}
				sea={sea}
				Gun={Gun}
				keyFieldName="vibeKeys"
				storage={storage}
				gunOpts={{ localStorage: false, radisk: true, peers }}
			>
				<ThemeContainer>{children}</ThemeContainer>
			</GunProvider>
		</NavigationContainer>
	);
}
