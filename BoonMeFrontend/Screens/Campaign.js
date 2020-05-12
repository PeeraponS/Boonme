import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import TX_R from "../Components/TX_R";
import TopTabNav from "../Navigation/TopTabNav";

const Campaign = (props) => {
  if (props.route.params == undefined) {
    console.log("detect!");
  } else {
    useEffect(() => {
      const timer = setTimeout(() => {
        props.navigation.navigate(props.route.params.title);
      }, 550);
      return () => clearTimeout(timer);
    }, []);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="#ffffff00"
      />
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          height: 92,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          zIndex: 3000,
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          // elevation: 1,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.openDrawer();
          }}
        >
          <Ionicons name="ios-menu" size={30} />
        </TouchableWithoutFeedback>
        <View>
          <TX_R style={{ fontSize: 18, top: 2 }}>โครงการ</TX_R>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate(props.route.params.title);
          }}
        >
          <Ionicons name="md-settings" size={24} />
        </TouchableWithoutFeedback>
      </View>
      <TopTabNav />
    </View>
  );
};

export default Campaign;
