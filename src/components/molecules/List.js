import React, { useState } from "react";
import { Pressable, VStack, HStack, Text } from "native-base";
import { Icon, ColoredIcon } from "../atoms/Icon";
import { Item } from "./Item";

export const List = ({ list }) => {
	const [open, setOpen] = useState(false);
	const height = open ? "auto" : 0;

	return (
		<>
			<Pressable onPress={() => setOpen(!open)}>
				<HStack space={4} px="4" alignItems={"center"}>
					<ColoredIcon icon={list.icon} s color={list.color} />
					<Text fontWeight={700}>{list.name}</Text>
					<HStack flex={1} justifyContent={"flex-end"}>
						<Icon icon="chevron-back" size={"md"} />
					</HStack>
				</HStack>
			</Pressable>
			<VStack space={4}>
				{list.items.map((item, index) => (
					<Item {...{ item, key: index }} />
				))}
			</VStack>
		</>
	);
};
