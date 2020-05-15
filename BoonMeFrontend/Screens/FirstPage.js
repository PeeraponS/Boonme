import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import SafeAreaView from "react-native-safe-area-view";

import FirstPageImg from "../Data/FirstPageImg";

import TX_R from "../Components/TX_R";
import TX_B from "../Components/TX_B";
import TX_L from "../Components/TX_L";

function Img({ source }) {
  return (
    <View
      style={{
        width: width,
        // backgroundColor: "salmon",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <TX_R style={{ fontSize: 24 }}>{title}</TX_R> */}
      <Image
        source={source}
        resizeMode="center"
        style={{ width: width, height: "100%", overflow: "visible" }}
      />
    </View>
  );
}

function Dots() {
  const step = Animated.divide(scrollX, width);
  return FirstPageImg.map((item, index) => {
    const colorDot = step.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ["#1b262c", "#007AFF", "#1b262c"],
      extrapolate: "clamp",
    });
    const widthDot = step.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [6, 24, 6],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        key={item.id}
        style={{
          height: 6,
          width: widthDot,
          borderRadius: 3,
          backgroundColor: colorDot,
          marginHorizontal: 4,
          bottom: 15,

          //   position: "absolute"
        }}
      ></Animated.View>
    );
  });
}

const scrollX = new Animated.Value(0);
const { width } = Dimensions.get("window");

export default function FirstPage(props) {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TX_L style={{ fontSize: 32, marginTop: 40 }}>บุญมี.com</TX_L>
      </View>
      <View
        style={{
          flex: 4,
          justifyContent: "center",
          // backgroundColor: "#fafafa",
          width: "100%",
          height: "100%",
        }}
      >
        <Animated.FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={FirstPageImg}
          renderItem={({ item }) => (
            <Img title={item.title} source={item.source} />
          )}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        />
        <View
          style={{
            width: "100%",
            height: 10,
            // backgroundColor: "#fafafa",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Dots />
        </View>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          // backgroundColor: "#fafafa",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("SignIn");
          }}
        >
          <LinearGradient
            colors={["#007AFF", "#007AFF"]}
            start={[1, -1.2]}
            style={styles.button}
          >
            <TX_R style={{ fontSize: 18, color: "white" }}>เข้าสู่ระบบ</TX_R>
          </LinearGradient>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("SignUp");
          }}
        >
          <LinearGradient
            colors={["#1b262c", "#1b262c"]}
            start={[1, -1.2]}
            style={styles.button}
          >
            <TX_R style={{ fontSize: 18, color: "#fff" }}>สมัครบัญชี</TX_R>
          </LinearGradient>
        </TouchableWithoutFeedback>
        <TX_R
          style={{
            fontSize: 14,
            marginBottom: 30,
            marginTop: 20,
            color: "#777777",
          }}
        >
          ข้อตกลงการใช้บริการ
        </TX_R>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: getStatusBarHeight(),
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
  },
});
