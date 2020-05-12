import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import TX_R from "../Components/TX_R";
import TX_L from "../Components/TX_L";
import TX_M from "../Components/TX_M";
import TX_B from "../Components/TX_B";

import CategoryData from "../Data/Category";

const Explore = (props) => {
  function Card({ title, imgUrl, desc, onCardClicked }) {
    return (
      <TouchableWithoutFeedback onPress={onCardClicked}>
        <View
          style={{
            width: width,
            height: 240,
            // paddingTop: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: 220,
              elevation: 4,
              backgroundColor: "#fff",
              // borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <LinearGradient
              colors={["#00000080", "#000000c0"]}
              start={[0, 0]}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 3000,
                justifyContent: "flex-end",
                padding: 20,
              }}
            >
              <View style={{}}>
                <TX_R
                  style={{
                    fontSize: 14,
                    color: "#fff",
                  }}
                >
                  หมวดการศึกษา
                </TX_R>
              </View>
              <View>
                <TX_R style={{ fontSize: 34, color: "#fff" }}>38%</TX_R>
              </View>
              <View>
                <TX_R style={{ fontSize: 20, color: "#fff" }}>{title}</TX_R>
                <TX_R style={{ fontSize: 14, color: "#fff" }}>
                  โดย มูลนิธิ A
                </TX_R>
              </View>
            </LinearGradient>
            <Image
              source={{ uri: imgUrl }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function ExpiresoonCard({ title, imgUrl, desc, onCardClicked }) {
    return (
      <TouchableWithoutFeedback onPress={onCardClicked}>
        <View
          style={{
            width: 260,
            height: 120,
            backgroundColor: "#eee",
            borderRadius: 15,
            marginTop: 10,
            overflow: "hidden",
            marginLeft: (4 * width) / 100,
          }}
        >
          <LinearGradient
            colors={["#00000080", "#000000c0"]}
            start={[0, 0]}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 3000,
              justifyContent: "space-between",
              padding: 10,
              paddingHorizontal: 12,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TX_R style={{ fontSize: 16, color: "#fff" }}>
                ปิดโครงการ 34 ชม.
              </TX_R>
              <TX_R style={{ fontSize: 16, color: "#fff" }}>26%</TX_R>
            </View>
            <View>
              <TX_R style={{ fontSize: 20, color: "#fff" }}>{title}</TX_R>
              <TX_R style={{ fontSize: 14, color: "#fff" }}>โดย มูลนิธิ A</TX_R>
            </View>
          </LinearGradient>
          <Image
            source={{ uri: imgUrl }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function Category({ name, title, goToCampaign }) {
    return (
      <TouchableWithoutFeedback onPress={goToCampaign}>
        <View
          style={{
            width: 100,
            height: 30,
            backgroundColor: "#1b262c",
            marginLeft: (4 * width) / 100,
            borderRadius: 15,
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TX_R style={{ fontSize: 14, color: "#fff" }}>{title}</TX_R>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function Dots() {
    const step = Animated.divide(scrollX, width);

    return data.map((item, index) => {
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
          key={item._id}
          style={{
            height: 6,
            width: widthDot,
            borderRadius: 3,
            backgroundColor: colorDot,
            marginHorizontal: 4,
          }}
        ></Animated.View>
      );
    });
  }

  const scrollX = new Animated.Value(0);
  const { width } = Dimensions.get("window");

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const loadData = async () => {
    const result = await axios(
      "https://limitless-taiga-70780.herokuapp.com/projects"
    );
    setData(result.data);
    console.log(result.data);
  };
  const LaadData2 = async () => {
    const result = await axios(
      "https://limitless-taiga-70780.herokuapp.com/projects/expiresoon"
    );
    setData2(result.data);
  };

  useEffect(() => {
    loadData();
    LaadData2();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="#ffffff00"
      />
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
          <TX_R style={{ fontSize: 18, top: 2 }}>หน้าแรก</TX_R>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Search");
          }}
        >
          <Ionicons name="ios-search" size={24} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.FlatList
          horizontal
          pagingEnabled
          // snapToInterval={300}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={data}
          renderItem={({ item }) => (
            <Card
              onCardClicked={() => {
                props.navigation.navigate("CampaignDetails", {
                  title: item.name,
                  imgUrl: item.img,
                  desc: item.description,
                });
              }}
              title={item.name}
              imgUrl={item.img}
              desc={item.description}
            />
          )}
          keyExtractor={(item) => item._id}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        />
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Dots />
        </View>
        <View style={{ alignItems: "center", paddingBottom: 10 }}>
          <View style={{ width: "100%", marginTop: 20 }}>
            <TX_R style={{ fontSize: 16, marginLeft: (4 * width) / 100 }}>
              หมวดหมู่
            </TX_R>
            <View style={{ height: 50 }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={CategoryData}
                renderItem={({ item }) => (
                  <Category
                    title={item.title}
                    goToCampaign={() => {
                      props.navigation.navigate("Campaign", {
                        title: item.title,
                        id: item.id,
                      });
                    }}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 10 }}>
            <TX_R style={{ fontSize: 16, marginLeft: (4 * width) / 100 }}>
              ใกล้สิ้นสุด
            </TX_R>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={data2}
              renderItem={({ item }) => (
                <ExpiresoonCard
                  onCardClicked={() => {
                    props.navigation.navigate("CampaignDetails", {
                      title: item.name,
                      imgUrl: item.img,
                      desc: item.description,
                    });
                  }}
                  title={item.name}
                  imgUrl={item.img}
                  desc={item.description}
                />
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
          <View style={{ width: "92%", marginTop: 20 }}>
            <TX_R style={{ fontSize: 16 }}>ใกล้ครบยอด</TX_R>
            <View style={styles.box}></View>
          </View>
          <View style={{ width: "92%", marginTop: 20 }}>
            <TX_R style={{ fontSize: 16 }}>การอัปเดตล่าสุด</TX_R>
            <View style={styles.box}></View>
          </View>
          <View style={{ width: "92%", marginTop: 20 }}>
            <TX_R style={{ fontSize: 16 }}>มูลนิธิ</TX_R>
            <View style={styles.box}></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 260,
    height: 120,
    backgroundColor: "#eee",
    borderRadius: 12,
    marginTop: 10,
    overflow: "hidden",
  },
});

export default Explore;
