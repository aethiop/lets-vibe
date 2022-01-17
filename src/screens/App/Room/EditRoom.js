import React, { useState } from "react";
import { Modal } from "../../../components/atoms/Modal";
import { PrimaryButton } from "../../../components/atoms/Button";
import { Text, VStack, HStack } from "native-base";
import { TextInput } from "../../../components/atoms/Input";

import { useGunSetState, useAuth } from "../../../hooks/useGun";
const EditRoom = ({ showModal, hideModal, value }) => {
  const { gun, user, keys } = useAuth();
  const { list: rooms, updateInSet } = useGunSetState(user.get("rooms"), {});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const updateRooms = () => {
    if (name && description) {
      const { roomName, roomDescription } = rooms.get(value);
      console.log(roomName, roomDescription);
      updateInSet(value, { roomName: name, roomDescription: description });
    }
    hideModal();
  };

  return (
    <>
      <Modal isOpen={showModal} hideModal={hideModal}>
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
          <HStack alignItems="center" justifyContent="center">
            <PrimaryButton
              icon="create-outline"
              colorScheme="primary"
              onPress={updateRooms}
            >
              Update
            </PrimaryButton>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
};

export default EditRoom;
