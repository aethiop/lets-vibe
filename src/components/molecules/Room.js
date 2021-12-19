import React, { useRef, useState } from "react";
import { Canvas, useRender, useFrame, useThree } from "@react-three/fiber";
import {
	OrbitControls,
	TransformControls,
	ContactShadows,
	useGLTF,
	useCursor,
} from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
const modes = ["translate"];
const state = proxy({ current: null, mode: 0 });

function Sphere(props) {
	// This reference will give us direct access to the mesh
	const arg = props.args;
	console.log(arg);
	const snap = useSnapshot(state);
	const mesh = useRef();
	const [hovered, setHovered] = useState(false);
	useCursor(hovered);
	// Rotate mesh every frame, this is outside of React without overhead

	return (
		<mesh
			{...props}
			ref={mesh}
			onClick={(e) => (e.stopPropagation(), (state.current = props.name))}
			onPointerMissed={(e) =>
				e.type === "click" && (state.current = null)
			}
			onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
			onPointerOut={(e) => setHovered(false)}
			name={props.name}
		>
			<sphereGeometry attach="geometry" args={arg} />
			<meshStandardMaterial
				attach="material"
				color={snap.current == props.name ? "red" : props.selected}
			/>
		</mesh>
	);
}
const Controls = () => {
	// Get notified on changes to state
	const snap = useSnapshot(state);
	const scene = useThree((state) => state.scene);
	return (
		<>
			{/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
			{snap.current && (
				<TransformControls
					object={scene.getObjectByName(snap.current)}
					mode={modes[snap.mode]}
				/>
			)}
			{/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
			<OrbitControls
				enablePan
				makeDefault
				minPolarAngle={0}
				maxPolarAngle={Math.PI / 1.75}
			/>
		</>
	);
};
const Room = ({ camPosition, lightPosition, objects }) => {
	return (
		<Canvas flat dpr={[1, 2]} camera={{ fov: 21, position: [20, 20, 20] }}>
			<color attach="background" args={["#121212"]} />
			<ambientLight />
			{/* <pointLight position={lightPosition} /> */}
			{objects.map((obj) => (
				<Sphere
					name={obj.name}
					args={obj.args}
					selected={obj.selected}
					position={obj.position}
				/>
			))}
			<Controls />
		</Canvas>
	);
};
export { Room };
