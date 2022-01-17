import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

export const Floor = () => {
  const group = useRef();
  const { nodes, materials } = useGLTF(require("./Vibe2.glb"));
  const [active, setActive] = useState(0);
  const { scale, spring } = useSpring({
    spring: active,
    scale: active ? 1.5 : 1,
    config: { mass: 4, tension: 400, friction: 50, precision: 0.0001 },
  });
  const rotation = spring.to([0, 1], [0, Math.PI]);
  return (
    <a.group
      ref={group}
      rotation-y={rotation}
      onClick={() => {
        setActive(Number(!active));
      }}
      scale={scale}
      position={[0.87, 0.46, 0.32]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_1.geometry}
        material={materials.Sofa}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_2.geometry}
        material={materials.Metal}
      />
    </a.group>
  );
};
