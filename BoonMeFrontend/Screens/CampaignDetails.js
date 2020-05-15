import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  // TouchableWithoutFeedback,
  Image,
  ScrollView,
  Animated,
  StatusBar,
  Dimensions,
  StyleSheet,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import TX_R from "../Components/TX_R";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import axios from "axios";
import { useSelector } from "react-redux";

const CampaignDetails = (props) => {
  const scrollY = new Animated.Value(0);
  const animOpacity = scrollY.interpolate({
    inputRange: [0, 239.9, 240],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const { width } = Dimensions.get("window");
  const ProgressWidth = width - 40;

  const imgHeight = 240;

  const [screenHeight, setScreenHeight] = useState();
  const getContentHeight = (height) => {
    let x = height + imgHeight;
    setScreenHeight(x);
  };

  //FollowBtn
  const [isFav, setisFav] = useState(false);
  const FavButton = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          // setisFav((Value) => !Value);
          // FavPress();
          FollowMedthod();
        }}
      >
        {isFav ? (
          <LinearGradient
            colors={["#fff", "#fff"]}
            start={[1, -1.2]}
            style={{
              width: 80,
              height: 35,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              borderWidth: 2,
              borderColor: "#1b262c",
            }}
          >
            <TX_R
              style={{
                fontSize: 12,
                color: "#1b262c",
              }}
            >
              ติดตามแล้ว
            </TX_R>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={["#1b262c", "#1b262c"]}
            start={[1, -1.2]}
            style={{
              width: 80,
              height: 35,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <TX_R
              style={{
                fontSize: 12,
                color: "#fff",
              }}
            >
              ติดตาม
            </TX_R>
          </LinearGradient>
        )}
      </TouchableWithoutFeedback>
    );
  };

  const userToken = useSelector((state) => state.user.token);

  const FavCheck = async () => {
    const projectId = props.route.params.item._id;
    let url = `https://limitless-taiga-70780.herokuapp.com/projects/${projectId}/favourite`;
    let Authorization = `Bearer ${userToken}`;
    try {
      const result = await axios({
        method: "get",
        url,
        data: {},
        headers: {
          Authorization,
        },
      });
      setisFav(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FavPress = async () => {
    const userId = props.route.params.item._id;
    let url = `https://limitless-taiga-70780.herokuapp.com/projects/${userId}/favourite`;
    let Authorization = `Bearer ${userToken}`;
    try {
      const result = await axios({
        method: "patch",
        url,
        data: {},
        headers: {
          Authorization,
        },
      });
      setisFav(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const [Creator, setCreator] = useState();
  // const getCreator = async () => {
  //   const userId = props.route.params.item._id;
  //   let url = `https://limitless-taiga-70780.herokuapp.com/projects/${userId}/creator`;
  //   let Authorization = `Bearer ${userToken}`;
  //   const result = await axios({
  //     url,
  //     headers: {
  //       Authorization,
  //     },
  //   });
  //   // console.log(result.data.name);
  //   setCreator(result.data.name);
  // };

  //pressFollow
  const FollowMedthod = () => {
    setisFav((Value) => !Value);
    FavPress();
  };

  //CalPercent
  const amount = props.route.params.item.donation_amount;
  const max = props.route.params.item.max_donation_amount;
  const percent = (amount * 100) / max;
  const lengthBar = percent / 100;

  //Run Funtion
  useEffect(() => {
    // LoadDataProject();
    FavCheck();
    // getCreator();
  }, []);

  const endDate = new Date(props.route.params.item.due_date);
  const date = new Date();
  const difDate = endDate - date;
  const difDay = difDate / 1000 / 60 / 60 / 24;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="#ffffffff"
      />
      <View>
        <Image
          source={{ uri: props.route.params.item.img }}
          style={{
            width: "100%",
            height: imgHeight,
            marginTop: getStatusBarHeight(),
            position: "absolute",
            zIndex: 0,
          }}
        />
      </View>
      <Animated.View
        style={{
          paddingTop: getStatusBarHeight(),
          height: 92,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          elevation: 1,
          zIndex: 3000,
          position: "absolute",
          opacity: animOpacity,
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableWithoutFeedback>
            <Ionicons
              name="md-share"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableWithoutFeedback>
          <FavButton />
        </View>
      </Animated.View>
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
        showsVerticalScrollIndicator={false}
        snapToOffsets={[imgHeight]}
        snapToAlignment="end"
        snapToEnd={false}
        bounces={false}
        contentContainerStyle={{ height: screenHeight }}
      >
        <View
          onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            getContentHeight(height);
          }}
        >
          <Animated.View
            style={{
              marginTop: getStatusBarHeight(),
              height: 92 - getStatusBarHeight(),
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "#fff",
              paddingHorizontal: 20,
              elevation: 1,
              top: imgHeight,
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableWithoutFeedback>
                <Ionicons
                  name="md-share"
                  size={24}
                  color="black"
                  style={{ marginRight: 20 }}
                />
              </TouchableWithoutFeedback>
              <FavButton />
            </View>
          </Animated.View>
          <View
            style={{
              backgroundColor: "#fff",
              top: imgHeight,
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 0,
                marginTop: 15,
              }}
            >
              <TX_R style={{ fontSize: 20 }}>
                {props.route.params.item.name}
              </TX_R>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: "#fff",
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#eee",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={require("../assets/Logo.png")}
                    style={{
                      width: 55,
                      height: 55,
                      // backgroundColor: "#1b262c",
                      borderRadius: 30,
                      resizeMode: "cover",
                    }}
                  />
                </View>
                <View
                  style={{
                    height: 40,
                    marginLeft: 15,
                    justifyContent: "center",
                  }}
                >
                  <TX_R style={{ fontSize: 14 }}>
                    โครงการโดย {props.route.params.item.creatorname}
                  </TX_R>
                  <TX_R style={{ fontSize: 12 }}>
                    เผยแพร่วันที่ 16 / 03 / 2563
                  </TX_R>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}
            >
              <TX_R style={{ fontSize: 14, marginBottom: 5 }}>
                อธิบายโครงการ
              </TX_R>
              <TX_R style={{ fontSize: 14 }}>
                {props.route.params.item.description}
              </TX_R>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              top: imgHeight,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 100,
                backgroundColor: "#fff",
                elevation: 1,
                flexDirection: "row",
                paddingHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TX_R style={{ fontSize: 24 }}>
                  {props.route.params.item.followers.length} คน
                </TX_R>
                <TX_R style={{ fontSize: 12 }}>ติดตามโครงการนี้</TX_R>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TX_R style={{ fontSize: 12 }}>ยอดบริจาค</TX_R>
                <TX_R style={{ fontSize: 24 }}>{percent.toFixed(2)}%</TX_R>
                <TX_R style={{ fontSize: 12 }}>
                  {props.route.params.item.donation_amount}/
                  {props.route.params.item.max_donation_amount}
                </TX_R>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TX_R style={{ fontSize: 24 }}>{difDay.toFixed()} วัน</TX_R>
                <TX_R style={{ fontSize: 12 }}>โครงการจะสิ้นสุด</TX_R>
                <TX_R style={{ fontSize: 12 }}>17/09/63 13.00</TX_R>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 20,
                backgroundColor: "#fff",
                elevation: 1,
                paddingHorizontal: 20,
                paddingTop: 10,
                alignContent: "center",
              }}
            >
              <Progress.Bar progress={lengthBar} width={ProgressWidth} />
            </View>

            <View
              style={{
                width: "100%",
                height: 100,
                backgroundColor: "#fff",
                elevation: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate("Donate", {
                    item: props.route.params.item,
                  });
                }}
              >
                <LinearGradient
                  colors={["#007AFF", "#007AFF"]}
                  start={[1, -1.2]}
                  style={{
                    width: width - 40,
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
            <View>
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("Requirement");
                }}
              >
                <View style={styles.box}>
                  <TX_R>ความต้องการของโครงการ</TX_R>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("Update");
                }}
              >
                <View style={styles.box}>
                  <TX_R>ความคืบหน้าโครงการ</TX_R>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("Comment");
                }}
              >
                <View style={styles.box}>
                  <TX_R>ความคิดเห็นเกี่ยวกับโครงการ</TX_R>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    elevation: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
  },
});

export default CampaignDetails;
