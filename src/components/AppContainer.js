import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "gun/lib/mobile";
import Gun from "gun/gun";

import SEA from "gun/sea";
import "gun/lib/then";
import "gun/lib/promise";
import "gun/lib/open";
import "gun/lib/store";
import "gun/lib/path";
import "../lib/file-upload";
import "../lib/friend";

import * as idb from "idb-keyval";
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
							Library: "library",
							Chats: {
								screens: {
									Chats: "chats",
									Chat: "chats/:pub",
								},
							},
							Room: {
                screens: {
                  Rooms: "rooms",
                  Room: "room/",
                },
              },
							Notes: "notes",
							Games: "games",
							Tasks: "tasks",
						},
					},
					Settings: "settings",
					Search: "search",
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
					peers: ["https://marda.herokuapp.com/gun"],
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
