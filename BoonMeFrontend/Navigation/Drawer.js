import React, { useState } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import Animated, { color } from "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";

import {
  Ionicons,
  Feather,
  MaterialIcons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Explore from "../Screens/Explore";
import Feed from "../Screens/Feed";
import Campaign from "../Screens/Campaign";
import Wallet from "../Screens/Wallet";
import Profile from "../Screens/Profile";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

import { useSelector } from "react-redux";
import TX_R from "../Components/TX_R";

const Screen = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, //Transition Animation <3
          headerTransparent: true,
          // headerTitle: null,
          headerTitleStyle: {
            color: "black",
            marginTop: 15,
            fontFamily: "NOTO_M",
            left: 3,
          },
          headerTitleAlign: ["center"],
          headerLeft: () => (
            <Ionicons
              name="ios-menu"
              // color="white"
              size={30}
              style={{ margin: 14, marginTop: 25, marginLeft: 15 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        animation="fade"
      >
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Campaign" component={Campaign} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = (props) => {
  const userName = useSelector((state) => state.user.name);

  const RemoveDataFromStorage = (token, userId) => {
    AsyncStorage.removeItem("userData");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          padding: 16,
          // backgroundColor: "red",
          height: 230,
        }}
      >
        <View
          style={{
            marginTop: 70,
            marginLeft: 0,
            width: 60,
            height: 60,
            backgroundColor: "#ffd30d",
            borderRadius: 30,
          }}
        ></View>
        <TX_R style={{ marginTop: 20, fontSize: 15 }}>{userName}</TX_R>
        <TX_R style={{ fontSize: 12 }}>Engineer</TX_R>
      </View>
      <View style={{ paddingTop: "10%" }}>
        <DrawerItem
          label="หน้าแรก"
          labelStyle={{ marginLeft: -16, fontFamily: "NOTO_M" }}
          onPress={() => props.navigation.navigate("Explore")}
          icon={() => (
            <SimpleLineIcons name="compass" size={24} style={{ width: 30 }} />
          )}
        />
        <DrawerItem
          label="โครงการ"
          labelStyle={{ marginLeft: -16, fontFamily: "NOTO_M" }}
          onPress={() => props.navigation.navigate("Campaign")}
          icon={() => <AntDesign name="flag" size={24} style={{ width: 30 }} />}
        />
        <DrawerItem
          label="ฟีด"
          labelStyle={{ marginLeft: -16, fontFamily: "NOTO_M" }}
          onPress={() => props.navigation.navigate("Feed")}
          icon={() => (
            <SimpleLineIcons name="energy" size={24} style={{ width: 30 }} />
          )}
        />
        <DrawerItem
          label="กระเป๋า"
          labelStyle={{ marginLeft: -16, fontFamily: "NOTO_M" }}
          onPress={() => props.navigation.navigate("Wallet")}
          icon={() => (
            <AntDesign name="wallet" size={24} style={{ width: 30 }} />
          )}
        />
        <DrawerItem
          label="โปรไฟล์"
          labelStyle={{ marginLeft: -16, fontFamily: "NOTO_M" }}
          onPress={() => props.navigation.navigate("Profile")}
          icon={() => <AntDesign name="user" size={24} style={{ width: 30 }} />}
        />
      </View>
      <View style={{ paddingTop: 80 }}>
        <DrawerItem
          label="Sign Out"
          onPress={() => {
            props.navigation.navigate("UserAuthen"), RemoveDataFromStorage();
          }}
          labelStyle={{ marginLeft: -16, fontFamily: "NOTO_M" }}
          icon={() => (
            <Feather
              name="log-out"
              size={20}
              style={{ width: 30, right: -3, top: -1 }}
            />
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 20],
  });
  const elevation = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const animatedStyle = { elevation, borderRadius, transform: [{ scale }] };

  return (
    <Drawer.Navigator
      // drawerPosition="right"
      drawerType="slide"
      overlayColor="transparent"
      initialRouteName="Explore"
      drawerStyle={styles.drawerStyles}
      contentContainerStyle={{ flex: 1 }}
      drawerContent={(props) => {
        setProgress(props.progress);
        return <DrawerContent {...props} />;
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Drawer.Screen name="Screen">
        {(props) => <Screen {...props} style={animatedStyle} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    overflow: "hidden",
  },
  drawerStyles: { flex: 1, width: "45%", backgroundColor: "white" },
});
