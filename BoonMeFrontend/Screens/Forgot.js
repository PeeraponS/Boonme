import React from "react";
import { View, KeyboardAvoidingView, TextInput } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import TX_R from "../Components/TX_R";
import TX_L from "../Components/TX_L";

export default function Forgot(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%"
      }}
    >
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          //   backgroundColor: "salmon",
          width: "78%"
        }}
      >
        <TX_L style={{ fontSize: 34, marginTop: 10 }}>ลืมรหัสผ่าน</TX_L>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 3,
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          backgroundColor: "white",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
          // elevation: 20
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "78%",
              marginTop: 100,
              alignItems: "center"
              // backgroundColor: "green"
            }}
          >
            <View style={{ width: "100%", marginTop: 10 }}>
              <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                Email
              </TX_R>
              <TextInput
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 0.5,
                  fontSize: 20
                }}
              />
            </View>
          </View>

          <LinearGradient
            colors={["#40c9ff", "#4a40ff"]}
            start={[1, -1.2]}
            style={{
              width: "78%",
              height: 60,
              // backgroundColor: "salmon",
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              marginTop: 40,
              borderRadius: 8,
              elevation: 3
            }}
          >
            <TX_R style={{ fontSize: 18, color: "white" }}>รีเซ็ตรหัสผ่าน</TX_R>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
