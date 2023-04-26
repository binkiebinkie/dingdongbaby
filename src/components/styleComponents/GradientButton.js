import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { withTheme } from "react-native-elements";

const GradientButton = ({ theme, copy, onPress }) => (
  <ImageBackground
    source={require("../../assets/Gradient.png")}
    resizeMode="cover"
    imageStyle={styles.gradientBorder(theme)}
    style={styles.gradientBorder(theme)}
  >
    <TouchableOpacity style={styles.button(theme)} onPress={onPress}>
      <Text style={styles.text(theme)}>{copy}</Text>
    </TouchableOpacity>
  </ImageBackground>
);

//rnss
const styles = StyleSheet.create({
  button: (theme) => ({
    padding: 12,
    backgroundColor: theme.colors.G9,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  }),
  gradientBorder: (theme) => ({
    width: "100%",
    borderRadius: 12,
    padding: 4,
  }),
  text: (theme) => ({
    color: theme.colors.PureWhite,
  }),
});

export default withTheme(GradientButton);
