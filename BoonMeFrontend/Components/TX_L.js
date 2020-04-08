import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default TX_L = props => {
  return (
    <Text style={{ fontFamily: "NOTO_L", ...props.style }}>
      {props.children}
    </Text>
  );
};
