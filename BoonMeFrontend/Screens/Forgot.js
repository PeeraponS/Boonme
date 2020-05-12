import React from "react";
import { View, KeyboardAvoidingView, TextInput } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import TX_R from "../Components/TX_R";
import TX_L from "../Components/TX_L";

import { Ionicons } from "@expo/vector-icons";

export default function Forgot(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <View
        style={{
          paddingTop: getStatusBarHeight() + 40,
          flex: 1,
          justifyContent: "space-between",
          alignItems: "flex-start",
          //   backgroundColor: "salmon",
          paddingHorizontal: "10%",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("FirstPage");
          }}
        >
          <Ionicons name="ios-arrow-round-back" size={40} />
        </TouchableWithoutFeedback>
        <TX_L style={{ fontSize: 34 }}>ลืมรหัสผ่าน</TX_L>
      </View>
      <KeyboardAvoidingView
        // behavior="padding"
        style={{
          flex: 8,
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          backgroundColor: "white",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          // elevation: 20
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "80%",
              marginTop: 100,
              alignItems: "center",
            }}
          >
            <View style={{ width: "100%", marginTop: 10 }}>
              <TX_R style={{ color: "#555555", top: 10, fontSize: 14 }}>
                Email
              </TX_R>
              <TextInput
                style={{
                  width: "100%",
                  height: 60,
                  borderBottomWidth: 0.5,
                  fontSize: 20,
                  borderColor: "black",
                  paddingTop: 20,
                }}
              />
            </View>
          </View>

          <LinearGradient
            colors={["#40c9ff", "#4a40ff"]}
            start={[1, -1.2]}
            style={{
              width: "80%",
              height: 56,
              backgroundColor: "salmon",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              borderRadius: 28,
              elevation: 1,
              marginTop: 40,
            }}
          >
            <TX_R style={{ fontSize: 18, color: "white" }}>รีเซ็ตรหัสผ่าน</TX_R>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
