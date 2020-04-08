import React, { useState, useRef } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { useSelector, useDispatch } from "react-redux";
import TX_R from "../Components/TX_R";

import axios from "axios";

export default PinCreate = props => {
  const [code, setCode] = useState();
  const [text, setText] = useState("");

  const [isPin1, setIsPin1] = useState(true);
  const [Title, setTitle] = useState("กรุณาใส่ Pin");
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");

  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userId);
  //   const userPin = useSelector(state => state.user.userpin);
  // const pinInput = React.createRef()
  const pinInput = useRef(null);

  // sent Data back to Backend server
  const updateUserpin = async pin2 => {
    // console.log("updateUserpin -- PinCreater");
    // console.log("userData");
    // console.log(userData);
    // console.log("pin2");
    // console.log(pin2);
    try {
      const result = await axios({
        method: "patch",
        url: `https://aqueous-beach-98436.herokuapp.com/users/${userData}/updatepin`,
        data: {
          userpin: pin2
        }
      });
      dispatch({
        type: LOGIN,
        userData: result.data
      });

      //   console.log(result.data);
    } catch (err) {
      console.log(err);
      // console.log(err.massage);
    }
  };

  // Send a POST request
  // const updateUserpin = async () => {
  //   let userpin = 4822; //change 'userAuthenToken' to 'user_token'
  //   let usertoken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdmNGMzNDA5MDFmYzAwMDQwODkwY2YiLCJpYXQiOjE1ODU0MDA4ODR9.zNuwxOYZATV5bYevRWNOcsE0oK9Wqcv8rxtKEMGIcqE";
  //   let Authorization = `Bearer ${usertoken}`; //change 'userAuthenToken' to 'user_token'
  //   const result = await axios({
  //     method: "patch",
  //     url: `https://aqueous-beach-98436.herokuapp.com/users/5e7f4c340901fc00040890cf/updatepin`,
  //     data: {
  //       userpin
  //     },
  //     headers: {
  //       Authorization
  //     }
  //   });
  //   console.log(result.data);
  // };
  // updateUserpin();

  const _checkCode = code => {
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
        Keyboard.dismiss();
        props.navigation.navigate("Drawer");
      }
    }
  };

  return (
    <View style={styles.container}>
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
                backgroundColor: "black"
              }}
            ></View>
          }
          cellStyle={{
            borderBottomWidth: 1.5,
            borderColor: "gray"
          }}
          cellStyleFocused={{
            borderColor: "black"
          }}
          ref={pinInput}
          value={code}
          codeLength={4}
          onTextChange={code => setCode(code)}
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
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  section: {
    alignItems: "center",
    margin: 16
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    marginBottom: 40
  }
});
