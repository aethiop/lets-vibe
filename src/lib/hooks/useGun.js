import React, {
	useState,
	useEffect,
	useReducer,
	useRef,
	useCallback,
	useMemo,
	createContext,
	useContext,
} from "react";

// encrypt data
// @param {string} data
// @param {string || object} key
// @return {string}
export const encrypt = async (data, keys, sea) => {
	return keys && sea ? sea.encrypt(data, keys) : Promise.resolve(data);
};

// decrypt data
// @param {string} data
// @param {string || object} key
// @return {string}
export const decrypt = async (data, keys, sea) => {
	return keys && sea ? sea.decrypt(data, keys) : Promise.resolve(data);
};

export const hash = async (
	data,
	sea,
	max = 16,
	name = "SHA-256",
	salt = null
) => {
	const hashed = await sea.work(data, salt, null, {
		name: name,
		encode: "hex",
	});
	return hashed.slice(0, max);
};
// debounce
// @param {function} dispatch
// @param {string} type
// @param {number} delay
export const debounce = (dispatch, type = "object", delay = 1000) => {
	let updates = [];
	let handler;
	return (update) => {
		updates.push(update);
		if (!handler) {
			handler = setTimeout(() => {
				let stateSlice = updates.reduce(
					(prevState, { id, data }) => {
						if (type === "object") {
							prevState[id] = data;
						} else {
							prevState.set(id, data);
						}
						return prevState;
					},
					type === "object" ? {} : new Map()
				);
				dispatch(stateSlice);
				updates = [];
				handler = null;
			}, delay);
		}
		return () => {
			clearTimeout(handler);
			updates = [];
			handler = null;
		};
	};
};

export const useIsMounted = () => {
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);
	return isMounted;
};
export const nodeReducer = (state, { data, type }) => {
	switch (type) {
		case "add":
			return { ...state, ...data };
		case "remove":
			delete state[data.soul];
			return { ...state };
		default:
			throw new Error(`Unsupported action type: ${type}`);
	}
};

export const setReducer = (state, { data, type }) => {
	switch (type) {
		case "add":
			data.forEach((data) => {
				state.list?.set(data.soul, data);
			});
			return { ...state, list: state.list };
		case "update":
			state.list.set(data.soul, data);
			return { ...state, list: state.list };
		case "remove":
			state.list?.delte(data.soul);
		default:
			throw new Error(`Unsupported action type: ${type}`);
	}
};

export const useSafeReducer = (reducer, initialState) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const isMounted = useIsMounted();
	function safeDispatch(args) {
		if (isMounted.current) {
			dispatch(args);
		}
	}
	return [state, safeDispatch];
};

export const useGun = (Gun, opts) => {
	const [gun, setGun] = useState(Gun({ ...opts }));
	useEffect(() => {
		if (opts) {
			setGun(Gun({ ...opts }));
		}
	}, [Gun, opts]);
	return gun;
};

export const useUser = (gun, pub) => {
	const [user, setUser] = useState(pub ? gun.user(pub) : gun.user());
	useEffect(() => {
		if (gun && !user) {
			setUser(
				pub
					? gun.user(pub)
					: gun.user().recall({ sessionStorage: true })
			);
		}
	}, [user, gun, pub]);
	return user;
};

export const useAuthPair = (gun, keys, authenticate) => {
	const userGraph = useUser(gun);
	const [isAuthed, setIsAuthed] = useState(false);
	gun.on("auth", () => {
		setIsAuthed(true);
	});
	useEffect(() => {
		if (userGraph && !userGraph.is && keys && authenticate) {
			userGraph.auth(keys);
			userGraph.put({ epub: keys.epub });
		}
	}, [authenticate, userGraph, keys]);

	return [userGraph, isAuthed];
};

export const usePair = (sea, prevKeys) => {
	const [newKeys, setNewKeys] = useState(prevKeys);
	useEffect(() => {
		async function getKeySet() {
			const pair = await sea.pair();
			setNewKeys(pair);
		}
		if (!newKeys && !prevKeys) {
			getKeySet();
		}
		if (prevKeys) {
			setNewKeys(prevKeys);
		}
	}, [prevKeys, newKeys, sea]);
	return newKeys;
};

export const useGunNodeUpdated = (
	ref,
	opts = { keys: "", sea: null, useOpen: false },
	cb,
	cleanup
) => {
	const { keys, sea, useOpen } = opts;
	const [appGraph] = useState(ref);
	const handler = useRef(null);
	const isMounted = useIsMounted();

	useEffect(() => {
		if (isMounted.current) {
			const guncb = async (encrypted, soul, message, event) => {
				let decrypted = await decrypt(encrypted, keys, sea);
				cb(decrypted, soul);

				if (!handler.current) {
					handler.current = event;
				}
			};
			if (useOpen) {
				if (!appGraph.open) {
					throw new Error(
						"Include gun/lib/open.js to use useGunNodeUpdated with useOpen"
					);
				} else {
					appGraph.open(guncb);
				}
			} else {
				appGraph.on(guncb);
			}
		}
		return () => {
			if (handler.current) {
				handler.current.off();
			}
			if (cleanup) {
				cleanup && cleanup();
			}
		};
	}, []);
};

