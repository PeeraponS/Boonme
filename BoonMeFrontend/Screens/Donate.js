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
import * as Progress from "react-native-progress";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

const Donate = (props) => {
  const userCoin = useSelector((state) => state.user.amountCoin);
  const amount = props.route.params.item.donation_amount;
  const max = props.route.params.item.max_donation_amount;
  const percent = (amount * 100) / max;
  const lengthBar = percent / 100;
  const { width } = Dimensions.get("window");
  const ProgressWidth = width - 40;
  const [donateAmount, setDonateAmount] = useState("0.00");

  const minus = () => {
    setDonateAmount((Value) => (Number(Value) - 100).toString());
  };

  const plus = () => {
    setDonateAmount((Value) => (Number(Value) + 100).toString());
  };

  const userToken = useSelector((state) => state.user.token);
  const [isLoaded, setIsLoaded] = useState(false);

  const donation = async () => {
    setIsLoaded(true);
    const projectId = props.route.params.item._id;
    let url = `https://limitless-taiga-70780.herokuapp.com/transaction/donate/${projectId}`;
    let Authorization = `Bearer ${userToken}`;
    console.log(projectId);
    console.log(url);
    console.log(Authorization);
    console.log(donateAmount);

    try {
      const result = await axios({
        method: "post",
        url,
        data: {
          donate: Number(donateAmount),
        },
        headers: {
          Authorization,
        },
      });
      refreshUserCoin();

      // console.log(result.data);
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  };

  const GETCOIN = "GETCOIN";
  const dispatch = useDispatch();
  const refreshUserCoin = async () => {
    let url = `https://limitless-taiga-70780.herokuapp.com/erc20token/checkbalance`;
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
        type: GETCOIN,
        coinData: result.data,
      });
      setIsLoaded(false);
      props.navigation.navigate("Explore");
    } catch (err) {
      console.log("refreshUserCoin err");
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
            props.navigation.navigate("WalletStack");
          }}
        >
          <View>
            <TX_R
              style={{
                fontSize: 14,
                top: 2,
                backgroundColor: "#007AFF",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
                color: "#fff",
              }}
            >
              {userCoin} เหรียญบุญมี
            </TX_R>
          </View>
        </TouchableWithoutFeedback>
        {/* <View style={{ width: 20, height: 20 }}></View> */}
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <View
            style={{
              marginTop: 10,
              width: "100%",
              height: "100%",
              borderRadius: 12,
              // elevation: 2,
              backgroundColor: "#fff",
              flex: 1,
              justifyContent: "space-around",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                flex: 3,
                backgroundColor: "#fff",
                padding: 10,
                paddingTop: 20,
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: "flex-start",
                  alignContent: "center",
                }}
              >
                <TX_R style={{ fontSize: 18 }}>
                  {props.route.params.item.name}
                </TX_R>
                <TX_R style={{ fontSize: 14, marginTop: 5 }}>
                  {props.route.params.item.creatorname}
                </TX_R>
              </View>

              <View style={{ height: 100, justifyContent: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <TX_R style={{ fontSize: 28 }}>{percent.toFixed(2)}%</TX_R>
                  <TX_R style={{ fontSize: 14, bottom: 5 }}>
                    {amount}/{max}
                  </TX_R>
                </View>
                <Progress.Bar progress={lengthBar} width={ProgressWidth} />
              </View>
            </View>
            {/* <View style={{ flex: 1, backgroundColor: "#fff" }}></View> */}
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: 220,
            backgroundColor: "#1b262c",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            elevation: 40,
          }}
        >
          <View style={{ width: "100%", marginBottom: 10 }}>
            <View
              style={{
                height: 50,
                backgroundColor: "#1b262c",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  keyboardType={"numeric"}
                  value={donateAmount}
                  onChangeText={(Value) => setDonateAmount(Value.toString())}
                  onBlur={() => {
                    Keyboard.dismiss();
                  }}
                  selectTextOnFocus={true}
                  style={{
                    // width: 100,
                    backgroundColor: "#1b262c",
                    fontSize: 28,
                    paddingHorizontal: 10,
                    borderRadius: 12,
                    marginRight: 10,
                    height: 50,
                    color: "#fff",
                  }}
                  placeholder="0.00"
                  placeholderTextColor="#fff"
                  textAlign="right"
                />
                <View
                  style={{
                    justifyContent: "flex-end",
                    height: "100%",
                    paddingVertical: 8,
                    // backgroundColor: "red",
                  }}
                >
                  <TX_R style={{ color: "#fff" }}>เหรียญบุญมี</TX_R>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#1b262c",
                  height: "100%",
                  width: 70,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    minus();
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TX_R style={{ fontSize: 30, color: "#007AFF" }}>-</TX_R>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => {
                    plus();
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TX_R style={{ fontSize: 30, color: "#007AFF" }}>+</TX_R>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", marginBottom: 20 }}>
            <TextInput
              selectTextOnFocus={true}
              placeholder="ความคิดเห็นเกี่ยวกับโครงการนี้"
              placeholderTextColor="#aaa"
              style={{
                width: "100%",
                height: 50,
                // borderBottomWidth: 0.5,
                fontSize: 16,
                borderColor: "black",
                paddingHorizontal: 10,
                backgroundColor: "#eee",
                fontFamily: "NOTO_R",
                borderRadius: 12,
                paddingTop: 5,
              }}
            />
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              // console.log(donateAmount);
              donation();
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
                <TX_R style={{ color: "#fff", fontSize: 20 }}>บริจาค</TX_R>
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default Donate;
