import React, {
	createContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
	useContext,
} from "react";
import { useAuth, useGunState, useGunSetState, hash } from "./useGun";

const CertificateContext = createContext();
export const CertificateProvider = ({ children }) => {
	const [root, setRoot] = useState(null);
	const { gun, user, sea, keys, isAuthed, } = useAuth();

	const { fields: directory, put } = useGunState(user.get("dir"), {});
	const { list: directoryList, updateInSet } = useGunSetState(
		user.get("dir"),
		{}
	);

	const generateCertificate = async (field) => {
		let certificate = await SEA.certify(["*"], [{"*": field}], {keys, null, {}}])
	} 
		


	const directoryKeys = Array.from(directoryList.keys());
	const directoryArray = directoryKeys.map((k) => {
		return { [k]: directoryList.get(k) };
	});
	const initRoot = async () => {
		const rootHash = await hash(keys.pub + "/", sea, 16);
		setRoot(rootHash);
		const initialDir = await user.get("dir").get(rootHash);
		if (!!directory && isAuthed && !initialDir) {
			console.log("Creating Root Folder");
			const rootFolder = {
				[rootHash]: {
					name: "root",
					type: "folder",
					path: "/",
					parentPath: null,
					children: null,
					parent: null,
					size: 0,
					created: Gun.state(),
					modified: Gun.state(),
					pub: keys.pub,
				},
			};
			put(rootFolder);
		}
	};
	useEffect(async () => {
		if (!!directory && isAuthed && !root) {
			await initRoot();
		}
	}, [directory]);
	const getParent = async (currentPath) => {
		if (currentPath === "/" || currentPath === null) {
			const rootHash = await hash(keys.pub + "/", sea, 16);
			return { soul: rootHash, ...directoryList.get(rootHash) };
		} else {
			const parentHash = await hash(currentPath, sea, 16);
			return { soul: parentHash, ...directoryList.get(parentHash) };
		}
	};
	const showCurrentPath = useCallback(
		(parentPath) => {
			const list = [];

			directoryKeys.forEach((k) => {
				if (directoryList.get(k).parentPath === parentPath) {
					list.push(directoryList.get(k));
				}
			});
			return list;
		},
		[directoryKeys, directoryList]
	);
	const updateParent = async (parentId, child) => {
		if (directoryList.get(parentId) && child.soul) {
			user.get("dir").get(parentId).get("children").set(child.soul);
		}
		if (child.type === "file" || child.type === "folder" && child.size > 0) {
			
			user.get("dir").get(parentId).once(async (data,) => {
				if (data && data.parent) {
					console.log("updating parent");
					console.log(data.size);
					user.get("dir").get(parentId).get("size").put(data.size + child.size);
					updateParent(data.parent, {size: child.size, type: data.type});

				}
			})
		}
	};

	const checkDirectory = (parentId, child) => {
		let found = 0;

		directoryKeys.forEach((k) => {
			console.log(directoryList.get(k))
			if (
				directoryList.get(k).name.includes(child.name) &&
				child.parent === parentId
			) {
				found++;
			}
		});
		return found;
	};

	const createFolder = async (folderName, parentPath) => {
		const { soul: parentId } = await getParent(parentPath);
		const newFolder = {
			name: folderName,
			type: "folder",
			parent: parentId,
			parentPath: parentPath,
			children: null,
			size: 0,
			created: Gun.state(),
			modified: Gun.state(),
			pub: keys.pub,
		};
		console.log(newFolder);
		const found = checkDirectory(parentId, newFolder);
		console.log(found);
		if (found > 0) {
			newFolder.name = `${newFolder.name} (${found})`;
		}
		newFolder.path =
			parentPath === "/"
				? `${parentPath}${newFolder.name}`
				: `${parentPath}/${newFolder.name}`;
		const folderId = await hash(newFolder.path, sea, 16);
		await updateParent(parentId, { soul: folderId, ...newFolder });
		put({ [folderId]: newFolder });
	};

	const uploadFile = async (file, parentPath) => {
		const { soul: parentId } = await getParent(parentPath);


		const fileHash = await hash(file.uri, sea, 16);

		const newFile = {
			name: file.name,
			type: "file",
			status: "idle",
			progress: null,
			parent: parentId,
			parentPath: parentPath,
			mimeType: file.mimeType,
			size: file.size,
			path: null,
			data: null,
			pub: keys.pub,
			proof: await SEA.work(file.uri, null, null , {name: "SHA-256"}),
			created: Gun.state(),
			modified: Gun.state(),
		};
		const found = checkDirectory(parentId, newFile);
		console.log(found);
		if (found > 0) {
			let temp = newFile.name.split(".");
			if (temp.length > 1) {
				temp[temp.length - 2] = `${temp[temp.length - 2]} (${found})`;
				newFile.name = temp.join(".");
			} else {
				newFile.name = `${newFile.name} (${found})`;
			}
		}
		newFile.path =
			parentPath === "/"
				? `${parentPath}${newFile.name}`
				: `${parentPath}/${newFile.name}`;
		put({ [fileHash]: newFile });
		await updateParent(parentId, { soul: fileHash, ...newFile });
		return { soul: fileHash, data: file.uri };
	};

	const value = useMemo(() => {
		return {
			createFolder,
			showCurrentPath,
			uploadFile,
		};
	});

	return (
		<FileSystemContext.Provider value={value}>
			{children}
		</FileSystemContext.Provider>
	);
};

export const useFileSystem = () => {
	const context = useContext(FileSystemContext);
	if (!context) {
		throw new Error(
			"useFileSystem must be used within a FileSystemProvider"
		);
	}
	return context;
};
