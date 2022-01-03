import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useGunState, useGunSetState } from "./useGun";
export const useFile = (
	opts = { size: 1024 * 1024, keys: "", interval: 100, sea: null, user }
) => {
	const { keys, sea, user, interval } = opts;
	const [b64, setB64] = useState(null);
	const { fields: file, put } = useGunState(user.get("library"), {
		keys,
		interval,
		sea,
	});

	const { name, type, mimeType, size } = file;

	const selectFile = async () => {
		const document = await DocumentPicker.getDocumentAsync({});
		const base64 = document.uri;
		const mimeType = document.mimeType;
		const name = document.name;
		//TODO: create a proof for the data
		put({
			name: name,
			type: "FILE",
			mimeType: mimeType,
			size: base64.length,
		});

		return { soul: file["_"], base64 };
	};

	return { selectFile };
};
