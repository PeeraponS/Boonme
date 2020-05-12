import React from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import PinCreate from "../Screens/PinCreate";
import NameCreate from "../Screens/NameCreate";

const Stack = createStackNavigator();

function GetInfo() {
  return (
    <Stack.Navigator
      initialRouteName="FirstPage"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, //Transition Animation <3
        headerTransparent: true,
        headerTitle: null,
        headerShown: false,
      }}
    >
      <Stack.Screen name="NameCreate" component={NameCreate} />
      <Stack.Screen name="PinCreate" component={PinCreate} />
    </Stack.Navigator>
  );
}

export default () => {
  return <GetInfo />;
};
