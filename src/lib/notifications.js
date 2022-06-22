var Gun = typeof window !== "undefined" ? window.Gun : require("gun");
var SEA = typeof window !== "undefined" ? window.SEA : require("gun/sea");

// Gun.chain.useCertificate = async function (pub, certPath, path, cb) {
// 	const user = this;
// 	const gun = user.back(-1);
// 	const notifyCert = await user.getCertificate(pub, certPath);

// 	const inbox = gun.user(pub).get(path);
// 	cb({ cert: notifyCert, inbox });
// };

Gun.chain.notify = async function (pub, message) {
	var gun = this;
	gun.user(pub)
		.get("certificates/notifications")
		.once((cert) => {
			if (cert)
				gun.user(pub)
					.get("notify")
					.get("enabled")
					.put(
						message,
						({ ok, err }) => {
							if (ok) {
								console.log("Notified");
							} else {
								console.log("Notify not successful");
							}
						},
						{ opt: { cert } }
					);
		});
};

/**
 *
 * @param {string} pub
 * @param {object} message
 */
Gun.chain.sendNotification = async function (pub, message) {
	var user = this;
	var gun = user.back(-1);

	gun.get("~" + pub)
		.get("certificates/notifications")
		.once((cert) => {
			if (cert)
				gun.user(pub)
					.get("notifications")
					.set(
						message,
						({ ok, err }) => {
							if (ok) console.log("Notification sent to: ", pub);
							if (err)
								console.log("Notification failed to: ", pub);
						},
						{
							opt: {
								cert,
							},
						}
					);
		});
};
