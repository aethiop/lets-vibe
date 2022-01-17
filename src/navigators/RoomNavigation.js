import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/App/Chat/Chat";
import Room from "../screens/App/Chat/Room/Room";
const Stack = createStackNavigator();

export default function RoomNavigation(props) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animationEnabled: false,
			}}
			initialRouteName="Chats"
		>
			<Stack.Screen
				name="Chats"
				component={Chat}
				options={{ headeerShown: false }}
			/>
			<Stack.Screen
				name="Room"
				component={Room}
				initialParams={{ pub: "" }}
			/>
		</Stack.Navigator>
	);
}
