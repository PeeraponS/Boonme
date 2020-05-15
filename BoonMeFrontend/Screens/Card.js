import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  Dimensions,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import TX_R from "../Components/TX_R";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

const Card = (props) => {
  const { width } = Dimensions.get("window");
  const userToken = useSelector((state) => state.user.token);
  const userName = useSelector((state) => state.user.name);
  const userCash = useSelector((state) => state.user.amountCash);
  //   console.log(state);
  const [isLoaded, setIsLoaded] = useState(false);
  const [amount, setAmount] = useState();
  const depositCash = async () => {
    let url = `https://limitless-taiga-70780.herokuapp.com/users/me/depositcash`;
    let Authorization = `Bearer ${userToken}`;
    // console.log(Authorization);
    try {
      const result = await axios({
        method: "post",
        url,
        data: {
          deposit: Number(amount),
        },
        headers: {
          Authorization,
        },
      });

      console.log(result.data);
      refreshUserInfo();
    } catch (err) {
      console.log(err);
    }
  };

  const LOGIN = "LOGIN";
  const dispatch = useDispatch();
  const refreshUserInfo = async () => {
    let url = `https://limitless-taiga-70780.herokuapp.com/users/me`;
    let Authorization = `Bearer ${userToken}`;

    try {
      const result = await axios({
        method: "get",
        url,
        headers: {
          Authorization,
        },
      });

      dispatch({
        type: LOGIN,
        userData: result.data,
      });
      setIsLoaded(false);
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Modal visible={isLoaded} transparent={true}>
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "#00000080",
          }}
        ></View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </Modal>
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
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Wallet");
          }}
        >
          <View>
            <TX_R style={{ fontSize: 18, top: 2 }}>วิธีชำระเงิน</TX_R>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ width: 20, height: 20 }}></View>
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}>
        <View
          style={{
            width: "92%",
            height: 80,
            borderRadius: 15,
            backgroundColor: "#fff",
            elevation: 4,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <View style={{ padding: 10, paddingTop: 10 }}>
            <TX_R style={{ fontSize: 20 }}>{userName}</TX_R>
            <TX_R style={{ fontSize: 14 }}>Boonme Visual Card</TX_R>
          </View>

          <View
            style={{
              padding: 10,
              paddingTop: 10,
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <TX_R style={{ fontSize: 28, marginRight: 10 }}>{userCash}</TX_R>
            <TX_R style={{ fontSize: 14, bottom: 5 }}>บาท</TX_R>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <TX_R>เพิ่มเงินทดสอบ</TX_R>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 20, marginTop: 20 }}>
          <TextInput
            keyboardType={"numeric"}
            onChangeText={setAmount}
            selectTextOnFocus={true}
            style={{
              width: "100%",
              height: 50,
              paddingHorizontal: 10,
              backgroundColor: "#eee",
              borderRadius: 12,
              fontSize: 14,
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "#fff",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setIsLoaded(true);
              depositCash();
            }}
          >
            <LinearGradient
              colors={["#007AFF", "#007AFF"]}
              start={[1, -1.2]}
              style={{
                width: "100%",
                height: 60,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View>
                <TX_R style={{ color: "#fff", fontSize: 20 }}>
                  เพิ่มเงินทดสอบ
                </TX_R>
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default Card;
