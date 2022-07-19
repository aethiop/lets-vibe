import React from "react";
import AppContainer from "./src/components/AppContainer";
import Main from "./src/screens/Main";
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
// import Storybook from "./storybook";

export default function App() {
	return (
		<AppContainer>
			<Main />
		</AppContainer>
	);
}
// // serviceWorkerRegistration.register();
// export { default } from "./storybook";
