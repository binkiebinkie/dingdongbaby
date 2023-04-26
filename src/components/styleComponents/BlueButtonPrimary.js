import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { withTheme } from "react-native-elements";

const BlueButtonPrimary = ({ theme, copy, onPress, addStyles }) => (
  <TouchableOpacity
    style={[styles.button(theme), { ...addStyles }]}
    onPress={onPress}
  >
    <Text style={styles.text(theme)}>{copy}</Text>
  </TouchableOpacity>
);

//rnss
const styles = StyleSheet.create({
  button: (theme) => ({
    padding: 12,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.Blue3,
  }),
  text: (theme) => ({
    color: theme.colors.PureWhite,
    textTransform: "lowercase",
    fontWeight: "600",
  }),
});

export default withTheme(BlueButtonPrimary);
