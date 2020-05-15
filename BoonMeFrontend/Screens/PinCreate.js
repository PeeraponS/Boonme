import React, { useState, useRef } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { useSelector, useDispatch } from "react-redux";
import TX_R from "../Components/TX_R";

import axios from "axios";

const LOGIN = "LOGIN";
export default PinCreate = (props) => {
  const [code, setCode] = useState();
  const [text, setText] = useState("");

  const [isPin1, setIsPin1] = useState(true);
  const [Title, setTitle] = useState("กรุณาใส่ Pin");
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");

  const dispatch = useDispatch();
  const userTokens = useSelector((state) => state.user.token);
  const pinInput = useRef(null);

  // sent Data back to Backend server
  const updateUserpin = async (pin2) => {
    let url = `https://limitless-taiga-70780.herokuapp.com/users/me/update`;
    let usertoken = userTokens;
    let Authorization = `Bearer ${usertoken}`;
    console.log("Authorization");
    console.log(Authorization);
    try {
      const result = await axios({
        method: "PATCH",
        url: url,
        headers: {
          Authorization,
        },
        data: {
          userpin: pin2,
          name: props.route.params.name,
        },
      });
      dispatch({
        type: LOGIN,
        userData: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const _checkCode = (code) => {
    if (isPin1 == true) {
      setPin1(code);
      setText("round 1");
      setCode();
      setIsPin1(false);
      setTitle("กรุณายืนยัน Pin อีกครั้ง");
    } else {
      setPin2(code);

      if (pin1 != code) {
        pinInput.current.shake().then(() => {
          setCode("");
          setIsPin1(true);
        });
        setText("Pin ไม่ถูกต้อง");
        setTitle("กรุณาใส่ Pin ใหม่");
      } else {
        updateUserpin(code);
        console.log(props.route.params.name);
        Keyboard.dismiss();
        props.navigation.navigate("Drawer");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: 30,
        }}
      >
        <TX_L style={{ fontSize: 34 }}>สร้างพินของคุณ</TX_L>
      </View>
      <View style={styles.section}>
        <TX_R style={styles.title}>{Title}</TX_R>
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
      <TX_R style={{ fontSize: 14, color: "red", paddingTop: 20 }}>{text}</TX_R>
      {/* <Text>{text}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    flex: 2,
    alignItems: "center",
    margin: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    marginBottom: 40,
  },
});
