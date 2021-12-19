import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, StatusBar } from "native-base";
import theme from "./theme";
import { AuthProvider } from "../contexts/auth";

export default function AppContainer({ children }) {
	return (
		<NavigationContainer>
			<AuthProvider>
				<NativeBaseProvider theme={theme}>
					{children}
				</NativeBaseProvider>
			</AuthProvider>
		</NavigationContainer>
	);
}
