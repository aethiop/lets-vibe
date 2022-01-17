var Gun = typeof window !== "undefined" ? window.Gun : require("gun");
var SEA = typeof window !== "undefined" ? window.SEA : require("gun/sea");
Gun.chain.generateCert = async function (who, where, path) {
	var user = this;
	var gun = user.back(-1);
	var pair = user._.sea;
	let certExists =
		who === "*" ? await user.get(path) : await user.get(path).get(who);
	if (certExists) return;
	let certificate = await SEA.certify(who, where, pair);
	if (who === "*") {
		user.get(path).put(certificate, ({ ok }) => {
			if (ok) console.log("Public Request Certificate created");
		});
	} else {
		user &&
			user
				.get(path)
				.get(who)
				.put(certificate, ({ ok }) => {
					if (ok)
						console.log("Friend Certificate created for: ", who);
					console.log("Friend Certificate: ", certificate);
				});
	}
};
Gun.chain.addFriend = async function (pub) {
	var user = this;
	var gun = user.back(-1);
	var pair = user._.sea;

	const cert = await gun.user(pub).get("certificates/notifications");
	gun.user(pub)
		.get("notifications")
		.set(
			user._.sea.pub,
			({ err }) => {
				if (err) {
					console.log("Error: ", err);
				} else {
					gun.user(pub)
						.get("notify")
						.get("enabled")
						.put(true, null, { opt: { cert } });
					user.generateCert(
						pub,
						{ "*": "friends" },
						"certificates/friends"
					);
					user.generateCert(
						pub,
						{ "*": "chats" },
						"certificates/chats"
					);

					console.log("Request sent");
				}
			},
			{ opt: { cert } }
		);
};

Gun.chain.acceptFriend = async function (pub) {
	var user = this;
	var myPub = user._.sea.pub;
	var gun = user.back(-1);
	user.generateCert(pub, [{ "*": "friends" }], "certificates/friends");

	user.generateCert(pub, { "*": "chats" }, "certificates/chats");
	console.log(
		"CER: ",
		await gun
			.get("~" + pub)
			.get("certificates/friends")
			.get(myPub)
	);
	const cert = await gun
		.get("~" + pub)
		.get("certificates/friends")
		.get(myPub);
	gun.user(pub)
		.get("friends")
		.set(
			myPub,
			({ ok }) => {
				if (ok) user.get("friends").set(pub);
			},
			{ opt: { cert } }
		);
};

export const getFriends = (gun, pub) => {
	const friends = gun.get("~" + pub).get("friends");
	let friendsArray = [];
	friends.map().once(async (friend) => {
		if (friendsArray.includes(friend)) return;
		friendsArray.push(friend);
	});
	return friendsArray;
};
