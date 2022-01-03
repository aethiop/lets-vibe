import { VStack, Text, Center } from "native-base";
import React, { useState, useRef } from "react";

export default function Room({ navigation }) {
	return (
		<VStack space={4} flex={1}>
			<Center flex={1}>
				<Text fontWeight={"bold"}>Room Screen</Text>
			</Center>
		</VStack>
	);
}
