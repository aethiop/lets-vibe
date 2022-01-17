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
			placeholderTextColor={useColorModeValue("light.400", "dark.400")}
			variant="outline"
			bg={useColorModeValue("light.300", "dark.200")}
			InputLeftElement={
				<Icon
					as={<Ionicons name={props.icon} size="sm" />}
					size="sm"
					px={3}
					mr={2}
					color={useColorModeValue("light.400", "dark.400")}
				/>
			}
		/>
	);
};
export { TextInput };
