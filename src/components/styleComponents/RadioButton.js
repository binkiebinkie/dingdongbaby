import React from "react";
import { View } from "react-native";
import { withTheme } from "react-native-elements";

const RadioButton = ({ theme, selected, addStyles }) => (
  <View
    style={[
      selected
        ? {
            borderColor: theme.colors.Blue3
          }
        : {
            borderColor: theme.colors.G3
          },
      {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        ...addStyles
      }
    ]}
  >
    {selected ? (
      <View
        style={{
          height: 12,
          width: 12,
          borderRadius: 6,
          backgroundColor: theme.colors.Blue3
        }}
      />
    ) : null}
  </View>
);

export default withTheme(RadioButton);
