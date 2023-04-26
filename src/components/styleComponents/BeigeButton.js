import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import TextG616 from "./TextG616";
import { withTheme } from "react-native-elements";

const BeigeButton = ({ theme, copy, onPress }) => (
  <TouchableOpacity style={styles.button(theme)} onPress={onPress}>
    <TextG616 copy={copy} />
  </TouchableOpacity>
);

//rnss
const styles = StyleSheet.create({
  button: (theme) => ({
    padding: 12,
    backgroundColor: theme.colors.G1,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  }),
});

export default withTheme(BeigeButton);
