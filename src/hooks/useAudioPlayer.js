import React, { useState, useEffect } from "react";
import { ResonanceAudio } from "resonance-audio";
export const useAudioPlayer = ({
	audioFile,
	roomDimensions,
	roomMaterials,
	initialPosition,
}) => {
	const [audio, setAudio] = useState(null);
	const [position, setPosition] = useState({
		x: initialPosition.x,
		y: initialPosition.y,
		z: initialPosition.z,
	});
	const [curTime, setCurTime] = useState();
	const [duration, setDuration] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [audioCtx, setAudioCtx] = useState(null);
	const [audioSrcNode, setAudioSrcNode] = useState(null);
	const [resonanceScene, setResonanceScene] = useState(null);
	const [resonanceSource, setResonanceSource] = useState(null);

	useEffect(() => {
		setAudio(new Audio(audioFile));
	}, [audioFile]);

	const togglePlay = () => {
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}

		setIsPlaying(!isPlaying);
	};

	useEffect(() => {
		if (!audio) return;

		const setAudioData = () => {
			setDuration(audio.duration);
			setCurTime(audio.currentTime);
		};

		const setAudioTime = () => {
			setCurTime(audio.currentTime);
		};
		audio.addEventListener("loadeddata", setAudioData);
		audio.addEventListener("ended", () => {
			setIsPlaying(false);
		});
		audio.addEventListener("timeupdate", setAudioTime);
		return () => {
			audio.removeEventListener("loadeddata", setAudioData);
			audio.removeEventListener("ended", () => {
				setIsPlaying(false);
			});
			audio.removeEventListener("timeupdate", setAudioTime);
		};
	});
	const updateSrc = (x, y, z) => {
		if (!audio && !resonanceSource) return;
		setPosition((prevPositions) => ({
			...prevPositions,
			x: x,
			y: y,
			z: z,
		}));
	};

	useEffect(() => {
		if (!audio && !audioCtx && !resonanceSource) return;
		resonanceSource.setPosition(position.x, position.y, position.z);
	}, [position]);

	useEffect(() => {
		if (!audio) return;
		const newContext = new AudioContext();
		setAudioCtx(newContext);
		return () => {
			if (audioCtx && audioCtx.state != "closed") {
				try {
					audioCtx.close();
					setAudioCtx(null);
				} catch (e) {
					console.log(e);
				}
			}
		};
	}, [audio]);

	useEffect(() => {
		if (!audio && !audioCtx) return;
		const source = audioCtx.createMediaElementSource(audio);
		setAudioSrcNode(source);
		return () => {
			if (audioSrcNode) {
				audioSrcNode.disconnect();
				setAudioSrcNode(null);
			}
		};
	}, [audioCtx]);

	useEffect(() => {
		if (!audio && !audioCtx) return;
		const newResonanceScene = new ResonanceAudio(audioCtx);
		setResonanceScene(newResonanceScene);
	}, [audioCtx]);

	useEffect(() => {
		if (!audio && !audioCtx && !resonanceScene) return;
		resonanceScene.output.connect(audioCtx.destination);
		const newResonanceSource = resonanceScene.createSource();
		setResonanceSource(newResonanceSource);
	}, [resonanceScene]);

	useEffect(() => {
		if (!audio && !audioCtx && !resonanceScene && !audioSrcNode) return;
		resonanceScene.output.connect(audioCtx.destination);
		resonanceScene.setRoomProperties(roomDimensions, roomMaterials);
		const newResonanceSource = resonanceScene.createSource();
		audioSrcNode.connect(newResonanceSource.input);
		setResonanceSource(newResonanceSource);
	}, [audioSrcNode]);

	useEffect(() => {
		if (!audio && !audioCtx && !resonanceScene && !audioSrcNode) return;
		console.log("audio", audio);
		console.log("resonanceSource", resonanceSource);
		console.log("position", position);
		resonanceSource.setPosition(position.x, position.y, position.z);
	}, [position]);

	return {
		curTime,
		duration,
		isPlaying,
		togglePlay,
		updateSrc,
	};
};
