import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

export const RightWall = () => {
  const group = useRef();
  const { nodes, materials } = useGLTF(require("./Vibe2.glb"));
  const [active, setActive] = useState(0);
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: { mass: 4, tension: 400, friction: 50, precision: 0.0001 },
  });

  return (
    <a.group
      ref={group}
      onClick={() => {
        setActive(Number(!active));
        console.log("right wall");
      }}
      scale={scale}
      position={[0.33, 0.01, 0.02]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_1.geometry}
        material={materials.Black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_2.geometry}
        material={materials.Tv}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_3.geometry}
        material={materials.Backlight}
      />
    </a.group>
  );
};
