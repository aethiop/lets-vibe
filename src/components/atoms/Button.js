import React from "react";
import { Button } from "native-base";

const PrimaryButton = (props) => {
	return (
		<Button borderRadius={14} size="md" px={12} py={3} w="full" {...props}>
			{props.children}
		</Button>
	);
};
const TextButton = (props) => {
	return (
		<Button
			borderRadius={14}
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
export { PrimaryButton, TextButton };
