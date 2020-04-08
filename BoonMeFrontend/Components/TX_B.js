import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default TX_B = props => {
  return (
    <Text style={{ fontFamily: "NOTO_B", ...props.style }}>
      {props.children}
    </Text>
  );
};
