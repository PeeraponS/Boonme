import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Explore from "../Screens/Explore";
import CampaignDetails from "../Screens/CampaignDetails";
import Search from "../Screens/Search";
import Donate from "../Screens/Donate";
import Comment from "../Screens/Comment";
import Requirement from "../Screens/Requirement";
import Update from "../Screens/Update";
import Share from "../Screens/Share";

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
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="CampaignDetails" component={CampaignDetails} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Donate" component={Donate} />
      <Stack.Screen name="Comment" component={Comment} />
      <Stack.Screen name="Requirement" component={Requirement} />
      <Stack.Screen name="Update" component={Update} />
      <Stack.Screen name="Share" component={Share} />
    </Stack.Navigator>
  );
};

export default () => {
  return <Main />;
};
