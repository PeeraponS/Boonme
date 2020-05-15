import React from "react";
import { View, TouchableWithoutFeedback, TextInput } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import TX_R from "../Components/TX_R";
import { Ionicons } from "@expo/vector-icons";

const Requirement = (props) => {
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
            props.navigation.goBack();
          }}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={34}
            style={{ width: 30 }}
          />
        </TouchableWithoutFeedback>
        <View>
          <TX_R style={{ fontSize: 18, top: 2 }}>ความต้องการของโครงการ</TX_R>
        </View>
        <View style={{ width: 20, height: 20 }}></View>
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}></View>
    </View>
  );
};

export default Requirement;
