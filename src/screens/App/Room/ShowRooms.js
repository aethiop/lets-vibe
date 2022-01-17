import React, { useState } from "react";
import { VStack, Box, Text, Center, ScrollView, HStack } from "native-base";
import { Identity } from "../../../components/atoms/Identity";
import { useAuth } from "../../../hooks/useGun";
import { Pressable } from "react-native";
import EditRoom from "./EditRoom";
import { useGunSetState } from "../../../hooks/useGun";
const ShowRooms = ({ roomValues, navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  const { user, keys } = useAuth();
  // const { fields: room, put } = useGunState(user.get("rooms").get(soul), {});
  // const { roomName, roomDe } = room;
  const selectedRoom = () => {
    updateRoom({ roomName: name, roomDescription: description });
    return <></>;
  };

  return (
    <ScrollView>
      <VStack p={10} flex={1} space={5} justifyContent={"flex-start"}>
        {roomValues.map(({ soul, roomName, roomDescription }) => (
          <Box key={soul}>
            <Pressable
              onPress={() => {
                navigation.navigate("Room", {
                  name: roomName,
                  description: roomDescription,
                });
              }}
              onLongPress={() => {
                setCurrentValue(soul);
                setShowModal(true);
              }}
            >
              <Box
                borderRadius={"2xl"}
                borderWidth={1}
                p={4}
                borderColor={"dark.200"}
              >
                <HStack
                  flex={1}
                  space={3}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <VStack space={2}>
                    <Text fontWeight="bold">{roomName}</Text>
                    <Text fontWeight="hairline">{roomDescription}</Text>
                  </VStack>
                  <Identity publicKey={keys.pub} size={5} />
                </HStack>
              </Box>
            </Pressable>
            <EditRoom
              showModal={showModal}
              hideModal={() => {
                setShowModal(false);
              }}
              value={currentValue}
            />
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default ShowRooms;
