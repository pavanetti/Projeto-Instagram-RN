import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import FeedScreen from "./screens/FeedScreen";
import TakePhotoScreen from "./screens/TakePhotoScreen";
import NewPostScreen from "./screens/NewPostScreen";

const Tabs = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          showLabel: false,
          activeTintColor: "black",
          inactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="Feed"
          component={FeedScreen}
          options={{ tabBarIcon: TabIcon("home") }}
        />
        <Tabs.Screen
          name="Feed1"
          component={FeedScreen}
          options={{ tabBarIcon: TabIcon("search") }}
        />
        <Tabs.Screen
          name="TakePhoto"
          component={TakePhotoScreen}
          options={{ tabBarIcon: TabIcon("plus-square") }}
        />
        <Tabs.Screen
          name="NewPost"
          component={NewPostScreen}
          options={{ tabBarIcon: TabIcon("heart") }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

function TabIcon(name) {
  return ({ color }) => <Feather name={name} size={26} color={color} />;
}
