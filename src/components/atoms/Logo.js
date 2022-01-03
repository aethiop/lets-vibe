import React from "react";
import { Svg, Rect, Circle } from "react-native-svg";

export default function Logo() {
	return (
		<Svg
			width="75"
			height="75"
			viewBox="0 0 75 75"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Rect width="75" height="75" rx="27.1978" fill="white" />
			<Circle cx="48.287" cy="25.9801" r="5.93158" fill="black" />
			<Rect
				x="19"
				y="25.3984"
				width="11.8632"
				height="35.5895"
				rx="5.93158"
				transform="rotate(-30 19 25.3984)"
				fill="black"
			/>
		</Svg>
	);
}
