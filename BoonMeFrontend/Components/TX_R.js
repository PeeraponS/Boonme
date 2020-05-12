import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default TX_R = (props) => {
  return (
    <Text style={{ fontFamily: "NOTO_R", ...props.style }}>
      {props.children}
    </Text>
  );
};
