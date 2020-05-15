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
  RefreshControl,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import TX_R from "../Components/TX_R";
import TX_L from "../Components/TX_L";
import TX_M from "../Components/TX_M";
import TX_B from "../Components/TX_B";

import CategoryData from "../Data/Category";

const Explore = (props) => {
  const userToken = useSelector((state) => state.user.token);

  function Card({ item, onCardClicked }) {
    const amount = item.donation_amount;
    const max = item.max_donation_amount;
    const percent = (amount * 100) / max;

    return (
      <View
        style={{
          width: width,
          height: 240,
          // paddingTop: 10,
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={onCardClicked}>
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
                  หมวด{item.project_type}
                </TX_R>
              </View>
              <View>
                <TX_R style={{ fontSize: 34, color: "#fff" }}>
                  {percent.toFixed(2)}%
                </TX_R>
              </View>
              <View>
                <TX_R style={{ fontSize: 18, color: "#fff" }}>{item.name}</TX_R>
                <TX_R style={{ fontSize: 12, color: "#fff" }}>
                  โครงการโดย {item.creatorname}
                </TX_R>
              </View>
            </LinearGradient>
            <Image
              source={{ uri: item.img }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function ExpiresoonCard({ item, onCardClicked }) {
    const amount = item.donation_amount;
    const max = item.max_donation_amount;
    const percent = (amount * 100) / max;

    const endDate = new Date(item.due_date);
    const date = new Date();
    const difDate = endDate - date;
    const difDay = difDate / 1000 / 60 / 60 / 24;
    return (
      <TouchableWithoutFeedback onPress={onCardClicked}>
        <View
          style={{
            width: 260,
            height: 170,
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
              <View>
                <TX_R style={{ fontSize: 24, color: "#fff", top: -2 }}>
                  {percent.toFixed(2)}%
                </TX_R>
                <TX_R></TX_R>
              </View>
              <TX_R style={{ fontSize: 14, color: "#fff" }}>
                ปิดโครงการ {difDay.toFixed()} วัน
              </TX_R>
            </View>
            <View styles={{}}>
              <TX_R style={{ fontSize: 18, color: "#fff", paddingBottom: 5 }}>
                {item.name}
              </TX_R>
              <TX_R style={{ fontSize: 12, color: "#fff" }}>
                โครงการโดย {item.creatorname}
              </TX_R>
            </View>
          </LinearGradient>
          <Image
            source={{ uri: item.img }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function Category({ name, title, goToCampaign, item }) {
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
  const [data3, setData3] = useState([]);

  // const loadData = async () => {
  //   const result = await axios(
  //     "https://limitless-taiga-70780.herokuapp.com/projects/random/5"
  //   );
  //   setData(result.data);
  //   // console.log(result.data);
  // };
  // const LaadData2 = async () => {
  //   const result = await axios(
  //     "https://limitless-taiga-70780.herokuapp.com/projects/expiresoon"
  //   );
  //   setData2(result.data);
  // };
  // const LaadData3 = async () => {
  //   const result = await axios(
  //     "https://limitless-taiga-70780.herokuapp.com/projects/donation_almost_max"
  //   );
  //   setData3(result.data);
  // };

  const [isLoading, setisLoading] = useState(false);

  const getCreator1 = async () => {
    const result = await axios(
      "https://limitless-taiga-70780.herokuapp.com/projects/random/5"
    );

    const data = result.data;

    let updatedProject = [];
    let promises = [];
    let Authorization = `Bearer ${userToken}`;

    for (let index = 0; index < data.length; index++) {
      let url = `https://limitless-taiga-70780.herokuapp.com/projects/${data[index]._id}/creator`;

      promises.push(
        axios({
          url,
          headers: {
            Authorization,
          },
        }).then((res) => {
          data[index].creatorname = res.data.name;
          updatedProject.push(data[index]);
        })
      );

      // console.log(data[index]._id);
    }
    return Promise.all(promises).then(() => {
      // console.log(updatedProject);
      setData(updatedProject);
    });
  };

  const getCreator2 = async () => {
    const result = await axios(
      "https://limitless-taiga-70780.herokuapp.com/projects/expiresoon"
    );

    const data = result.data;

    let updatedProject = [];
    let promises = [];
    let Authorization = `Bearer ${userToken}`;

    for (let index = 0; index < data.length; index++) {
      let url = `https://limitless-taiga-70780.herokuapp.com/projects/${data[index]._id}/creator`;

      promises.push(
        axios({
          url,
          headers: {
            Authorization,
          },
        }).then((res) => {
          data[index].creatorname = res.data.name;
          updatedProject.push(data[index]);
        })
      );

      // console.log(data[index]._id);
    }
    return Promise.all(promises).then(() => {
      // console.log(updatedProject);
      setData2(updatedProject);
    });
  };

  const getCreator3 = async () => {
    const result = await axios(
      "https://limitless-taiga-70780.herokuapp.com/projects/donation_almost_max"
    );

    const data = result.data;

    let updatedProject = [];
    let promises = [];
    let Authorization = `Bearer ${userToken}`;

    for (let index = 0; index < data.length; index++) {
      let url = `https://limitless-taiga-70780.herokuapp.com/projects/${data[index]._id}/creator`;

      promises.push(
        axios({
          url,
          headers: {
            Authorization,
          },
        }).then((res) => {
          data[index].creatorname = res.data.name;
          updatedProject.push(data[index]);
        })
      );

      // console.log(data[index]._id);
    }
    return Promise.all(promises).then(() => {
      // console.log(updatedProject);
      setData3(updatedProject);
    });
  };
  const dispatch = useDispatch();
  const GETCOIN = "GETCOIN";
  const loadCoinData = async () => {
    let url = `https://limitless-taiga-70780.herokuapp.com/erc20token/checkbalance`;
    let Authorization = `Bearer ${userToken}`;
    const result = await axios({
      url,
      headers: {
        Authorization,
      },
    });
    // console.log(result.data);
    dispatch({
      type: GETCOIN,
      coinData: result.data,
    });
  };

  useEffect(() => {
    setisLoading(true);
    loadCoinData();
    getCreator1();
    getCreator2();
    getCreator3();
    setisLoading(false);
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshUserInfo();
    console.log("onRefresh");
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  const refreshUserInfo = async () => {
    setisLoading(true);
    loadCoinData();
    getCreator1();
    getCreator2();
    getCreator3();
    setisLoading(false);
  };

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Animated.FlatList
          refreshing={isLoading}
          horizontal
          pagingEnabled
          // snapToInterval={300}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={data ? data : []}
          renderItem={({ item }) => (
            <Card
              onCardClicked={() => {
                props.navigation.navigate("CampaignDetails", {
                  item: item,
                });
              }}
              item={item}
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
                    item={item}
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
              โครงการที่ใกล้จะสิ้นสุด
            </TX_R>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={data2}
              renderItem={({ item }) => (
                <ExpiresoonCard
                  onCardClicked={() => {
                    props.navigation.navigate("CampaignDetails", {
                      item: item,
                    });
                  }}
                  item={item}
                />
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
          <View style={{ width: "100%", marginTop: 20 }}>
            <TX_R style={{ fontSize: 16, marginLeft: (4 * width) / 100 }}>
              โครงการที่ใกล้จะถึงเป้าหมาย
            </TX_R>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={data3}
              renderItem={({ item }) => (
                <ExpiresoonCard
                  onCardClicked={() => {
                    props.navigation.navigate("CampaignDetails", {
                      item: item,
                    });
                  }}
                  item={item}
                />
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
          {/* <View style={{ width: "92%", marginTop: 20 }}>
            <TX_R style={{ fontSize: 16 }}>ข่าวสารและการอัปเดต</TX_R>
            <View style={styles.box}></View>
          </View>
          <View style={{ width: "92%", marginTop: 20 }}>
            <TX_R style={{ fontSize: 16 }}>มูลนิธิ</TX_R>
            <View style={styles.box}></View>
          </View> */}
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
