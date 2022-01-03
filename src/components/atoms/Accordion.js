import React, { useState, useReducer } from "react";
import { MotiView } from "moti";
import { Pressable, VStack, HStack, Text, View } from "native-base";
import { Icon, ColoredIcon } from "../atoms/Icon";
import { DescriptiveText } from "../molecules/DescriptiveText";

function useLayout() {
	const [layout, setLayout] = useState({
		height: 0,
	});
	const onLayout = ({ nativeEvent }) => {
		setLayout(nativeEvent.layout);
	};

	return [layout, onLayout];
}

export const Accordion = ({ name, icon, color, listHeight, children }) => {
	const [{ height }, onLayout] = useLayout();
	const [open, toggle] = useReducer((s) => !s, false);

	return (
		<VStack space={4} flex={1} w="full">
			<Pressable w="full" onPress={toggle}>
				<HStack space={4} px="4" alignItems={"center"}>
					<DescriptiveText
						icon={icon}
						iconFg="black"
						iconBg={color}
						title={name}
					/>

					<HStack flex={1} justifyContent={"flex-end"}>
						<Icon
							color="white"
							icon={!open ? "chevron-back" : "chevron-down"}
							size={"md"}
						/>
					</HStack>
				</HStack>
			</Pressable>
			<MotiView
				transition={{ type: "timing" }}
				animate={{ height }}
				style={{ overflow: "hidden" }}
			>
				<View onLayout={onLayout} height={open ? listHeight : 0}>
					{children}
				</View>
			</MotiView>
		</VStack>
	);
};
