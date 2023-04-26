import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { withTheme } from "react-native-elements";

const CircleBar = ({ theme, numPromptsComplete, numPrompts }) => {
  const [contWidth, setContWidth] = useState(0);
  const [numCircles, setNumCircles] = useState(45);
  const [gradientWidth, setGradientWidth] = useState(
    numPromptsComplete && numPrompts ? 4 : 0
  );

  useEffect(() => {
    // Count percentage width of prompts complete
    // TODO: Use real number
    // TODO: Animate gradient width
    if (contWidth > 0) {
      const circleWidthAndSpacing = 8;
      setNumCircles(Math.floor(contWidth / circleWidthAndSpacing));
      if (numPromptsComplete && numPrompts) {
        const percentComplete = numPromptsComplete / numPrompts;
        const widthInPx = percentComplete * contWidth;
        setGradientWidth(widthInPx);
      }
    }
  }, [contWidth]);

  return (
    <View
      onLayout={(e) => setContWidth(e.nativeEvent.layout.width)}
      style={styles.circleBarCont(theme)}
    >
      {numPromptsComplete && numPrompts ? (
        <Image
          style={[styles.gradient(theme), { width: gradientWidth }]}
          source={require("../assets/Gradient.png")}
        />
      ) : null}
      {[...Array(numCircles)].map((circle, i) => (
        <View key={`${circle}${i}`} style={styles.circle(theme)}></View>
      ))}
    </View>
  );
};

//rnss
const styles = StyleSheet.create({
  circleBarCont: (theme) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  }),
  gradient: (theme) => ({
    height: 4,
    borderRadius: 4,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
  }),
  circle: (theme) => ({
    width: 4,
    height: 4,
    backgroundColor: theme.colors.G4,
    borderRadius: 50,
  }),
});

export default withTheme(CircleBar);
