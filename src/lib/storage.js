import * as SecureStore from "expo-secure-store";

const asyncFn =
	(fn) =>
	(...args) => {
		return new Promise((resolve) => {
			resolve(fn.call(this, ...args));
		});
	};
export const storage = {
	setItem: asyncFn(SecureStore.setItemAsync.bind(SecureStore)),
	getItem: asyncFn(SecureStore.getItemAsync.bind(SecureStore)),
	removeItem: asyncFn(SecureStore.deleteItemAsync.bind(SecureStore)),
};
