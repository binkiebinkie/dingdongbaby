import React from "react";
import { Text } from "react-native";
import { withTheme } from "react-native-elements";

const TextG6Bold14 = ({ theme, copy, addStyles }) => (
  <Text
    style={[
      {
        fontSize: 14,
        color: theme.colors.G6,
        textTransform: "lowercase",
        fontWeight: "700",
        ...addStyles
      }
    ]}
  >
    {copy}
  </Text>
);

export default withTheme(TextG6Bold14);
