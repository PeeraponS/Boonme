import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { Ionicons } from "@expo/vector-icons";
import TX_R from "../Components/TX_R";

const Feed = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          elevation: 1,
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
          <TX_R style={{ fontSize: 18, top: 2 }}>อัปเดต</TX_R>
        </View>
        <TouchableWithoutFeedback>
          <Ionicons name="md-settings" size={24} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Feed;