export const useGunState = (
	ref,
	opts = { keys: "", sea: null, interval: 100, useOpen: false, cert: null }
) => {
	const { keys, sea, interval, useOpen, cert } = opts;
	const [appGraph] = useState(ref);
	const [fields, dispatch] = useSafeReducer(nodeReducer, {});

	const debouncedHandlers = [];
	const updater = debounce(
		(data) => {
			dispatch({ type: "add", data });
		},
		"object",
		interval
	);
	useGunNodeUpdated(
		appGraph,
		opts,
		(item) => {
			Object.keys(item).forEach((key) => {
				let cleanFn = updater({ id: key, data: item[key] });
				debouncedHandlers.push(cleanFn);
			});
		},
		() => {
			if (debouncedHandlers.length) {
				debouncedHandlers.forEach((c) => c());
			}
		}
	);

	const put = async (data) => {
		let encrypted = await encrypt(data, keys, sea);
		await new Promise((res, rej) => {
			appGraph.put(
				encrypted,
				(ack) => {
					ack.err ? rej(ack.err) : res(data);
				},
				{ opt: { cert } }
			);
		});
	};

	const remove = async (field) => {
		await new Promise((res, rej) => {
			appGraph.put(null, (ack) => {
				ack.err ? rej(ack.err) : res(field);
			});
		});
		dispatch({ type: "remove", data: { soul: field } });
	};

	return { fields, put, remove };
};

export const useGunSetState = (
	ref,
	opts = { keys: "", sea: null, interval: 100, useOpen: false, cert }
) => {
	const { keys, sea, interval, cert } = opts;
	const [appGraph] = useState(ref);
	const [{ list }, dispatch] = useSafeReducer(setReducer, {
		list: new Map(),
	});
	const debouncedHandlers = [];
	const updater = debounce(
		(data) => {
			dispatch({ type: "add", data });
		},
		"map",
		interval
	);

	useGunNodeUpdated(
		appGraph.map(),
		opts,
		(item, soul) => {
			if (item) {
				let cleanFn = updater({
					id: soul,
					data: { ...item, soul },
				});
				debouncedHandlers.push(cleanFn);
			}
		},
		() => {
			if (debouncedHandlers.length) {
				debouncedHandlers.forEach((c) => c());
			}
		}
	);

	const updateInSet = async (soul, data) => {
		let encrypted = await encrypt(data, keys, sea);
		await new Promise((res, rej) => {
			appGraph
				.get(soul)
				.put(encrypted, (ack) => (ack.err ? rej(ack.err) : res(data)));
		});
		dispatch({ type: "update", data: { soul, ...data } });
	};
	const addToSet = async (data, soul) => {
		let encrypted = await encrypt(data, keys, sea);
		if (!soul) {
			await new Promise((res, rej) => {
				appGraph.set(encrypted, (ack) =>
					ack.err ? rej(ack.err) : res(data)
				);
			});
		} else {
			await new Promise((res, rej) => {
				appGraph
					.get(soul)
					.put(encrypted, (ack) =>
						ack.err ? rej(ack.err) : res(data)
					);
			});
		}
	};
	const removeFromSet = async (soul) => {
		await new Promise((res, rej) => {
			appGraph
				.get(soul)
				.put(null, (ack) => (ack.err ? rej(ack.err) : res(soul)));
		});
	};

	return { list, addToSet, updateInSet, removeFromSet };
};

const GunContext = createContext();

export const GunProvider = ({
	Gun,
	sea,
	keyFieldName = "keys",
	storage,
	gunOpts,
	...props
}) => {
	if ((!sea || !Gun, !gunOpts)) {
		throw new Error("Provide SEA and Gun to GunProvider");
	}
	const [{ isReadyToAuth, keys, keyStatus }, setStatus] = useState({
		isReadyToAuth: "",
		keys: null,
		keyStatus: "",
	});
	const gun = useGun(Gun, gunOpts);
	const newKeys = usePair(sea);
	const [user, isAuthed] = useAuthPair(gun, keys, isReadyToAuth === "ready");

	useEffect(() => {
		if (isAuthed && keys && keyStatus === "new") {
			const storeKeys = async () => {
				await storage.setItem(keyFieldName, JSON.stringify(keys));
			};
			storeKeys();
		}
	}, [isAuthed, keys, keyFieldName, storage, keyStatus, user]);

	useEffect(() => {
		if (!keys) {
			const getKeys = async () => {
				const k = await storage.getItem(keyFieldName);
				const ks = JSON.parse(k || "null");
				setStatus({
					isReadyToAuth: "ready",
					keys: ks,
					keyStatus: ks ? "old" : "new",
				});
			};
			getKeys();
		}
	}, [storage, keyFieldName, setStatus, keys]);

	const login = useCallback(
		async (keys) => {
			setStatus({
				isReadyToAuth: "ready",
				keys: keys || newKeys,
				keyStatus: "new",
			});
		},
		[newKeys, setStatus]
	);

	const logout = useCallback(
		(loggedOut) => {
			const removeKeys = async () => {
				await storage.removeItem(keyFieldName);
				loggedOut();
			};
			removeKeys();
		},
		[keyFieldName, storage]
	);

	const value = useMemo(() => {
		const newGun = (opts = gunOpts) => {
			return Gun(opts);
		};
		return {
			gun,
			user,
			login,
			logout,
			sea,
			keys: keys || newKeys,
			isAuthed,
			newGun,
		};
	}, [gun, user, login, logout, sea, keys, newKeys, isAuthed, Gun, gunOpts]);

	return <GunContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
	const context = useContext(GunContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a GunProvider");
	}
	return context;
};
