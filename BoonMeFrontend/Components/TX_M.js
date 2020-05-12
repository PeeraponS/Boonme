import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default TX_M = (props) => {
  return (
    <Text style={{ fontFamily: "NOTO_M", ...props.style }}>
      {props.children}
    </Text>
  );
};
