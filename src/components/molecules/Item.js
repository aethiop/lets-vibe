import React from "react";
import { Modal } from "../atoms/Modal";
import { Card } from "../atoms/Card";
import { Text } from "native-base";

export const Item = (props) => {
    const { name, soul, type } = props.item;
	const [isOpen, setOpen] = React.useState(false);
	return (
		<>
			<Card
				icon={type==="folder" ? "folder" : "document"}
				iconColor={type === "folder" ? "blue" : "green"}
				onPress={() => {}}
			>
				{props.name}
			</Card>
			<Modal isOpen={isOpen} hideModal={() => setOpen(false)}>
				<Text>{props.name}</Text>
			</Modal>
		</>
	);
};
