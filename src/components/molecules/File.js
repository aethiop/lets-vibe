import React from "react";
import { Modal } from "../atoms/Modal";
import { Card } from "../atoms/Card";
import { Text, HStack, VStack, Pressable, Center } from "native-base";
import { ColoredIcon, Icon } from "../atoms/Icon";
import { Identity } from "../atoms/Identity";
import { TextInput } from "../atoms/Input";
import { IconButton } from "../atoms/Button";
import { DescriptiveText } from "./DescriptiveText";
import { useGunState, useAuth } from "../../hooks/useGun";
import { formatBytes, uriToFile } from "../../hooks/useFileSystem";
export const File = (props) => {
	const { user } = useAuth();
	const { soul, icon, iconColor } = props;
	const [isOpen, setOpen] = React.useState(false);
	const [onEdit, setEdit] = React.useState(false);
	const {
		fields: file,
		put,
		remove,
	} = useGunState(user.get("dir").get(soul), { interval: 10 });
	const {
		name,
		path,
		parent,
		parentPath,
		proof,
		size,
		pub,
		progress,
		status,
	} = file;
	const download = () => {
		put({ status: "downloading" });
		user.get("dir")
			.get(soul)
			.get("data")
			.download(proof, size, async (pr, file) => {
				if (pr && pr <= 100) put({ progress: pr });
				if (pr === 100) {
					put({ progress: null });
				}
				if (!!file) {
					const fileUri = await uriToFile(file);
					var link = document.createElement("a");
					link.href = window.URL.createObjectURL(fileUri);
					link.download = name;
					link.click();
					window.URL.revokeObjectURL(link.href);
					setOpen(false);
				}
			});
	};

	return (
		<>
			<Card
				icon={props.icon}
				iconColor={props.iconColor}
				onPress={() => {}}
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
					{status === "uploaded" && status !== "idle" && (
						<Pressable onPress={download}>
							<DescriptiveText
								icon={"download-outline"}
								iconBg={"#9E77F1"}
								title="Download FIle"
							></DescriptiveText>
						</Pressable>
					)}
				</VStack>
				<HStack
					space={4}
					px={2}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<HStack space={2} alignItems={"center"}>
						{progress && status !== "idle" && (
							<HStack alignItems={"center"} space={1}>
								<Icon
									name={
										status === "uploading"
											? "arrow-up"
											: "arrow-down"
									}
									size={14}
									color={iconColor}
								/>
								<Text>{progress?.toFixed(0)} %</Text>
							</HStack>
						)}

						<Text fontSize={"xs"} fontWeight={"thin"}>
							Size: {formatBytes(size)}
						</Text>
					</HStack>
					<Text fontSize={"xs"} fontWeight={"thin"}>
						Owned by: {pub?.slice(0, 8)}
					</Text>
				</HStack>
			</Modal>
		</>
	);
};
