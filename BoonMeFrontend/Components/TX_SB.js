import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default TX_SB = props => {
  return (
    <Text style={{ fontFamily: "NOTO_SB", ...props.style }}>
      {props.children}
    </Text>
  );
};
