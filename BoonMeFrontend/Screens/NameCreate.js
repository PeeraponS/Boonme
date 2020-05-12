import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";

import TX_R from "../Components/TX_R";
import TX_L from "../Components/TX_L";

const NameCreate = (props) => {
  const [name, setName] = useState();

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
          paddingTop: getStatusBarHeight(),
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          //   backgroundColor: "salmon",
          width: "78%",
        }}
      >
        <TX_L style={{ fontSize: 34, marginTop: 10 }}>ข้อมูลเกี่ยวกับคุณ</TX_L>
      </View>
      <KeyboardAvoidingView
        // behavior="padding"
        style={{
          flex: 2,
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
              width: "78%",
              marginTop: 100,
              alignItems: "center",
              // backgroundColor: "green"
            }}
          >
            <View style={{ width: "100%", marginTop: 10 }}>
              <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                ชื่อ - นามสกุล
              </TX_R>
              <TextInput
                onChangeText={setName}
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 0.5,
                  fontSize: 20,
                }}
              />
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("PinCreate", { name });
            }}
          >
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
                elevation: 3,
              }}
            >
              <TX_R style={{ fontSize: 18, color: "white" }}>เสร็จสิ้น</TX_R>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default NameCreate;
