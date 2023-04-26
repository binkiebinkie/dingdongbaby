import React from "react";
import { Text } from "react-native";
import { withTheme } from "react-native-elements";

const TextPureBlack24 = ({ theme, copy, addStyles }) => (
  <Text
    style={[
      {
        fontSize: 24,
        color: theme.colors.PureBlack,
        textTransform: "lowercase",
        fontWeight: "normal",
        ...addStyles
      }
    ]}
  >
    {copy}
  </Text>
);

export default withTheme(TextPureBlack24);
