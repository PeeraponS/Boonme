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

import TX_R from "../Components/TX_R";
import TX_B from "../Components/TX_B";

import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

import { useSelector } from "react-redux";
import TX_L from "../Components/TX_L";

const Wallet = () => {
  function buttonscroll() {
    if (amount >= 1) {
      console.log(amount);
      scroll.current.scrollTo({
        x: (92 * width) / 100,
        y: 0,
        animated: true,
      });
      setAlertshow("");
    }
    if (amount < 1) {
      console.log(amount);
      setAlertshow("กรุณาใส่จำนวน 1 บาทขึ้นไป");
      txinput.current.clear();
    }
  }
  const [alertshow, setAlertshow] = useState("");
  const [amount, setAmount] = useState();
  const [visible, setVisible] = useState(false);
  const scroll = useRef(null);
  const txinput = useRef(null);

  const { width } = Dimensions.get("window");

  const userCoin = useSelector((state) => state.user.amountCoin);
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        hardwareAccelerated={true}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(false);
              setAmount("");
            }}
          >
            <View
              style={{
                height: 1000,
                width: "100%",
                backgroundColor: "black",
                position: "absolute",
                opacity: 0.3,
              }}
            ></View>
          </TouchableWithoutFeedback>

          <View
            style={{
              width: (92 * width) / 100,
              height: 400,
              backgroundColor: "white",
              top: 140,
              borderRadius: 14,
              elevation: 8,
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 100,
                width: "86%",
                // backgroundColor: "salmon",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <TX_R style={{ fontSize: 34 }}>เติมเงิน</TX_R>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              ref={scroll}
              horizontal
              scrollEnabled={false}
              snapToAlignment="center"
              // snapToInterval={(92 * width) / 100}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{ width: (92 * width) / 100, alignItems: "center" }}
                >
                  <View style={{ height: 200, width: "86%" }}>
                    <View
                      style={{
                        width: "100%",
                        marginTop: 100,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TX_R
                          style={{ color: "#555555", top: 5, fontSize: 14 }}
                        >
                          จำนวน ( บาท )
                        </TX_R>
                        <TX_R style={{ color: "red", top: 5, fontSize: 14 }}>
                          {alertshow}
                        </TX_R>
                      </View>
                      <TextInput
                        ref={txinput}
                        onChangeText={setAmount}
                        keyboardType="decimal-pad"
                        selectTextOnFocus={true}
                        style={{
                          width: "100%",
                          height: 50,
                          borderBottomWidth: 0.5,
                          fontSize: 20,
                          borderColor: "black",
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      height: 100,
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => {
                        buttonscroll();
                      }}
                    >
                      <LinearGradient
                        colors={["#40c9ff", "#4a40ff"]}
                        start={[1, -1.2]}
                        style={{
                          width: "86%",
                          height: 60,
                          backgroundColor: "salmon",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: 10,
                          borderRadius: 8,
                          elevation: 3,
                        }}
                      >
                        <TX_R style={{ fontSize: 18, color: "white" }}>
                          ต่อไป
                        </TX_R>
                      </LinearGradient>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View
                  style={{ width: (92 * width) / 100, alignItems: "center" }}
                >
                  <View style={{ height: 200, width: "86%" }}>
                    <View
                      style={{
                        width: "100%",
                        marginTop: 100,
                      }}
                    >
                      <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                        จำนวน ( บาท )
                      </TX_R>
                      <TextInput
                        keyboardType="decimal-pad"
                        selectTextOnFocus={true}
                        style={{
                          width: "100%",
                          height: 50,
                          borderBottomWidth: 0.5,
                          fontSize: 20,
                          borderColor: "black",
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      height: 100,
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => {
                        scroll.current.scrollTo({
                          x: ((92 * width) / 100) * 2,
                          y: 0,
                        });
                      }}
                    >
                      <LinearGradient
                        colors={["#40c9ff", "#4a40ff"]}
                        start={[1, -1.2]}
                        style={{
                          width: "86%",
                          height: 60,
                          backgroundColor: "salmon",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: 10,
                          borderRadius: 8,
                          elevation: 3,
                        }}
                      >
                        <TX_R style={{ fontSize: 18, color: "white" }}>
                          ต่อไป
                        </TX_R>
                      </LinearGradient>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View
                  style={{ width: (92 * width) / 100, alignItems: "center" }}
                >
                  <View style={{ height: 200, width: "86%" }}>
                    <View
                      style={{
                        width: "100%",
                        marginTop: 100,
                      }}
                    >
                      <TX_R style={{ color: "#555555", top: 5, fontSize: 14 }}>
                        จำนวน ( บาท )
                      </TX_R>
                      <TextInput
                        keyboardType="decimal-pad"
                        selectTextOnFocus={true}
                        style={{
                          width: "100%",
                          height: 50,
                          borderBottomWidth: 0.5,
                          fontSize: 20,
                          borderColor: "black",
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      height: 100,
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <LinearGradient
                      colors={["#40c9ff", "#4a40ff"]}
                      start={[1, -1.2]}
                      style={{
                        width: "86%",
                        height: 60,
                        backgroundColor: "salmon",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 10,
                        borderRadius: 8,
                        elevation: 3,
                      }}
                    >
                      <TX_R style={{ fontSize: 18, color: "white" }}>
                        ต่อไป
                      </TX_R>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <View
        style={{
          height: "35%",
          width: "100%",
          backgroundColor: "#ffd30d",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <View
          style={{
            marginTop: getStatusBarHeight(),
            width: "100%",
            height: 70,
            // backgroundColor: "red",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ width: 50, height: "100%" }}></View>
          {/* <TX_R style={{ fontSize: 18 }}>กระเป๋า</TX_R> */}
          {/* <Ionicons
            name="md-settings"
            size={24}
            // color="white"
            style={{
              margin: 14,
              marginTop: 16,
              marginRight: 20
            }}
          /> */}
          {/* <TX_R style={{ fontSize: 24, marginTop: 2, marginRight: 20 }}>
            กระเป๋าเงิน
          </TX_R> */}
        </View>
        {/* <View style={{ width: "100%" }}>
          <TX_R style={{ fontSize: 24, top: 5, marginLeft: 20 }}>กระเป๋า</TX_R>
        </View> */}
        <LinearGradient
          colors={["#ffffff", "#40c9ff", "#4a40ff"]}
          start={[1, -1.2]}
          style={{
            width: "94%",
            height: "80%",
            marginTop: 20,
            borderRadius: 20,
            elevation: 16,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TX_R style={{ fontSize: 16, color: "white" }}>ยอดเงินในระบบ</TX_R>
            <View style={{ flexDirection: "row" }}>
              <TX_R style={{ fontSize: 26, color: "white" }}>{userCoin}</TX_R>
              <TX_R style={{ fontSize: 26, color: "white" }}> MBC.</TX_R>
            </View>
          </View>
        </LinearGradient>
      </View>
      <View
        style={{
          height: "50%",
          width: "90%",
          marginTop: 100,
          // backgroundColor: "#555555",
        }}
      >
        <View style={styles.tableColumn}>
          <View style={styles.tablerow}>
            <TouchableWithoutFeedback
              onPress={() => {
                setVisible(true);
                setAlertshow("");
              }}
            >
              <View style={styles.button}>
                <MaterialCommunityIcons name="coin" color="black" size={28} />
                <TX_R style={{ marginTop: 12, fontSize: 16 }}>เติมเงิน</TX_R>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.button}>
                <AntDesign name="swap" color="black" size={28} />
                <TX_R style={{ marginTop: 12, fontSize: 16 }}>ประวัติ</TX_R>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.tablerow}>
            <TouchableWithoutFeedback>
              <View style={styles.button}>
                <AntDesign name="creditcard" color="black" size={28} />
                <TX_R style={{ marginTop: 12, fontSize: 16 }}>บัตร</TX_R>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.button}>
                <FontAwesome name="money" color="black" size={28} />
                <TX_R style={{ marginTop: 12, fontSize: 16 }}>ถอนเงิน</TX_R>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "44%",
    height: "90%",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    elevation: 16,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "darkgrey"
  },
  tablerow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "44%",
    width: "100%",
    // backgroundColor: "blue"
  },
  tableColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
});

export default Wallet;
