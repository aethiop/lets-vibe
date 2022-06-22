var Gun = typeof window !== "undefined" ? window.Gun : require("gun");
var SEA = typeof window !== "undefined" ? window.SEA : require("gun/sea");

Gun.chain.acceptFriend = async function (pub) {
	var user = this;
	var gun = user.back(-1);
	user.generateCert(pub, { "*": "friends" }, "certificates/friends");

	gun.get("~" + pub)
		.get("certificates/friends")
		.get(user.is.pub)
		.once(async (cert) => {
			if (cert) {
				if (
					!(await gun
						.get("~" + pub)
						.get("friends")
						.get(user.is.pub))
				) {
					gun.get("~" + pub)
						.get("friends")
						.set(
							user.is.pub,
							({ ok }) => {
								if (ok) user.get("friends").set(pub);
							},
							{ opt: { cert } }
						);
				}
			}
		});
};

Gun.chain.getUsername = async function (pub) {
	var user = this;
	var gun = user.back(-1);
	gun.get("~" + pub)
		.get("username")
		.once((username) => {
			if (username) return username;
		});
};
