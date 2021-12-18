import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ResonanceAudio } from "resonance-audio";

export default function App() {
	let audioSource = require("./assets/Nothing Without You.mp3");
	const audioRef = useRef(new Audio(audioSource));

	let audioContext = new AudioContext();
	let resonanceAudio = new ResonanceAudio(audioContext);

	resonanceAudio.output.connect(audioContext.destination);
	let roomDimensions = {
		width: 3.1,
		height: 2.5,
		depth: 3.4,
	};
	let roomMaterials = {
		// Room wall materials
		left: "brick-bare",
		right: "curtain-heavy",
		front: "marble",
		back: "glass-thin",
		// Room floor
		down: "grass",
		// Room ceiling
		up: "brick-bare",
	};
	resonanceAudio.setRoomProperties(roomDimensions, roomMaterials);
	let audioElementSource = audioContext.createMediaElementSource(
		audioRef.current
	);
	let source = resonanceAudio.createSource();
	audioElementSource.connect(source.input);

	source.setPosition(0, 0, -2);
	audioRef.current.play();

	return (
		<View style={styles.container}>
			<Text>Open start working on your app!</Text>
			<StatusBar></StatusBar>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
