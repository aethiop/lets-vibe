import React, {
	createContext,
	useContext,
	useMemo,
	useState,
	useEffect,
} from "react";
import { useCert } from "./useCert";
import { useFriend } from "./useFriend";

import { useGunSetState, useGunUser, useAuth } from "./useGun";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const { gun, user, keys, isAuthed } = useAuth();
	const { list: notifications } = useGunSetState(user.get("notifications"), {
		interval: 10,
	});
	useEffect(() => {
		console.log("NOTIFICATIONS: ", notifications);
		console.log("Num: ", notifications.size);
	}, [notifications]);

	useEffect(async () => {
		if (isAuthed && keys) {
			await user.generateCert(
				"*",
				[{ "*": "notifications" }, { "*": "notify" }],
				"certificates/notifications"
			);
		}
	}, [isAuthed]);

	//  sendNotifications("examplepub", { inbox: "notifications", data: pub} );)})
	const sendNotification = async (pub, message) => {
		const notifyCert = await gun
			.user(pub)
			.get("certificates/notifications");
		console.log("NOTIFY CERT: ", notifyCert);
		const inbox = gun.user(pub).get(message.inbox);
		inbox.set(
			message.data,
			({ err }) => {
				if (err) {
					console.log("Error: ", err);
				} else {
					gun.user(pub)
						.get("notify")
						.get("enabled")
						.put(true, null, { opt: { cert: notifyCert } });
					user.generateCert(
						pub,
						{ "*": "friends" },
						"certificates/friends"
					);
					user.generateCert(
						pub,
						{ "*": "chats" },
						"certificates/chats"
					);

					console.log("Request sent");
				}
			},
			{ opt: { cert: notifyCert } }
		);
	};

	const value = useMemo(() => {
		return {
			sendNotification,
		};
	}, [user, keys, sendNotification]);
	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error(
			"useNotification must be used within a NotificationProvider"
		);
	}
};
