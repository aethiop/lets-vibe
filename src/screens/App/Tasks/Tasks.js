import { VStack, Text, Center } from "native-base";
import React, { useState, useRef } from "react";

export default function Tasks({ navigation }) {
	return (
		<VStack space={4} flex={1}>
			<Center flex={1}>
				<Text fontWeight={"bold"}>Tasks Screen</Text>
			</Center>
		</VStack>
	);
}
