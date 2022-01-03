import React from "react";
import { Text, Pressable, HStack, useColorModeValue } from "native-base";
import { ColoredIcon, Icon } from "../atoms/Icon";
import { IconButton } from "../atoms/Button";

const goBack = (path) => {
	let newPath = path.split("/");
	newPath.splice(newPath.length - 1, 1);
	return !newPath.join("/") ? "/" : newPath.join("/");
};

const showPath = (path) => {
	const pathArr = path.split("/").filter((p) => p);
	const len = pathArr.length;
	const arr = [
		<Icon
			icon={len < 1 ? "home" : "home-outline"}
			key={"root"}
			size={18}
		/>,
	];

	pathArr.map((p, _) => {
		_ === len - 1
			? arr.push(
					<HStack key={p} alignItems={"center"} space={2}>
						<Icon
							icon="chevron-forward"
							size={24}
						/>
						<Text fontWeight={"700"} fontSize={"md"} key={_ + 1}>
							{p}
						</Text>
					</HStack>
			  )
			: arr.push(
					<HStack key={_ + 1} alignItems={"center"} space={2}>
						<Icon
							icon="chevron-forward"
							size={24}
						/>
						<Text fontWeight={'thin'} fontSize={"md"}>{p}</Text>
					</HStack>
			  );
	});
	return arr;
};

export const Path = ({ currentPath, navigation }) => {
	return (
		<HStack alignItems={"center"} space={3} w="full" overflowX="auto">
			<IconButton
				disabled={currentPath === "/"}
				icon={currentPath === "/" ? "chevron-back-circle-outline" : "chevron-back-circle"}
				onPress={() =>
					currentPath === "/"
						? null
						: navigation.setParams({ path: goBack(currentPath) })
				}
			/>
			{showPath(currentPath, navigation)}
		</HStack>
	);
};
