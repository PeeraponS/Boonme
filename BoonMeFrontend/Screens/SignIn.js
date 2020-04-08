import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  Alert,
  AsyncStorage,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";

import TX_R from "../Components/TX_R";
import TX_L from "../Components/TX_L";
import TX_B from "../Components/TX_B";

const LOGIN = "LOGIN";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function SignIn(props) {
  const [isLoad, setIsLoad] = useState(0);
  const [textLoginBtn, setTextLoginBtn] = useState("เข้าสู่ระบบ");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.name);

  const loadDataLogin = async () => {
    try {
      setTextLoginBtn("");
      setIsLoad(1);

      const result = await axios({
        method: "post",
        url: "https://aqueous-beach-98436.herokuapp.com/users/login",
        data: {
          email: username,
          password: password,
        },
      });
      dispatch({
        type: LOGIN,
        userData: result.data.user,
      });
      // console.log(result.data);
      SaveDataToStorage(result.data.token, result.data.user._id);
      // console.log("token");
      // console.log(result.data.token);
      // console.log(result.data);

      setTextLoginBtn("เข้าสู่ระบบ");
      setIsLoad(0);

      if (result.data.user.userpin) {
        props.navigation.navigate("Drawer");
      } else {
        props.navigation.navigate("PinCreate");
      }
      // console.log(result.data);
    } catch (err) {
      setTextLoginBtn("เข้าสู่ระบบ");
      setIsLoad(0);
      setError(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (error != "")
      Alert.alert("กรุณาตรวจสอบ Username หรือ Password", error[{ text: "OK" }]);
    setError("");
  }, [error]);

  const SaveDataToStorage = (token, userId) => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        userId: userId,
      })
    );
  };

  return (
    <View style={styles.container}>
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
        <TX_L style={{ fontSize: 34, marginTop: 10 }}>เข้าสู่ระบบ</TX_L>
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
          borderTopRightRadius: 8,
          // elevation: 20
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "78%",
              marginTop: 40,
              alignItems: "center",
              // backgroundColor: "green"
            }}
          >
            <View style={styles.textInputContainer}>
              <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                Username
              </TX_R>
              <TextInput
                onChangeText={setUsername}
                selectTextOnFocus={true}
                style={styles.textInput}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                Password
              </TX_R>
              <TextInput
                onChangeText={setPassword}
                selectTextOnFocus={true}
                secureTextEntry={true}
                style={styles.textInput}
              />
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(username);
              console.log(password);
              loadDataLogin();
              Keyboard.dismiss();
            }}
          >
            <LinearGradient
              colors={["#40c9ff", "#4a40ff"]}
              start={[1, -1.2]}
              style={styles.button}
            >
              <ActivityIndicator
                size="small"
                color="white"
                style={{ opacity: isLoad, position: "absolute" }}
              />
              <TX_R style={{ fontSize: 18, color: "white" }}>
                {textLoginBtn}
              </TX_R>
            </LinearGradient>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("Forgot");
            }}
          >
            <View>
              <TX_R style={{ marginTop: 20, color: "#555555" }}>
                ลืมรหัสผ่าน ?
              </TX_R>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
  textInput: {
    width: "100%",
    height: 50,
    borderBottomWidth: 0.5,
    fontSize: 20,
    borderColor: "black",
  },
  textInputactive: {
    width: "100%",
    height: 50,
    borderBottomWidth: 0.5,
    fontSize: 20,
    borderColor: "red",
  },
  textInputContainer: {
    width: "100%",
    marginTop: 10,
  },
  button: {
    width: "78%",
    height: 60,
    // backgroundColor: "salmon",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginTop: 40,
    borderRadius: 8,
    elevation: 3,
  },
  alert: {
    width: 400,
  },
});
