import { HStack, Text, useColorModeValue } from "native-base";
import { ColoredIcon } from "../atoms/Icon";

export const DescriptiveText = (props) => {
	return (
		<HStack space={4} w={'auto'} alignItems={"center"}>
			<ColoredIcon
				icon={props.icon}
				bgColor={props.iconBg}
				color={useColorModeValue("white", "black")}
			/>
			<Text fontWeight={700} color={useColorModeValue("black", "white")} >{props.title}</Text>
		</HStack>
	);
};
