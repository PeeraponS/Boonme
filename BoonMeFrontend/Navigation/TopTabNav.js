import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Cat1 from "../Screens/Categories/Cat1";
import Cat2 from "../Screens/Categories/Cat2";
import Cat3 from "../Screens/Categories/Cat3";
import Cat4 from "../Screens/Categories/Cat4";
import Cat5 from "../Screens/Categories/Cat5";
import Cat6 from "../Screens/Categories/Cat6";
import Cat7 from "../Screens/Categories/Cat7";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      swipeEnabled
      tabBarOptions={{
        tabStyle: { width: 90 },
        scrollEnabled: true,
        indicatorStyle: { backgroundColor: "#007AFF", height: 4 },
        labelStyle: { fontFamily: "NOTO_R", fontSize: 13 },
      }}
    >
      <Tab.Screen name="การศึกษา" component={Cat1} />
      <Tab.Screen name="โรงพยาบาล" component={Cat2} />
      <Tab.Screen name="ผู้สูงอายุ" component={Cat3} />
      <Tab.Screen name="ผู้พิการ" component={Cat4} />
      <Tab.Screen name="สัตว์โลก" component={Cat5} />
      <Tab.Screen name="สิ่งแวดล้อม" component={Cat6} />
      <Tab.Screen name="สังคม" component={Cat7} />
    </Tab.Navigator>
  );
}
