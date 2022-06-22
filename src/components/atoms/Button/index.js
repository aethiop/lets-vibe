import React from "react";
import {
	Button as Bt,
	IconButton as IB,
	Icon,
	useColorModeValue,
	useColorMode,
	Text,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

/**
 * props:
 * 		onPress: function
 * 		icon: string
 * 		color: string
 * 		colorScheme: string
 */
const Button = (props) => {
	const {
		variant,
		scheme,
		leftIcon,
		rightIcon,
		iconSize,
		size,
		iconColor,
		roundness,
		textColor,
		textSize,
		textWeight,
		...rest
	} = props;

	return (
		<Bt
			borderRadius={roundness || "full"}
			size={size || "md"}
			leftIcon={
				leftIcon && (
					<Icon
						as={<Ionicons name={leftIcon} />}
						size={iconSize || "sm"}
						color={iconColor || "white"}
					/>
				)
			}
			rightIcon={
				rightIcon && (
					<Icon
						as={<Ionicons name={rightIcon} />}
						size={iconSize || "sm"}
						color={iconColor || "white"}
					/>
				)
			}
			colorScheme={scheme}
			px={3}
			py={3}
			{...rest}
		>
			{props.children && typeof props.children == "string" ? (
				<Text
					px={2}
					fontSize={textSize || "md"}
					fontWeight={textWeight || "bold"}
					color={textColor || "white"}
				>
					{props.children}
				</Text>
			) : (
				props.children
			)}
		</Bt>
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
export { Button, TextButton, IconButton };
