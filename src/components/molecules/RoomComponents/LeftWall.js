import React, { Suspense, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

export const LeftWall = () => {
  const group = useRef();
  const { nodes, materials } = useGLTF(require("./Vibe2.glb"));
  const [active, setActive] = useState(0);
  const { spring } = useSpring({
    spring: active,
    config: { mass: 4, tension: 400, friction: 50, precision: 0.0001 },
  });
  const scale = spring.to([0, 1], [1, 1.5]);

  const showRoomSetting = () => {
    setActive(Number(!active));
    // return <RoomSetting />;
  };

  return (
    <a.group ref={group} onClick={showRoomSetting} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.VIBE.geometry}
        material={materials["Material.003"]}
        position={[-1.6, 2.07, 1.03]}
        rotation={[1.57, 0, -1.56]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LeftWall.geometry}
        material={nodes.LeftWall.material}
        position={[0.04, 0.02, -0.02]}
      />
    </a.group>
  );
};
