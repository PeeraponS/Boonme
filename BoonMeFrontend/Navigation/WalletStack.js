import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Wallet from "../Screens/Wallet";
import Card from "../Screens/Card";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Card" component={Card} />
    </Stack.Navigator>
  );
};

export default () => {
  return <Main />;
};
