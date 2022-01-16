import React, { useState } from "react";
import { useFriend } from "../../hooks/useFriend";
import { Modal } from "../atoms/Modal";
import { TextInput } from "../atoms/Input";
import { PrimaryButton } from "../atoms/Button";
import { useAuth, useGunSetState, useUser } from "../../hooks/useGun";

export const AddFriend = (props) => {
	const { user, keys, gun, sea } = useAuth();
	const { list: notifications } = useGunSetState(
		user.get("notifications"),
		{}
	);
	const [pub, setPub] = useState("");
	// const { sendRequest } = useFriend();
	const sendRequest = async (pub) => {
		user.addFriend(pub);
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
