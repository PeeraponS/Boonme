import React from "react";
import { View, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { Ionicons } from "@expo/vector-icons";
import TX_R from "../Components/TX_R";

const Profile = () => {
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
        {/* <TX_R style={{ fontSize: 18 }}>โปรไฟล์</TX_R> */}
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
      <View
        style={{
          height: 180,
          backgroundColor: "salmon",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
            backgroundColor: "green",
          }}
        >
          <View
            style={{
              height: 70,
              width: 70,
              // backgroundColor: "white",
              marginLeft: 0,
              borderRadius: 35,
              borderWidth: 0.5,
            }}
          ></View>
          <View
            style={{
              width: 240,
              height: 70,
              // backgroundColor: "white",
              marginLeft: 20,
              padding: 10,
              justifyContent: "center",
            }}
          >
            <TX_R style={{ fontSize: 20 }}>ชวิศ ฤทธิยา</TX_R>
            <TX_R style={{ fontSize: 16 }}>ชวิศ ฤทธิยา</TX_R>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
