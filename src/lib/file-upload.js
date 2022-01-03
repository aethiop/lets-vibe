var Gun = typeof window !== "undefined" ? window.Gun : require("gun");
var SEA = typeof window !== "undefined" ? window.SEA : require("gun/sea");

Gun.chain.upload = function (b64, opt, cb) {
	const gun = this;
	var length = b64.length;
	var size = Math.ceil(length / 1024);
	
	opt = opt || { size: 1024 * 1024 };
	// info.id = Gun.text.random();
	splitAndUpload(b64, 0);

	async function splitAndUpload(b64, chunks) {
		chunks = chunks || 0;
		var b64String = b64.slice(0, opt.size);

		if (b64.length) {
			gun.get(chunks).put(
				b64String,
				({ ok, err }) => {
					if (ok) {
						chunks++;
						splitAndUpload(b64.slice(opt.size), chunks);
					}
				},
				{ opt: { cert: opt.cert } }
			);
			cb((1 - b64.length / length) * 100);
		} else {
			cb(100);
			return;
		}
	}
};

Gun.chain.download = async function (proof, size, cb) {
	const gun = this;
	loop();

	async function loop(i, chunks) {
		i = i || 0;
		chunks = chunks || [];
		let currentProof = await SEA.work(chunks.join(""), null, null, {
			name: "SHA-256",
		});
		if (proof === currentProof) {
			cb(100, chunks.join(""));
			return;
		}
		gun.get(i)
			.promOnce()
			.then(({ ref, data }) => {
					if (!!data ) {
						chunks[i] = data;
						cb((chunks.join("").length / size) * 100, null);
						loop(i + 1, chunks);
					}
				});
	}
};
