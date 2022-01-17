import React, { Suspense, useRef, useState } from "react";
import { PresentationControls } from "@react-three/drei";
import { Canvas, useFrame } from "react-three-fiber";
import { LeftWall } from "./LeftWall";
import { Box, Center, Text } from "native-base";
import { RightWall } from "./RightWall";
import { Floor } from "./Floor";

const Models = () => {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // group.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8;
    group.current.rotation.y = Math.sin(t / 4) / 8;
    group.current.rotation.z = (1.61 + Math.sin(t / 1.5)) / 20;
    group.current.position.y = (1.61 + Math.sin(t / 1.5)) / 10;
  });
  return (
    <group scale={0.61} ref={group} dispose={null}>
      <LeftWall />
      <RightWall />
      <Floor />
    </group>
  );
};

export default function Model({ navigation, route }) {
  const { name, description } = route.params;
  return (
    <Box _dark={{ bg: "#121212" }} _light={{ bg: "light.100" }} flex={1}>
      <Center borderBottomRadius="xl" p={2}>
        <Text fontSize="xl" fontWeight={"bold"}>
          {name}
        </Text>
        <Text>{description}</Text>
      </Center>
      <Canvas dpr={[1, 2]} camera={{ fov: 75, position: [0, 6, 5] }}>
        <ambientLight intensity={0.5} />
        {/* <spotLight position={[0, 10, 5]} angle={0.45} penumbra={1} /> */}
        {/* <pointLight position={[-8, 10, -8]} /> */}
        <spotLight position={[-10, 10, -10]} angle={0.45} penumbra={1} />
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[0, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Suspense fallback={null}>
            <Models />
          </Suspense>
        </PresentationControls>
      </Canvas>
    </Box>
  );
}
