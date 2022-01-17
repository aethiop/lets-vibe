import React, { useState } from "react";
import { Modal as Md, VStack, Text } from "native-base";
import { PrimaryButton } from "./Button";
import { TextInput } from "./Input";

export const Modal = ({ isOpen, hideModal, children }) => {
  return (
    <Md
      overflow={"hidden"}
      width={{ base: "90%", lg: "50%" }}
      alignSelf="center"
      size={{ base: "md", lg: "lg" }}
      isOpen={isOpen}
      avoidKeyboard={true}
      motionPreset="none"
      overlayVisible={true}
      backdropOpacity={0.5}
      onClose={hideModal}
    >
      <Md.Content
        maxWidth={"90%"}
        borderRadius={28}
        _light={{ bg: "light.50" }}
        _dark={{ bg: "dark.50" }}
      >
        <Md.Body>
          <VStack space={4}>{children}</VStack>
        </Md.Body>
      </Md.Content>
    </Md>
  );

};
