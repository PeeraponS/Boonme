import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { GETTOKEN, LOGIN } from "../Store/Action/UserAction";
import axios from "axios";

const StartUp = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const getUserByToken = async (token) => {
    let url = `https://limitless-taiga-70780.herokuapp.com/users/me`;
    let Authorization = `Bearer ${token}`;

    try {
      const result = await axios({
        method: "get",
        url,
        headers: {
          Authorization,
        },
      });
      return result;
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  };

  const tryLogin = async () => {
    const userData = await AsyncStorage.getItem("userData");

    if (!userData) {
      props.navigation.navigate("UserAuthen");
      return;
    }
    const tranformedData = JSON.parse(userData);
    const { token } = tranformedData;
    // console.log(token);

    dispatch({
      type: GETTOKEN,
      token: token,
    });

    const result = await getUserByToken(token);

    dispatch({
      type: LOGIN,
      userData: result.data,
    });
    // console.log(result.data);
    // if (!userName) {
    //   props.navigation.navigate("GetInfo");
    //   return;
    // }

    props.navigation.navigate("Drawer");

    return;
  };

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#40c9ff", "#4a40ff"]}
        start={[1, -1.2]}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StartUp;
