import { VStack, Text, HStack, Box, Pressable } from "native-base";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { IconButton, PrimaryButton } from "../../../components/atoms/Button";
import * as DocumentPicker from "expo-document-picker";
import { TextInput } from "../../../components/atoms/Input";
import { Heading } from "../../../components/molecules/Heading";
import { useAuth, useGunSetState, useGunState } from "../../../hooks/useGun";
import { useFile, useUpload } from "../../../hooks/useFile";
import { FileUpload } from "../../../components/molecules/FileUpload";
import { FolderCreate } from "../../../components/molecules/FolderCreate";
import { useFileSystem } from "../../../hooks/useFileSystem";
import { ColoredIcon } from "../../../components/atoms/Icon";
import { Path } from "../../../components/molecules/Path";
import { Tree } from "../../../components/molecules/Tree";

export default function Library({ navigation, route }) {
	const [showFolderModal, setShowFolderModal] = useState(false);
	const [showFileModal, setShowFileModal] = useState(false);
	const { showCurrentPath } = useFileSystem();
	const path = route.params.path;
	const items = showCurrentPath(path);

	return (
		<>
			<VStack space={4} flex={1}>
				<VStack px={4} py={3} space={4} flex={1}>
					<Path currentPath={path} navigation={navigation} />
					<Tree items={items} navigation={navigation} />
					<FolderCreate
						isOpen={showFolderModal}
						hideModal={() => setShowFolderModal(false)}
						currentPath={path}
					/>
					<FileUpload
						isOpen={showFileModal}
						currentPath={path}
						hideModal={() => {
							setShowFileModal(false);
						}}
					/>
				</VStack>
				<HStack
					py={3}
					px={4}
					space={2}
					justifyContent={"flex-end"}
					safeAreaTop
					safeAreaBottom
				>
					<IconButton
						onPress={() => {
							setShowFolderModal(true);
						}}
						icon="folder-outline"
					/>
					<IconButton
						onPress={() => {
							setShowFileModal(true);
						}}
						icon="document-outline"
					/>
				</HStack>
			</VStack>
		</>
	);
}
