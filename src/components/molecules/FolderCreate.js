import React, { useEffect, useState } from "react";
import { Modal } from "../atoms/Modal";
import { PrimaryButton } from "../atoms/Button";
import { VStack, HStack, Text, Center } from "native-base";
import { TextInput } from "../atoms/Input";
import { hash, useAuth, useGunSetState, useGunState } from "../../hooks/useGun";
import { useFileSystem } from "../../hooks/useFileSystem";

export const FolderCreate = ({ isOpen, hideModal, currentPath }) => {
	const [name, setName] = useState("");
	const { createFolder } = useFileSystem();

	return (
		<Modal isOpen={isOpen} hideModal={hideModal}>
			<Text px={4} py={3} fontSize="lg" fontWeight="bold">
				Create Folder
			</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				autofocus
				placeholder="Folder Name"
				icon="folder"
			/>
			<PrimaryButton
				icon="file-tray-stacked"
				colorScheme="primary"
				onPress={() => {
					createFolder(name, currentPath);
					setName("");
					hideModal();
				}}
			>
				New Folder
			</PrimaryButton>
		</Modal>
	);
};
