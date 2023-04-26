import React from "react";
import { Text } from "react-native";
import { withTheme } from "react-native-elements";

const TextG916 = ({ theme, copy, addStyles }) => (
  <Text
    style={[
      {
        fontSize: 16,
        color: theme.colors.G9,
        textTransform: "lowercase",
        fontWeight: "400",
        ...addStyles
      }
    ]}
  >
    {copy}
  </Text>
);

export default withTheme(TextG916);
