import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators
} from "@react-navigation/stack";

import UserAuthen from "./UserAuthen";
import Drawer from "./Drawer";
import StartUp from "../Screens/StartUp";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Stack.Screen name="StartUp" component={StartUp} />
      <Stack.Screen name="UserAuthen" component={UserAuthen} />
      <Stack.Screen name="Drawer" component={Drawer} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
