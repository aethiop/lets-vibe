import React from "react";
import {
	Button,
	IconButton as IB,
	Icon,
	useColorModeValue,
	useColorMode,
	Text,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";


// Primary Button
const PrimaryButton = (props) => {
	const { colorMode } = useColorMode();
	return (
		<Button
			borderRadius="full"
			size="md"
			leftIcon={
				<Icon
					as={<Ionicons name={props.icon} />}
					size="sm"
					color={"white"}
				/>
			}
			colorScheme={colorMode === "dark" ? "light" : "dark"}
			py={3}
			{...props}
		>
			<Text px={2} fontWeight={"bold"} color="white">
				{props.children}
			</Text>
		</Button>
	);
};

const TransparentButton = (props) => {
	const { colorMode } = useColorMode();
	return (
		<Button
			borderRadius="full"
			size="md"
			mx={2}
			colorScheme={colorMode}
			variant="outline"
			leftIcon={
				<Icon
					as={<Ionicons name={props.icon} />}
					size="sm"
					color={useColorModeValue("#121212", "white")}
				/>
			}
			py={3}
			{...props}
		>
			<Text px={2} fontWeight={"bold"}>
				{props.children}
			</Text>
		</Button>
	);
};
const TextButton = (props) => {
	return (
		<Button
			borderRadius="full"
			size="md"
			px={12}
			py={3}
			variant="ghost"
			{...props}
		>
			{props.children}
		</Button>
	);
};
const IconButton = (props) => {
	return (
		<IB
			{...props}
			colorScheme={props.colorScheme || "white"}
			borderRadius={"full"}
			icon={
				<Icon
					as={<Ionicons name={props.icon} />}
					size="sm"
					color={props.color}
				/>
			}
		/>
	);
};
export { PrimaryButton, TextButton, IconButton, TransparentButton };
