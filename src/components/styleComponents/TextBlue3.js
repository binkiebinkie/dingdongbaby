import React from "react";
import { Text } from "react-native";
import { withTheme } from "react-native-elements";

const TextBlue3 = ({ theme, copy, addStyles }) => (
  <Text
    style={[
      {
        fontSize: 16,
        color: theme.colors.Blue3,
        textTransform: "lowercase",
        fontWeight: "700",
        ...addStyles,
      },
    ]}
  >
    {copy}
  </Text>
);

export default withTheme(TextBlue3);
