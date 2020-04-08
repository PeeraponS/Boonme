import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default TX_T = props => {
  return (
    <Text style={{ fontFamily: "NOTO_T", ...props.style }}>
      {props.children}
    </Text>
  );
};
