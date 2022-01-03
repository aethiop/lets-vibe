import React, { useState, useEffect, useRef } from "react";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { Pressable, Text, Input, Slider } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const AudioPlayer = ({
	audioFile,
	roomMaterials = {
		left: "brick-bare",
		right: "curtain-heavy",
		front: "marble",
		back: "glass-thin",
		down: "grass",
		up: "transparent",
	},
	roomDimensions = {
		width: 10,
		height: 10,
		depth: 10,
	},
	initialPosition = { x: 0, y: 0, z: 0 },
	...props
}) => {
	const playerRef = useRef();
	const [position_x, setPosition_x] = useState(initialPosition.x);
	const [position_y, setPosition_y] = useState(initialPosition.y);
	const [position_z, setPosition_z] = useState(initialPosition.z);

	const config = {
		audioFile,
		roomMaterials,
		roomDimensions,
		initialPosition,
	};
	const { curTime, duration, isPlaying, togglePlay, updateSrc } =
		useAudioPlayer(config);

	useEffect(() => {
		updateSrc(position_x, position_y, position_z);
	}, [position_x, position_y, position_z]);

	return (
		<>
			<Text>{curTime / 1000 / (duration / 1000)}</Text>
			{!isPlaying ? (
				<Pressable onPress={() => togglePlay()}>
					<Ionicons name="ios-play" size={50} color="white" />
				</Pressable>
			) : (
				<Pressable onPress={() => togglePlay()}>
					<Ionicons name="ios-pause" size={50} color="white" />
				</Pressable>
			)}
			<Slider
				width="1/2"
				defaultValue={position_x}
				minValue={-roomDimensions.width / 2}
				maxValue={roomDimensions.width / 2}
				step={0.1}
				value={position_x}
				onChange={(v) => setPosition_x(v)}
			>
				<Slider.Track>
					<Slider.FilledTrack />
				</Slider.Track>
				<Slider.Thumb />
			</Slider>
			<Slider
				width="1/2"
				defaultValue={position_y}
				minValue={-roomDimensions.height / 2}
				maxValue={roomDimensions.height / 2}
				step={0.1}
				value={position_y}
				onChange={(v) => setPosition_y(v)}
			>
				<Slider.Track>
					<Slider.FilledTrack />
				</Slider.Track>
				<Slider.Thumb />
			</Slider>
			<Slider
				width="1/2"
				defaultValue={position_z}
				minValue={-roomDimensions.depth / 2}
				maxValue={roomDimensions.depth / 2}
				step={0.1}
				value={position_z}
				onChange={(v) => setPosition_z(v)}
			>
				<Slider.Track>
					<Slider.FilledTrack />
				</Slider.Track>
				<Slider.Thumb />
			</Slider>
		</>
	);
};
