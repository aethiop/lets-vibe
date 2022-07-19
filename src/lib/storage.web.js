import * as idb from "idb-keyval";
const asyncFn =
	(fn) =>
	(...args) => {
		return new Promise((resolve) => {
			resolve(fn.call(this, ...args));
		});
	};
export const storage = {
	setItem: asyncFn(idb.set.bind(idb)),
	getItem: asyncFn(idb.get.bind(idb)),
	removeItem: asyncFn(idb.del.bind(idb)),
};
