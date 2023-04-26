import React from "react";
import { StyleSheet, Text } from "react-native";
import { withTheme } from "react-native-elements";

function GreyFont({ theme, children }) {
  return <Text style={styles.greyFont(theme)}>{children}</Text>;
}

//rnss
const styles = StyleSheet.create({
  greyFont: (theme) => ({
    fontFamily: "SFCompactRoundedBold",
    color: theme.colors.G6,
    fontSize: 16,
    fontWeight: "600",
    width: "100%",
    paddingLeft: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.G2,
  }),
});

export default withTheme(GreyFont);
