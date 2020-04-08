import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default TX_EL = props => {
  return (
    <Text style={{ fontFamily: "NOTO_EL", ...props.style }}>
      {props.children}
    </Text>
  );
};
