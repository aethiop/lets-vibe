import React from "react";
import { createMenuNavigator } from "../components/organisms/MenuNavigator";
import RoomScreen from "../screens/App/Room/Room";
import NotesScreen from "../screens/App/Notes/Notes";
import GameScreen from "../screens/App/Games/Games";
import LibraryScreen from "../screens/App/Library/Library";
import TaskScreen from "../screens/App/Tasks/Tasks";
import { useAuth } from "../hooks/useGun";
import { FileSystemProvider } from "../hooks/useFileSystem";
import RoomNavigation from "./RoomNavigation";
import Room from "../screens/App/Room/Room";
const MenuNav = createMenuNavigator();
const LibraryView = (props) => {
  return (
    <FileSystemProvider>
      <LibraryScreen {...props} />
    </FileSystemProvider>
  );
};
export default function AppNavigation() {
  const { keys } = useAuth();
  return (
    <MenuNav.Navigator
      initialRouteName="Room"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MenuNav.Screen
        name="Room"
        component={RoomNavigation}
        options={{
          icon: "cube",
          title: "Room",
          pub: keys.pub,
        }}
      />
      <MenuNav.Screen
        name="Library"
        component={LibraryView}
        options={{
          icon: "folder-open",
          title: "Library",
          pub: keys.pub,
        }}
        initialParams={{
          path: "/",
        }}
      />
      {/* 
			<MenuNav.Screen
				name="Notes"
				component={NotesScreen}
				options={{
					icon: "book",
					title: "Notes",
					pub: keys.pub,
				}}
			/>
			<MenuNav.Screen
				name="Games"
				component={GameScreen}
				options={{
					icon: "game-controller",
					title: "Games",
					pub: keys.pub,
				}}
			/>
			<MenuNav.Screen
				name="Tasks"
				component={TaskScreen}
				options={{
					icon: "checkbox",
					title: "Task",
					pub: keys.pub,
				}}
			/> */}
    </MenuNav.Navigator>
  );
}
