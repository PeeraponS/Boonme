import React from "react";
import { View, TouchableWithoutFeedback, Image } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { Ionicons } from "@expo/vector-icons";
import TX_R from "../Components/TX_R";

const Share = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          height: 0,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          zIndex: 3000,
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          //   elevation: 1,
        }}
      ></View>
      <View
        style={{
          flex: 8,
          backgroundColor: "#fff",
          borderRadius: 12,
          elevation: 4,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <View style={{ marginTop: 20 }}>
          <Image
            source={require("../assets/Logo.png")}
            style={{
              width: 90,
              height: 90,
              // backgroundColor: "#1b262c",
              borderRadius: 30,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <TX_R>แอพบุญมี ขอขอบพระคุณ คุณ... ที่ได้บริจาคให้โครงการ...</TX_R>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
      ></View>
    </View>
  );
};

export default Share;
