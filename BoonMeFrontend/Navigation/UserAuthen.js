import React from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FirstPage from "../Screens/FirstPage";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import Forgot from "../Screens/Forgot";
import PinCreate from "../Screens/PinCreate";
import NameCreate from "../Screens/NameCreate";

const Stack = createStackNavigator();

function UserAuthen() {
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
      <Stack.Screen name="FirstPage" component={FirstPage} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
}

export default () => {
  return <UserAuthen />;
};
