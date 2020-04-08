import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const StartUp = props => {
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("UserAuthen");
        return;
      }
      const tranformedData = JSON.parse(userData);
      const { token, userId } = tranformedData;
      props.navigation.navigate("Drawer");
    };
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
          alignItems: "center"
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StartUp;
