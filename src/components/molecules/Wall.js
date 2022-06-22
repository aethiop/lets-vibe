import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

export const Wall = ({ properties, position, rotation, scale, onClick }) => {
	const group = useRef();

	return (
		<a.group
			ref={group}
			onClick={onClick}
			scale={scale}
			position={position}
			rotation={rotation}
		>
			{properties.map((property, index) => {
				return (
					<mesh
						key={index}
						castShadow
						receiveShadow
						geometry={property.geometry}
						material={property.material}
						material-color={property.materialColor}
					/>
				);
			})}
		</a.group>
	);
};
