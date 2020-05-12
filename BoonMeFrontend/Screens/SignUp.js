import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import TX_R from "../Components/TX_R";
import TX_L from "../Components/TX_L";

import { Ionicons } from "@expo/vector-icons";

export default function SignUp(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();
  const [email, setEmail] = useState();

  const createUser = async () => {
    const baseUrl = "https://limitless-taiga-70780.herokuapp.com";
    const url = `${baseUrl}/users`;
    console.log(url);
    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const result = await axios({
        method: "post",
        url: url,
        data: data,
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
        width: "100%",
      }}
    >
      <View
        style={{
          paddingTop: getStatusBarHeight() + 40,
          flex: 1,
          justifyContent: "space-between",
          alignItems: "flex-start",
          // backgroundColor: "salmon",
          width: "100%",
          paddingHorizontal: "10%",
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
        <TX_L style={{ fontSize: 34 }}>สมัครสมาชิก</TX_L>
      </View>
      <KeyboardAvoidingView
        // behavior="padding"
        style={{
          flex: 6,
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          backgroundColor: "white",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          // elevation: 20
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            // backgroundColor: "#f05",
          }}
        >
          <View
            style={{
              width: "80%",
              alignItems: "center",
            }}
          >
            <View style={{ width: "100%" }}>
              <TX_R style={{ color: "#555555", top: 10, fontSize: 14 }}>
                Username
              </TX_R>
              <TextInput
                onChangeText={setUsername}
                selectTextOnFocus={true}
                style={styles.textInput}
              />
            </View>
            <View style={{ width: "100%", marginTop: 5 }}>
              <TX_R style={{ color: "#555555", top: 10, fontSize: 14 }}>
                Password
              </TX_R>
              <TextInput
                onChangeText={setPassword}
                selectTextOnFocus={true}
                secureTextEntry={true}
                style={styles.textInput}
              />
            </View>
            <View style={{ width: "100%", marginTop: 5 }}>
              <TX_R style={{ color: "#555555", top: 10, fontSize: 14 }}>
                Confirm Password
              </TX_R>
              <TextInput
                onChangeText={setRepassword}
                selectTextOnFocus={true}
                secureTextEntry={true}
                style={styles.textInput}
              />
            </View>
            <View style={{ width: "100%", marginTop: 5 }}>
              <TX_R style={{ color: "#555555", top: 10, fontSize: 14 }}>
                Email
              </TX_R>
              <TextInput
                onChangeText={setEmail}
                selectTextOnFocus={true}
                style={styles.textInput}
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
              style={styles.button}
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

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 60,
    borderBottomWidth: 0.5,
    fontSize: 20,
    paddingTop: 20,
  },
  button: {
    width: "80%",
    height: 56,
    backgroundColor: "salmon",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 28,
    elevation: 1,
    marginTop: 40,
  },
});
