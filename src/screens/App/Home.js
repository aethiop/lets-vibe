import { Center, Heading, Input, Text } from "native-base";
import React, { useState, useRef } from "react";
import { useAudioPlayer } from "../../components/molecules/RoomAudio";
import { Room } from "../../components/molecules/Room";

export default function Home() {
	const audioSrc = require("../../../assets/LOFI.mp3");
	console.log(audioSrc);
	// const { current, duration, isPlaying, toggle } = useAudioPlayer({
	// 	audioFile: audioSrc,
	// 	handleStartPlaying: () => {
	// 		console.log("starting");
	// 	},
	// 	handlePlaying: () => {
	// 		console.log("playing");
	// 	},
	// 	handleFinishPlaying: () => {
	// 		console.log("finished");
	// 	},
	// });
	const sourcePos = { x: 0, y: 0, z: 0 };
	const roomDimensions = {
		width: 10,
		height: 10,
		depth: 10,
	};
	const roomMaterials = {
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
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [z, setZ] = useState(0);
	const [trackProgress, setTrackProgress] = useState(0);

	const camPosition = [10, 10, 10];
	const lightPosition = [10, 10, 10];
	const objects = [
		{
			name: "listner",
			position: [-10, 0, 0],
			args: [2, 15, 15],
			selected: "blue",
		},
		{
			name: "source",
			position: [sourcePos.x, sourcePos.y, sourcePos.z],
			args: [1, 15, 15],
			selected: "red",
		},
		{
			name: "otherSource",
			position: [10, 0, 0],
			args: [1, 15, 15],
			selected: "yellow",
		},
		{
			name: "otherSource1",
			position: [10, 5, 0],
			args: [1, 15, 15],
			selected: "green",
		},
	];
	return (
		<Center flex={1} _dark={{ bg: "#121212" }}>
			<Heading>Home</Heading>
			{/* <RoomAudio
				audioSrc={audioSrc}
				sourcePosition={{ x: x, y: y, z: z }}
				roomDimensions={roomDimensions}
				roomMaterials={roomMaterials}
			/> */}
			{/* <Input
				type="number"
				placeholder="x"
				onChangeText={(x) => {
					setX(x);
				}}
			/>
			<Input
				type="number"
				placeholder="y"
				onChangeText={(y) => {
					setY(y);
				}}
			/>
			<Input
				type="number"
				placeholder="z"
				onChangeText={(z) => {
					setZ(z);
				}}
			/> */}

			<Center flex={1} w={"full"}>
				<Room
					camPosition={camPosition}
					lightPosition={lightPosition}
					objects={objects}
				/>
			</Center>
		</Center>
	);
}
