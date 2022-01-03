import React from "react";
import { Box, useColorModeValue } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Heroicons } from "./Heroicons";
export const ColoredIcon = (props) => {
	return (
		<Box bg={props.bgColor} p={2} borderRadius="xl">
			<Ionicons name={props.icon} size={props.size || "md"} color={props.color || useColorModeValue("#121212", "#ffffff")} {...props} />
		</Box>
	);
};

export const Icon = (props) => {
	return <Ionicons color={props.color ||  useColorModeValue("#121212", "#ffffff")} name={props.icon} {...props} />;
};
