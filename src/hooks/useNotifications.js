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

	const value = useMemo(() => {
		return {};
	}, []);
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
