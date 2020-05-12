import React from "react";
import { View, TouchableWithoutFeedback, TextInput } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import TX_R from "../Components/TX_R";

const Search = (props) => {
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
        <TextInput
          autoFocus={true}
          style={{
            width: "88%",
            height: 45,
            borderRadius: 12,
            backgroundColor: "#eee",
            fontSize: 20,
            borderColor: "black",
            paddingHorizontal: 10,
          }}
        />
      </View>
    </View>
  );
};

export default Search;
