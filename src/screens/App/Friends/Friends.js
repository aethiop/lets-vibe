import { VStack, Text, Center } from "native-base";
import React, { useState, useRef } from "react";

import { Heading } from "../../../components/molecules/Heading";
import { useAuth } from "../../../contexts/auth";

export default function Games({ navigation }) {
	const user = useAuth();
	return (
		<VStack space={4} flex={1}>
			<Center flex={1}>
				<Text fontWeight={"bold"}>Friends Screen</Text>
			</Center>
		</VStack>
	);
}
