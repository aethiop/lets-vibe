import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMenuNavigator } from "../components/organisms/MenuNavigator";
import NotesScreen from "../screens/App/Notes/Notes";
import GameScreen from "../screens/App/Games/Games";
import LibraryScreen from "../screens/App/Library/Library";
import TaskScreen from "../screens/App/Tasks/Tasks";
import { useAuth, useGunSetState } from "../hooks/useGun";
import { FileSystemProvider } from "../hooks/useFileSystem";
import RoomNavigation from "./RoomNavigation";
import Chats from "../screens/App/Chat/Chat";
const Stack = createStackNavigator();

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
        name="Rooms"
        component={RoomNavigation}
        options={{
          icon: "cube",
          title: "Rooms",
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
  <MenuNav.Screen
          name="Chats"
          component={Chats}
          options={{
            icon: "chatbubble",
            title: "Chats",
            pub: keys.pub,
          }}
        />
</MenuNav.Navigator>
    
  );
}
