import React, { useEffect, useRef } from "react";
import { Center, Box, VStack, HStack, Icon } from "native-base";
import { TextInput } from "../../components/atoms/Input";
import { IconButton } from "../../components/atoms/Button";

export default function SeachScreen({ navigation }) {
	return (
		<VStack space={4} _dark={{ bg: "#121212" }} flex={1}>
			<HStack
				w="full"
				px={4}
				py={4}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Center w={["85%", "90%"]}>
					<TextInput
						w="full"
						autoFocus
						placeholder="Search"
						autoFocus
						icon="search"
					/>
				</Center>
				<IconButton
					icon="arrow-back"
					onPress={() => {
						navigation.goBack();
					}}
				/>
			</HStack>
		</VStack>
	);
}
