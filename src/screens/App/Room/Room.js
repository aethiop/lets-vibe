import { VStack, Text, Center, HStack } from "native-base";
import React, { useState, useRef, useEffect } from "react";
import { ColoredIcon } from "../../../components/atoms/Icon";
import { IconButton, PrimaryButton } from "../../../components/atoms/Button";
import { Modal } from "../../../components/atoms/Modal";
import { TextInput } from "../../../components/atoms/Input";
import { useAuth, useGunSetState } from "../../../hooks/useGun";
import ShowRooms from "./ShowRooms";

export default function Room({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const { user, keys } = useAuth();
  const { list: rooms, addToSet } = useGunSetState(user.get("rooms"), {});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const roomKeys = Array.from(rooms.keys());
  const roomValues = roomKeys.map((k) => rooms.get(k));
  const createRoom = () => {
    addToSet({ roomName: name, roomDescription: description });
    setShowModal(false);
  };

  return (
    <>
      <VStack
        space={4}
        flex={1}
        _dark={{ bg: "#121212" }}
        _light={{ bg: "light.100" }}
      >
        {/* <Center flex={1}> */}
        {/* <Text fontWeight={"bold"}>Room Screen</Text> */}
        <ShowRooms roomValues={roomValues} navigation={navigation} />
        {/* </Center> */}
        <HStack justifyContent="flex-end" p={3}>
          <IconButton
            onPress={() => {
              setShowModal(true);
            }}
            variant="outline"
            icon="add-circle"
            size={"md"}
          />
          <Modal
            isOpen={showModal}
            hideModal={() => {
              setShowModal(false);
            }}
          >
            <Text px={4} py={3} fontSize="md" fontWeight="bold">
              Create Room
            </Text>
            <VStack space={2} justifyContent="center">
              <TextInput
                value={name}
                onChangeText={setName}
                autofocus
                size={4}
                placeholder="Room Name"
                icon="cube-outline"
              />
              <TextInput
                size={4}
                value={description}
                onChangeText={setDescription}
                autofocus
                placeholder="Description"
                icon="text-outline"
              />
            </VStack>
            <HStack alignItems="center" justifyContent="center">
              <PrimaryButton
                icon="create-outline"
                colorScheme="primary"
                onPress={createRoom}
              >
                Create
              </PrimaryButton>
            </HStack>
          </Modal>
        </HStack>
      </VStack>
    </>
  );
}
