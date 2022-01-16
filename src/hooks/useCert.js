import React, { createContext, useContext, useMemo, useEffect } from "react";
import { useAuth, useGunState, useUser } from "./useGun";
const CertContext = createContext();

export const CertProvider = ({ children }) => {
	const { gun, user, keys, sea: SEA } = useAuth();
	const { fields: certificates, put } = useGunState(
		user.get("certificates"),
		{
			interval: 0,
		}
	);
	const createPublicCert = async (where) => {
		if (!user || !keys) return;
		await SEA.certify(
			["*"],
			{ "*": where },
			keys,
			(cert) => {
				put({ [where]: cert });
			},
			{}
		);
	};
	const createFriendCert = async (pub, where) => {
		if (!user || !keys) return;
		let certificate = await SEA.certify(
			pub,
			[{ "*": where, "+": "*" }],
			keys,
			null,
			{}
		);
		user.get("certificates")
			.get(where)
			.get(pub)
			.put(certificate, (ack) => {
				if (ack.ok) {
					console.log("Certificate created for", pub);
				}
			});
	};

	const getPublicCert = async (pub, where) => {
		if (!user || !keys) return;
		const certificate = await gun.user(pub).get("certificates").get(where);
		return certificate;
	};

	const getFriendCert = async (pub) => {
		if (!user || !keys) return;
		const certificate = await gun
			.user(pub)
			.get("certificates")
			.get(where)
			.get(keys.pub);
		return certificate;
	};

	const value = useMemo(() => {
		return {
			createPublicCert,
			createFriendCert,
			getPublicCert,
			getFriendCert,
		};
	}, [
		gun,
		user,
		keys,
		SEA,
		createPublicCert,
		createFriendCert,
		getPublicCert,
		getFriendCert,
	]);
	return (
		<CertContext.Provider value={value}>{children}</CertContext.Provider>
	);
};

export const useCert = () => {
	const context = useContext(CertContext);
	if (!context) {
		throw new Error("useFriend must be used within a FriendProvider");
	}
	return context;
};
