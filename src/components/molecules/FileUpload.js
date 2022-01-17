import React, { useState, useEffect } from "react";
import { Modal } from "../atoms/Modal";
import { PrimaryButton } from "../atoms/Button";
import { VStack, HStack, Text, Center, Progress } from "native-base";
import { ColoredIcon } from "../atoms/Icon";
import * as DocumentPicker from "expo-document-picker";
import { Upload } from "./Upload";
import { useAuth, useGunState, hash } from "../../hooks/useGun";
import { useFileSystem, formatBytes } from "../../hooks/useFileSystem";
export const FileUpload = ({ isOpen, currentPath, hideModal }) => {
	const [fileSelected, setFileSelected] = useState(null);
	const [data, setData] = useState(null);
	const [soul, setSoul] = useState(null);
	const { user, sea } = useAuth();
	const { uploadFile } = useFileSystem();
	const selectFile = async () => {
		const result = await DocumentPicker.getDocumentAsync({});
		if (result.type !== "cancel") {
			setFileSelected(result);
			if (fileSelected) {
			}
		}
	};

	const upload = async () => {
		const { soul, data } = await uploadFile(fileSelected, currentPath);
		const fileNode = user.get("dir").get(soul);
		fileNode.get("status").put("uploading");
		fileNode.get("data").upload(data, null, (p) => {
			if (p === 100) {
				fileNode.get("status").put("uploaded");
			}
			p && fileNode.get("progress").put(p);
		});
		setFileSelected(null);
	};
	return (
		<Modal isOpen={isOpen} hideModal={hideModal}>
			{!fileSelected ? (
				<>
					<Text px={4} py={3} fontSize="lg" fontWeight="bold">
						Upload File
					</Text>

					<PrimaryButton
						icon="file-tray"
						colorScheme="primary"
						onPress={selectFile}
					>
						Select File
					</PrimaryButton>
				</>
			) : (
				<>
					<HStack
						space={4}
						px={4}
						py={3}
						alignItems={"center"}
						justifyContent={"space-between"}
					>
						<Center>
							<ColoredIcon bgColor="#fff" icon="document" />
						</Center>
						<Text fontWeight="bold">{fileSelected.name}</Text>
						<Center>
							<Text>{formatBytes(fileSelected.size)}</Text>
						</Center>
					</HStack>

					<PrimaryButton
						colorScheme="primary"
						icon="cloud-upload"
						onPress={upload}
					>
						Upload
					</PrimaryButton>
					{/* <Upload soul={soul} data={data} /> */}
				</>
			)}
		</Modal>
	);
};
