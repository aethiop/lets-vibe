// import React from "react";
// import { View } from "react-native";

// export default function ResonanceAudio() {
// 	let audioSource = require("./assets/Nothing Without You.mp3");
// 	const audioRef = useRef(new Audio(audioSource));

// 	let audioContext = new AudioContext();
// 	let resonanceAudio = new ResonanceAudio(audioContext);

// 	resonanceAudio.output.connect(audioContext.destination);
// 	let roomDimensions = {
// 		width: 3.1,
// 		height: 2.5,
// 		depth: 3.4,
// 	};
// 	let roomMaterials = {
// 		// Room wall materials
// 		left: "brick-bare",
// 		right: "curtain-heavy",
// 		front: "marble",
// 		back: "glass-thin",
// 		// Room floor
// 		down: "grass",
// 		// Room ceiling
// 		up: "brick-bare",
// 	};
// 	resonanceAudio.setRoomProperties(roomDimensions, roomMaterials);
// 	let audioElementSource = audioContext.createMediaElementSource(
// 		audioRef.current
// 	);
// 	let source = resonanceAudio.createSource();
// 	audioElementSource.connect(source.input);

// 	source.setPosition(-3, -5, 0);

// 	return <View></View>;
// }
