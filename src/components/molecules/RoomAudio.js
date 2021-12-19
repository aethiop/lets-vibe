// import { Pressable, View } from "native-base";
// import React, { useState, useRef, useEffect } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { ResonanceAudio } from "resonance-audio";
// const RoomAudio = ({ audioSrc, sourcePosition }) => {
// 	const [isPlaying, setIsPlaying] = useState(false);
// 	const [trackProgress, setTrackProgress] = useState(0);
// 	const audioRef = useRef(new Audio(audioSrc));
// 	const intervalRef = useRef();
// 	const isReady = useRef(false);

// 	let audioContext = new (window.AudioContext || window.webkitAudioContext)(
// 		audioRef.current
// 	);
// 	let resonanceAudio = new ResonanceAudio(audioContext);

// 	let roomDimensions = {
// 		width: 10,
// 		height: 10,
// 		depth: 10,
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
// 	resonanceAudio.output.connect(audioContext.destination);
// 	console.log(audioContext);
// 	// audioElementSource.connect(source.input);

// 	// source.setPosition(11, 1, 0);
// 	console.log(audioContext);
// 	let source;
// 	useEffect(() => {
// 		if (isPlaying) {
// 			let audioElement = audioContext.createMediaElementSource(
// 				audioRef.current
// 			);
// 			source = resonanceAudio.createSource();

// 			audioElement.connect(source.input);
// 			source.setPosition(
// 				sourcePosition.x,
// 				sourcePosition.y,
// 				sourcePosition.z
// 			);
// 			audioRef.current.play();
// 		} else {
// 			audioRef.current.pause();
// 		}
// 	}, [isPlaying]);

// 	useEffect(() => {
// 		if (isPlaying) {
// 			source.setPosition(sourcePosition);
// 		}
// 	}, [sourcePosition]);
// 	useEffect(() => {
// 		return () => {
// 			audioRef.current.pause();
// 			clearInterval(intervalRef.current);
// 		};
// 	}, []);

// 	useEffect(() => {
// 		audioRef.current.pause();
// 		audioRef.current = new Audio(audioSrc);

// 		if (isReady.current) {
// 			audioRef.current.play();
// 			setIsPlaying(true);
// 			startTimer();
// 		} else {
// 			// Set the isReady ref as true for the next pass
// 			isReady.current = true;
// 		}
// 	}, [audioSrc]);
// 	return (
// 		<View>
// 			<AudioControl isPlaying={isPlaying} onPlayToggle={setIsPlaying} />
// 		</View>
// 	);
// };
// const AudioControl = ({ isPlaying, onPlayToggle }) => {
// 	return (
// 		<Pressable onPress={() => onPlayToggle(!isPlaying)}>
// 			{isPlaying ? (
// 				<Ionicons name="md-pause" size={32} color="white" />
// 			) : (
// 				<Ionicons name="md-play" size={32} color="white" />
// 			)}
// 		</Pressable>
// 	);
// };

// export { RoomAudio };
import { useState, useEffect } from "react";

export const useAudioPlayer = ({
	audioFile,
	handleStartPlaying,
	handlePlaying,
	handleFinishPlaying,
}) => {
	const [audio, setAudio] = useState(null);
	const [audioCtx, setAudioCtx] = useState(null);
	const [audioSrcNode, setAudioSrcNode] = useState(null);
	const [duration, setDuration] = useState();
	const [current, setCurrent] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [src, setSrc] = useState("");
	const [clickedTime, setClickedTime] = useState();

	const play = () => {
		if (!audio) return;
		setIsPlaying(true);
		audio.play();
		handleStartPlaying && handleStartPlaying();
	};

	const pause = () => {
		if (!audio) return;
		setIsPlaying(false);
		audio.pause();
	};

	const toggle = () => {
		if (!audio) return;
		if (!audio.ended && audio.readyState > 2) {
			pause();
		} else if (audio.paused) {
			play();
		}
	};

	useEffect(() => {
		if (!audio) return;
		console.log(audio.current);
		const setAudioData = () => {
			console.log(audio.duration);
			console.log(audio.currentTime);
			setDuration(audio.duration);
			setCurrent(audio.currentTime);
		};
		const setAudioTime = () => {
			setCurrent(audio.currentTime);
			handlePlaying && handlePlaying();
		};

		audio.addEventListner("loadeddata", setAudioData);
		// audio.addEventListner("ended", () => {
		// 	setIsPlaying(false);
		// 	handleFinishPlaying && handleFinishPlaying();
		// });
		// audio.addEventListner("timeupdate", setAudioTime);

		if (clickedTime && clickedTime !== current) {
			audio.currentTime = clickedTime;
			setClickedTime(null);
		}

		return () => {
			// audio.removeEventListner("loadeddata", setAudioData);
			// audio.removeEventListner("ended", () => {
			// 	setIsPlaying(false);
			// 	handleFinishPlaying && handleFinishPlaying();
			// });
			// audio.removeEventListner("timeupdate", setAudioTime);
		};
	});

	useEffect(() => {
		console.log(audioFile);
		// const newSrc = URL.createObjectURL(audio);
		setSrc(audioFile);
		setIsPlaying(false);
		return () => {
			URL.revokeObjectURL(audioFile);
			if (audioSrcNode && audioCtx && audioCtx.state !== "closed") {
				try {
					console.log("Trying to close audio context");
					audioSrcNode.disconnect();
					setAudioSrcNode(null);
					audioCtx.close();
					setAudioCtx(null);
				} catch (error) {
					console.log("Error closing audio context ", error);
				}
			}
		};
	}, [audioFile]);

	useEffect(() => {
		if (!src) return;
		const newAudio = new Audio(src);
		console.log(newAudio);
		setAudio(newAudio);
	}, [src]);

	useEffect(() => {
		if (!audio) return;
		const newContext = new (window.AudioContext ||
			window.webkitAudioContext)();
		setAudioCtx(newContext);
		return () => {
			if (audioCtx && audioCtx.state !== "closed") {
				try {
					audioCtx.close();
					setAudioCtx(null);
				} catch (error) {
					console.log("Error closing audio context", error);
				}
			}
		};
	}, [audio]);

	useEffect(() => {
		if (!audio || !audioCtx) return;
		const newSrcNode = audioCtx.createMediaElementSource(audio);
		setAudioSrcNode(newSrcNode);
		return () => {
			if (
				audioSrcNode &&
				audioSrcNode.context &&
				audioSrcNode.context.state === "closed"
			) {
				try {
					audioSrcNode.disconnect();
					setAudioSrcNode(null);
				} catch (error) {
					console.log("Error closing audio context", error);
				}
			}
		};
	}, [audioCtx]);

	return {
		current,
		duration,
		isPlaying,
		toggle,
		setClickedTime,
	};
};
