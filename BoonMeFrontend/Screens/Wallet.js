import React, { useState, useRef } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import sha256 from "sha256";
import axios from "axios";

import TX_R from "../Components/TX_R";
import TX_B from "../Components/TX_B";
import TX_L from "../Components/TX_L";

import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

const Wallet = (props) => {
  const pinInput = useRef(null);
  const [code, setCode] = useState();
  const [text, setText] = useState("");
  const userPin = useSelector((state) => state.user.userpin);
  const userToken = useSelector((state) => state.user.token);
  const userName = useSelector((state) => state.user.name);
  const userCash = useSelector((state) => state.user.amountCash);

  const _checkCode = async (code) => {
    const encryptedCode_Mockup = await sha256.x2(userPin);
    const encryptedinputCode = await sha256.x2(code);

    if (encryptedCode_Mockup != encryptedinputCode) {
      pinInput.current.shake().then(() => setCode(""));
      setText("Pin ไม่ถูกต้อง");
    } else {
      console.log("loading");
      await buyGoodcoin(); //10 hour ,
      console.log("laoded");
      setText("");
      setVisible(false);
      refreshUserCoin();

      setCode();
    }
  };

  const buyGoodcoin = async () => {
    let url = `https://limitless-taiga-70780.herokuapp.com/erc20token/buytoken`;
    let Authorization = `Bearer ${userToken}`;
    console.log(Authorization);
    try {
      const result = await axios({
        method: "post",
        url,
        data: {
          value: Number(amount),
        },
        headers: {
          Authorization,
        },
      });
      refreshUserInfo();
      console.log(amount);
    } catch (err) {
      console.log(err);
    }
  };

  const GETCOIN = "GETCOIN";
  const LOGIN = "LOGIN";
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
    } catch (err) {
      console.log("refreshUserCoin err");
      console.log(err);
    }
  };

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
    } catch (err) {
      console.log("refreshUserInfo err");
      console.log(err);
    }
  };

  function buttonscroll() {
    scroll.current.scrollTo({
      x: width,
      y: 0,
      animated: true,
    });
  }
  function buttonscroll2() {
    scroll.current.scrollTo({
      x: width * 2,
      y: 0,
      animated: true,
    });
  }
  function buttonscrollback() {
    scroll.current.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  }

  const [alertshow, setAlertshow] = useState("");
  const [amount, setAmount] = useState();
  const [visible, setVisible] = useState(false);
  const scroll = useRef(null);
  const txinput = useRef(null);

  const { width } = Dimensions.get("window");

  const userCoin = useSelector((state) => state.user.amountCoin);
  const coinAddress = useSelector((state) => state.user.userAddress);

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      {/* modal 1  */}
      <Modal visible={visible} transparent={true} animationType="fade">
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#00000050",
          }}
        ></View>
      </Modal>
      <Modal visible={visible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(false);
          }}
        >
          <View
            style={{
              height: 120 + 92 - getStatusBarHeight(),
              width: "100%",
              // backgroundColor: "#00000050",
            }}
          ></View>
        </TouchableWithoutFeedback>
        <View
          style={{
            width: "100%",
            height: 70,
            backgroundColor: "#fff",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(false);
            }}
          >
            <Ionicons
              name="ios-arrow-round-back"
              size={34}
              style={{ width: 30 }}
            />
          </TouchableWithoutFeedback>
          <View>
            <TX_R style={{ fontSize: 26 }}>ซื้อเหรียญ</TX_R>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={scroll}
          scrollEnabled={false}
        >
          <View style={{ width: width, flex: 1 }}>
            <View
              style={{
                backgroundColor: "#fff",
                flex: 1,
                paddingHorizontal: 20,
                alignItems: "flex-end",
              }}
            >
              <View style={{ marginTop: 20 }}>
                <TX_R>จำนวน (บาท)</TX_R>
              </View>
              <TextInput
                onChangeText={setAmount}
                selectTextOnFocus={true}
                keyboardType={"numeric"}
                textAlign="right"
                style={{
                  width: "100%",
                  height: 60,
                  borderBottomWidth: 0.5,
                  fontSize: 26,
                  borderColor: "black",
                  paddingTop: 20,
                }}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  buttonscroll();
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: "100%",
                      height: 60,
                      backgroundColor: "#1b262c",
                      marginTop: 40,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TX_R style={{ fontSize: 20, color: "#fff" }}>ถัดไป</TX_R>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={{ width: width, flex: 1 }}>
            <View
              style={{
                backgroundColor: "#fff",
                flex: 1,
                paddingHorizontal: 20,
                alignItems: "flex-end",
              }}
            >
              <View style={{ marginTop: 20 }}>
                <TX_R>วิธีชำระเงิน</TX_R>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 240,
                  borderRadius: 12,
                  backgroundColor: "#eee",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "94%",
                    height: 80,
                    borderRadius: 12,
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
                    <TX_R style={{ fontSize: 28, marginRight: 10 }}>
                      {userCash}
                    </TX_R>
                    <TX_R style={{ fontSize: 14, bottom: 5 }}>บาท</TX_R>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    buttonscrollback();
                  }}
                >
                  <View
                    style={{
                      width: "48%",
                      height: 60,
                      backgroundColor: "#1b262c",
                      marginTop: 20,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TX_R style={{ fontSize: 20, color: "#fff" }}>
                      ย้อนกลับ
                    </TX_R>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => {
                    buttonscroll2();
                  }}
                >
                  <View
                    style={{
                      width: "48%",
                      height: 60,
                      backgroundColor: "#1b262c",
                      marginTop: 20,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TX_R style={{ fontSize: 20, color: "#fff" }}>ถัดไป</TX_R>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View style={{ width: width, flex: 1 }}>
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <View style={{ flex: 0.5, alignItems: "center" }}>
                <TX_R style={{ fontSize: 16, bottom: 20 }}>
                  ใส่พินเพื่อยืนยัน
                </TX_R>
                <SmoothPinCodeInput
                  password
                  mask={
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 20,
                        backgroundColor: "black",
                      }}
                    ></View>
                  }
                  cellStyle={{
                    borderBottomWidth: 1.5,
                    borderColor: "gray",
                  }}
                  cellStyleFocused={{
                    borderColor: "black",
                  }}
                  ref={pinInput}
                  value={code}
                  codeLength={4}
                  onTextChange={(code) => setCode(code)}
                  onFulfill={_checkCode}
                  onBackspace={() => console.log("No more back.")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
            props.navigation.openDrawer();
          }}
        >
          <Ionicons name="ios-menu" size={30} />
        </TouchableWithoutFeedback>
        <View>
          <TX_R style={{ fontSize: 18, top: 2 }}>วอลเล็ท</TX_R>
        </View>
        <TouchableWithoutFeedback>
          <Ionicons name="md-settings" size={24} />
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          width: "100%",
          height: 120,
          justifyContent: "center",
          alignItems: "center",
          elevation: 1,
          backgroundColor: "#fff",
          paddingBottom: 0,
        }}
      >
        <TX_B style={{ fontSize: 28 }}>{userCoin}</TX_B>
        <TX_R style={{ color: "#007AFF" }}>เหรียญบุญมี</TX_R>
        <TX_R style={{ fontSize: 12, marginTop: 10 }}>
          address: {coinAddress}
        </TX_R>
      </View>

      <View
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#fff",
          elevation: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(true);
              setCode();
            }}
          >
            <View style={styles.box}>
              <MaterialCommunityIcons
                name="coin"
                size={24}
                style={{ marginBottom: 10, marginTop: 3 }}
              />
              <TX_R>ซื้อเหรียญ</TX_R>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("Card");
            }}
          >
            <View style={styles.box}>
              <SimpleLineIcons
                name="credit-card"
                size={28}
                style={{ marginBottom: 10 }}
              />
              <TX_R>วิธีชำระเงิน</TX_R>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.box}>
              <FontAwesome5
                name="money-bill-alt"
                size={24}
                style={{ marginBottom: 11, marginTop: 3 }}
              />
              <TX_R>โอนเงิน</TX_R>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ padding: 10, marginTop: 20 }}>
          <TX_R style={{ fontSize: 22 }}>Recent Transactions</TX_R>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#fff",
          paddingHorizontal: "3%",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: "100%",
              height: 80,
              borderRadius: 12,
              backgroundColor: "#eee",
              marginTop: 10,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              height: 80,
              borderRadius: 12,
              backgroundColor: "#eee",
              marginTop: 10,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              height: 80,
              borderRadius: 12,
              backgroundColor: "#eee",
              marginTop: 10,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              height: 80,
              borderRadius: 12,
              backgroundColor: "#eee",
              marginTop: 10,
            }}
          ></View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },
  box2: {
    width: 100,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#ffd30d",
    elevation: 8,
    marginTop: 10,
  },
});

export default Wallet;
