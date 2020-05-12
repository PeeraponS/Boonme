import React from "react";
import { View, Text, ScrollView } from "react-native";
import TX_R from "../Components/TX_R";

const Comment = () => {
  return (
    <View>
      <ScrollView>
        <View style={{ top: 200 }}>
          <View style={{ width: "100%", height: 300, backgroundColor: "#f05" }}>
            <TX_R>asdasdasdaaaaaaaaaaaaaaaaaaaaa</TX_R>
            <TX_R>asdasdasdaaaaaaaaaaaaaaaaaaaaa</TX_R>
            <TX_R>asdasdasdaaaaaaaaaaaaaaaaaaaaa</TX_R>
            <TX_R>asdasdasdaaaaaaaaaaaaaaaaaaaaa</TX_R>
          </View>
          <View style={{ width: "100%", backgroundColor: "#0f5" }}></View>
          <View style={{ width: "100%", backgroundColor: "#f05" }}></View>
          <View style={{ width: "100%", backgroundColor: "#05f" }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Comment;
