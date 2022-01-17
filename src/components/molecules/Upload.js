import React from "react";
import { useFileSystem } from "../../hooks/useFileSystem";
import { PrimaryButton } from "../atoms/Button";

export const Upload = ({ soul, data }) => {
	console.log(soul);
	console.log(data);
	return (
		<PrimaryButton
			icon="cloud-upload"
			onPress={() => {
				console.log("upload");
			}}
		>
			Upload
		</PrimaryButton>
	);
};
