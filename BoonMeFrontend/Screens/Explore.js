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
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur";
import axios from "axios";
import TX_R from "../Components/TX_R";
import TX_L from "../Components/TX_L";
import TX_M from "../Components/TX_M";

import CategoryData from "../Data/Category";
import TX_B from "../Components/TX_B";

const Explore = (props) => {
  const { width, height } = Dimensions.get("window");

  function Card({ title, imgUrl, desc, onCardClicked }) {
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            width: width,
            height: 320,
            paddingTop: 20,
            alignItems: "center",
            // backgroundColor: "green",
          }}
        >
          <View
            style={{
              width: "94%",
              height: 280,
              elevation: 8,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <LinearGradient
              colors={[
                // "#00000000",
                // "#00000000",
                // "#00000030",
                // "#00000060",
                "#00000080",
                "#00000080",
              ]}
              start={[0, 0]}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 3000,
                justifyContent: "flex-end",
              }}
            >
              <View>
                <TX_R style={{ fontSize: 16, color: "white", margin: 20 }}>
                  {title}
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

  function Category({ name, title }) {
    return (
      <View
        style={{
          width: 100,
          height: 30,
          backgroundColor: "#f7f7f7",
          marginLeft: (3 * width) / 100,
          borderRadius: 12,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TX_R>{title}</TX_R>
      </View>
    );
  }

  function Dots() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: "#999",
            borderRadius: 4,
            marginHorizontal: 4,
          }}
        ></View>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: "#999",
            borderRadius: 4,
            marginHorizontal: 4,
          }}
        ></View>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: "#999",
            borderRadius: 4,
            marginHorizontal: 4,
          }}
        ></View>
      </View>
    );
  }

  const [data, setData] = useState([]);
  const loadData = async () => {
    const result = await axios(
      "https://aqueous-beach-98436.herokuapp.com/projects"
    );
    setData(result.data);
    // console.log(data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const scroll = useRef(null);

  const scrollY = new Animated.Value(0);
  const BGpop = scrollY.interpolate({
    inputRange: [0, 400],
    outputRange: [320, 80],
    extrapolate: "clamp",
  });

  const HEADER_HEIGHT = 68 + getStatusBarHeight();

  return (
    <Animated.View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="#ffffff00"
      />
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          height: HEADER_HEIGHT,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          zIndex: 3000,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ width: 50, height: "100%" }}></View>

        {/* <TX_R
          style={{
            fontSize: 18,
            // paddingTop: 3,
            // paddingBottom: 3,
            // paddingLeft: 12,
            // paddingRight: 12,
            // backgroundColor: "#ffd30d",
            // borderRadius: 8
          }}
        >
          บุญมี
        </TX_R> */}

        <TouchableWithoutFeedback>
          <Ionicons
            name="ios-search"
            size={26}
            // color="white"
            style={{
              margin: 14,
              marginTop: 16,
              marginRight: 15,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        bounces={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
        scrollEventThrottle={16}
        // snapToAlignment="center"
        // snapToOffsets={[250]}
        // decelerationRate="normal"
        // snapToEnd={false}
        ref={scroll}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
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
                props.navigation.navigate("ExploreCard", {
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
        <Dots />
        <TX_R
          style={{
            fontSize: 18,
            marginHorizontal: (4 * width) / 100,
            marginTop: 20,
          }}
        >
          หมวดหมู่
        </TX_R>
        <View style={{ height: 180 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={CategoryData}
            renderItem={({ item }) => (
              <Category name={item.name} title={item.title} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default Explore;
