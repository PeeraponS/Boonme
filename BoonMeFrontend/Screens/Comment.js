import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import TX_R from "../Components/TX_R";
import { Ionicons } from "@expo/vector-icons";

import CommentData from "../Data/CommentData";

const Box = ({ item }) => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <View
        style={{
          width: "92%",
          height: 100,
          backgroundColor: "#fff",
          elevation: 1,
          marginVertical: 5,
          borderRadius: 8,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              overflow: "hidden",
            }}
          >
            <Image
              source={require("../assets/Profile.png")}
              style={{
                width: 50,
                height: 50,
                // backgroundColor: "#1b262c",
                borderRadius: 30,
                resizeMode: "cover",
              }}
            />
          </View>
        </View>
        <View style={{ flex: 5, paddingTop: 20 }}>
          <TX_R style={{ fontSize: 16 }}>{item.name}</TX_R>
          <TX_R style={{ fontSize: 12 }}>{item.title}</TX_R>
        </View>
      </View>
    </View>
  );
};

const Comment = (props) => {
  console.log(CommentData);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
            props.navigation.goBack();
          }}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={34}
            style={{ width: 30 }}
          />
        </TouchableWithoutFeedback>
        <View>
          <TX_R style={{ fontSize: 18, top: 2 }}>ความคิดเห็น</TX_R>
        </View>
        <View style={{ width: 20, height: 20 }}></View>
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          data={CommentData}
          renderItem={({ item }) => <Box item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Comment;
