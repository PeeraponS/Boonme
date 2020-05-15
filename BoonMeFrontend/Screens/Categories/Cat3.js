import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import TX_R from "../../Components/TX_R";
import { LinearGradient } from "expo-linear-gradient";

function Card({ item, onCardClicked }) {
  const amount = item.donation_amount;
  const max = item.max_donation_amount;
  const percent = (amount * 100) / max;
  return (
    <View
      style={{
        width: "100%",
        height: 200,
        alignItems: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={onCardClicked}>
        <View
          style={{
            width: "100%",
            height: 200,
            elevation: 4,
            backgroundColor: "#fff",
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
              <TX_R style={{ fontSize: 12, color: "#fff" }}>โครงการโดย </TX_R>
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

const Cat3 = (props) => {
  const [data, setData] = useState();
  const loadData = async () => {
    const result = await axios(
      "https://limitless-taiga-70780.herokuapp.com/projects?project_type=ผู้สูงอายุ"
    );

    setData(result.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <FlatList
        data={data}
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
      />
    </View>
  );
};

export default Cat3;
