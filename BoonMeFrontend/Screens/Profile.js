import React, { useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, Modal, Image } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Ionicons, Feather } from "@expo/vector-icons";
import TX_R from "../Components/TX_R";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const [visible, setVisible] = useState(false);

  const [userImg, setUserImg] = useState();
  const [userImgUri, setUserImgUri] = useState();

  const pickedAnImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      return result;
    }
  };

  const pickImage = async () => {
    let img = await pickedAnImg();
    if (img) {
      setUserImg(img);
      setUserImgUri(img.uri);
      uploadImage();
    }
  };

  const userToken = useSelector((state) => state.user.token);
  const uploadImage = async () => {
    let url = `https://limitless-taiga-70780.herokuapp.com/users/me/uploadavatar`;
    let Authorization = `Bearer ${userToken}`;

    try {
      const result = await axios({
        method: "post",
        url,

        // data: {
        //   avatar: userImg,
        // },
        data: data,
        headers: {
          Authorization,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("result.data");
      console.log(result.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const userName = useSelector((state) => state.user.name);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Modal visible={visible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(false);
          }}
        >
          <View
            style={{ position: "absolute", width: "100%", height: "100%" }}
          ></View>
        </TouchableWithoutFeedback>
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              width: 140,
              height: 80,
              backgroundColor: "#fff",
              elevation: 4,
              margin: 20,
              borderRadius: 12,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                pickImage();
                setVisible(false);
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <TX_R>อัพโหลดรูปภาพ</TX_R>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setVisible(false);
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <TX_R>แก้ไขข้อมูลส่วนตัว</TX_R>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>

      <View
        style={{
          paddingTop: getStatusBarHeight(),
          height: 92,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          elevation: 0,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.openDrawer();
          }}
        >
          <Ionicons name="ios-menu" size={30} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(true);
          }}
        >
          <Feather name="edit" size={20} />
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          width: "100%",
          height: 140,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#fff",
            borderRadius: 50,
            elevation: 12,
            marginTop: 5,
            borderWidth: 3,
            borderColor: "#007AFF",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../assets/Profile.png")}
            style={{
              width: 80,
              height: 80,
              // backgroundColor: "#1b262c",
              borderRadius: 30,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <TX_R style={{ fontSize: 16 }}>{userName}</TX_R>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: 100,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          backgroundColor: "#fff",
          flexDirection: "row",
          overflow: "hidden",
          paddingTop: 15,
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRightWidth: 1,
            borderColor: "#ccc",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TX_R style={{ fontSize: 20 }}>12</TX_R>
          <TX_R style={{ fontSize: 12 }}>โครงการที่ติดตาม</TX_R>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TX_R style={{ fontSize: 20 }}>1250</TX_R>
          <TX_R style={{ fontSize: 12 }}>ยอดบริจาค</TX_R>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderLeftWidth: 1,
            borderColor: "#ccc",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TX_R style={{ fontSize: 20 }}>5</TX_R>
          <TX_R style={{ fontSize: 12 }}>การบริจาค</TX_R>
        </View>
      </View>
    </View>
  );
};

export default Profile;
