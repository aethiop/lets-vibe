import React, { useState } from "react";
import { useFriend } from "../../hooks/useFriend";
import { Modal } from "../atoms/Modal";
import { TextInput } from "../atoms/Input";
import { PrimaryButton } from "../atoms/Button";
import { useAuth, useGunSetState, useUser } from "../../hooks/useGun";

import { useNotification } from "../../hooks/useNotifications";
import Gun from "gun/gun";

export const AddFriend = (props) => {
	const { gun, user } = useAuth();
	const [pub, setPub] = useState("");

	const sendRequest = async (pub) => {
		// Send Friend Request

		user.sendNotification(pub, {
			data: user.is.pub,
			type: "friend-request",
			createdAt: Gun.state(),
		});
		user.notify(pub, true);
		user.generateCert(pub, { "*": "friends" }, "certificates/friends");

		// await gun.notify(pub);
		// user.addFriend(pub);x
		// user.sendNotification(pub, {
		// 	data: pub,
		// 	type: "friend-request",
		// });
		props.hideModal();
	};

	return (
		<Modal isOpen={props.isOpen} hideModal={props.hideModal}>
			<TextInput
				value={pub}
				onChangeText={setPub}
				autofocus
				placeholder="Your friend pub"
				icon="person"
			/>
			<PrimaryButton
				icon="file-tray-stacked"
				colorScheme="primary"
				onPress={() => sendRequest(pub)}
			>
				Add Friend
			</PrimaryButton>
		</Modal>
	);
};
