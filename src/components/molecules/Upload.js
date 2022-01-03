import React from "react";
import { PrimaryButton } from "../atoms/Button";

export const Upload = ({ file }) => {
	console.log(file);
	return (
		<PrimaryButton
			icon="cloud-upload"
			onPress={() => {
				console.log("upload");
				console.log(file);
			}}
		>
			Upload
		</PrimaryButton>
	);
};
