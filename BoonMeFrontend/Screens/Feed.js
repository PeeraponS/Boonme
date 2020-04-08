import React from "react";
import { View, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { Ionicons } from "@expo/vector-icons";

const Feed = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          height: 70 + getStatusBarHeight(),
          width: "100%",
          backgroundColor: "",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ width: 50, height: "100%" }}></View>
        {/* <TX_R style={{ fontSize: 18 }}>ฟีด</TX_R> */}
        <Ionicons
          name="md-settings"
          size={24}
          // color="white"
          style={{
            margin: 14,
            marginTop: 14,
          }}
        />
      </View>
    </View>
  );
};

export default Feed;
