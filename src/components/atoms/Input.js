import React from "react";
import { Input, Icon, useColorModeValue } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const TextInput = (props) => {
	return (
		<Input
			{...props}
			borderRadius="full"
			fontWeight={600}
			size="md"
			py={2}
			px={3}
			placeholderTextColor={useColorModeValue("light.400", "dark.400")}
			variant="filled"
			bg={useColorModeValue("light.300", "dark.200")}
			InputLeftElement={
				<Icon
					as={<Ionicons name={props.icon} />}
					size={5}
					px={3}
					color={useColorModeValue("light.400", "dark.400")}
				/>
			}
		/>
	);
};
export { TextInput };
