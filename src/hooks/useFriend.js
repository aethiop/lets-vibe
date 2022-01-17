import React, { createContext, useContext, useMemo, useEffect } from "react";
import { useAuth, useGunSetState, useGunState } from "./useGun";
import { useCert } from "./useCert";

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
	const { gun, user, keys, sea: SEA } = useAuth();
	const { list: friends } = useGunSetState(user.get("friends"), {});
	// const { createFriendCert, getFriendCert, getPublicCert } = useCert();

	// const getFriendProfile = async (pub) => {
	// 	if (!user || !keys) return;
	// 	const profile = await gun.user(pub).get("profile");
	// 	return profile;
	// };

	// const sendFriendRequest = async (pub) => {
	// 	if (!user || !keys) return;

	// 	const cert = await getPublicCert(pub, "@notifications");

	// 	console.log(cert);
	// 	const friend = gun.user(pub);
	// 	friend
	// 		.get("@notifications")
	// 		.put(keys.pub, null, { opt: { cert: cert } });
	// 	// user.get("notifications").put({
	// 	// 	message: "friend request sent",
	// 	// 	pub,
	// 	// 	timestamp: Gun.state(),
	// 	// });

	// 	// gun.user(pub)
	// 	// 	.get("notifications")
	// 	// 	.set(
	// 	// 		keys.pub,
	// 	// 		async ({ err }) => {
	// 	// 			if (err)
	// 	// 				return console.log({
	// 	// 					errMessage: err,
	// 	// 					errCode: "gun-set-error",
	// 	// 				});
	// 	// 			else {
	// 	// 				await createFriendCert(pub, "friends");
	// 	// 				return console.log("Friend request sent to --- " + pub);
	// 	// 			}
	// 	// 		},
	// 	// 		{ opt: { cert: cert } }
	// 	// 	);
	// };

	// const acceptFriendRequest = async (pub, soul) => {
	// 	if (!user || !keys) return;
	// 	const friend = gun.user(pub);
	// 	const friendCert = await getFriendCert(pub, "friends");
	// 	friend
	// 		.get("friends")
	// 		.set(keys.pub, null, { opt: { cert: friendCert } });
	// 	user.get("notifications").get(soul).put(null);
	// };

	// const rejectFriendRequest = async (soul) => {
	// 	user.get("notifications").get(soul).put(null);
	// };
	async function generateRequestsCertificate() {
		let certExists = await user.get("certificates").get("requests");
		if (certExists) return;
		let certificate = await SEA.certify(["*"], [{ "*": "requests" }], keys);
		user.get("certificates")
			.get("requests")
			.put(certificate, ({ ok }) => {});
	}

	async function sendRequest(pub) {
		const cert = await gun.user(pub).get("certificates").get("requests");
		// generateFriendCertificate(pub);

		if (!user || !keys) return;

		gun.user(pub).get("request").put(keys.pub, null, { opt: { cert } });
	}
	function acceptRequest(pub, soul) {
		generateFriendCertificate(pub);

		gun.user(pub)
			.get("certificates")
			.get("friends")
			.get(keys.pub)
			.once((certificate) => {
				gun.user(pub)
					.get("friends")
					.set(keys.pub, null, { opt: { certificate } });
			});
		user.get("requests").get(soul).put(null);
		user.get("requests").get(soul).put(null);
		user.get("friends").set(pub);
	}
	function rejectRequest(soul) {
		user.get("requests").get(soul).put(null);
	}
	async function generateFriendCertificate(pub) {
		let cert = await SEA.certify(
			pub,
			[{ "*": "friends" }, { "*": "certificates" }],
			keys
		);
		user.get("certificates")
			.get("friends")
			.get(pub)
			.put(cert, ({ ok }) => {
				console.log("Friend Certificate created for: ", pub);
			});
	}

	const value = useMemo(() => {
		return {
			sendRequest,
			acceptRequest,
			rejectRequest,
			generateRequestsCertificate,
			generateFriendCertificate,
		};
	}, [
		user,
		keys,
		sendRequest,
		acceptRequest,
		rejectRequest,
		generateRequestsCertificate,
		generateFriendCertificate,
	]);

	return (
		<FriendContext.Provider value={value}>
			{children}
		</FriendContext.Provider>
	);
};

export const useFriend = () => {
	const context = useContext(FriendContext);
	if (!context) {
		throw new Error("useFriend must be used within a FriendProvider");
	}
	return context;
};
