import React from "react";
import { Input, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const TextInput = (props) => {
	return (
		<Input
			{...props}
			borderRadius={14}
			fontWeight={600}
			size="md"
			py={3}
			px={3}
			placeholderTextColor={"dark.200"}
			variant="filled"
			bg={"dark.100"}
			InputLeftElement={
				<Icon
					as={<Ionicons name={props.icon} />}
					size={5}
					ml="3"
					color="dark.300"
				/>
			}
		/>
	);
};
export { TextInput };
