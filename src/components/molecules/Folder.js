import React from "react";
import { Modal } from "../atoms/Modal";
import { Card } from "../atoms/Card";
import { Text, HStack, VStack, Pressable, Center } from "native-base";
import { ColoredIcon } from "../atoms/Icon";
import { IconButton } from "../atoms/Button";
import { Identity } from "../atoms/Identity";
import { TextInput } from "../atoms/Input";
import { DescriptiveText } from "./DescriptiveText";
import { useAuth, useGunState, useGunSetState } from "../../hooks/useGun";
import { formatBytes } from "../../hooks/useFileSystem";

export const Folder = (props) => {
	const { user } = useAuth()
	const {  soul, icon, iconColor, navigation } = props;
	const { fields: folder, put, remove } = useGunState(user.get("dir").get(soul), { interval: 10 });
	const {name, path, parent, parentPath, size, pub } = folder;
	const [isOpen, setOpen] = React.useState(false);
	const [onEdit, setEdit] = React.useState(false);
	return !!folder &&
		(<>
			<Card
				icon={icon}
				iconColor={iconColor}
				onPress={() => navigation.setParams({ path: path })}
				onLongPress={() => setOpen(true)}
			>
				{name}
			</Card>
			<Modal isOpen={isOpen} hideModal={() => setOpen(false)}>
				<Center py={2} px={2}>
					<DescriptiveText
						icon={icon}
						iconBg={iconColor}
						title={name}
					/>
				</Center>

				<VStack space={3} py={2} px={2}>
				
				</VStack>
				<HStack
					space={4}
				px={2}
				justifyContent={'space-between'}
					alignItems={"center"}
				>
					<Text fontSize={"xs"} fontWeight={"thin"}>
					Size: {formatBytes(size)}
					</Text>
					<Text fontSize={"xs"} fontWeight={"thin"}>
						Owned by: {pub?.slice(0, 8)}
					</Text>
				</HStack>
			</Modal>
		</>)
};
