import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import TX_R from "../Components/TX_R";
import TX_L from "../Components/TX_L";

export default function SignUp(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();
  const [email, setEmail] = useState();

  const createUser = async () => {
    const baseUrl = "https://aqueous-beach-98436.herokuapp.com";
    const url = `${baseUrl}/users`;
    console.log(url);
    const data = {
      username: username,
      email: email,
      password: password
    };

    try {
      const result = await axios({
        method: "post",
        url: url,
        data: data
        // but you can write only
        // url,
        // data,
      });

      console.log(result.data);
    } catch (err) {
      console.log(err.message);
    }
  };

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
        <TX_L style={{ fontSize: 34, marginTop: 10 }}>สมัครสมาชิก</TX_L>
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
              marginTop: 20,
              alignItems: "center"
              // backgroundColor: "green"
            }}
          >
            <View style={{ width: "100%", marginTop: 10 }}>
              <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                Username
              </TX_R>
              <TextInput
                onChangeText={setUsername}
                selectTextOnFocus={true}
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 0.5,
                  fontSize: 20
                }}
              />
            </View>
            <View style={{ width: "100%", marginTop: 10 }}>
              <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                Password
              </TX_R>
              <TextInput
                onChangeText={setPassword}
                selectTextOnFocus={true}
                secureTextEntry={true}
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 0.5,
                  fontSize: 20
                }}
              />
            </View>
            <View style={{ width: "100%", marginTop: 10 }}>
              <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                Confirm Password
              </TX_R>
              <TextInput
                onChangeText={setRepassword}
                selectTextOnFocus={true}
                secureTextEntry={true}
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 0.5,
                  fontSize: 20
                }}
              />
            </View>
            <View style={{ width: "100%", marginTop: 10 }}>
              <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                Email
              </TX_R>
              <TextInput
                onChangeText={setEmail}
                selectTextOnFocus={true}
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 0.5,
                  fontSize: 20
                }}
              />
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(username);
              console.log(password);
              console.log(repassword);
              console.log(email);
              createUser();
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
                elevation: 3
              }}
            >
              <TX_R style={{ fontSize: 18, color: "white" }}>สมัครสมาชิก</TX_R>
            </LinearGradient>
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: "row" }}>
            <TX_R style={{ marginTop: 20, color: "#555555" }}>
              หากมีบัญชีอยู่แล้ว
            </TX_R>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate("SignIn");
              }}
            >
              <View>
                <TX_R style={{ marginTop: 20, marginLeft: 10 }}>
                  เข้าสู่ระบบ
                </TX_R>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
