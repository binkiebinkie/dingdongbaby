import React from "react";
import { Text } from "react-native";
import { withTheme } from "react-native-elements";

const TextG616 = ({ theme, copy, addStyles }) => (
  <Text
    style={[
      {
        fontSize: 16,
        color: theme.colors.G6,
        textTransform: "lowercase",
        fontWeight: "400",
        zIndex: 10000,
        ...addStyles
      }
    ]}
  >
    {copy}
  </Text>
);

export default withTheme(TextG616);
