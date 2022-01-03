import React, { useState } from "react";
import { Box, Text, Center, Actionsheet, HStack, themeTools, useColorMode, useColorModeValue } from "native-base";
import { Icon } from "./Icon";
import { Pressable } from "react-native";

export const Card = (props) => {
	const {colorMode} = useColorMode()
	return (
		<Pressable
			style={{
				backgroundColor: useColorModeValue("#e7e5e4", "#18181b"),
				borderRadius: 10,
				padding: 10,
				margin: 5,
			}}
			{...props}
		>
			<Box width={24}>
				<Center>
					<Icon icon={props.icon} color={props.iconColor} size={49} />
					<Text fontWeight={"700"} fontSize={"sm"} noOfLines={1}>
						{props.children}
					</Text>
				</Center>
			</Box>
		</Pressable>
	);
};
